import { MessageCreateParamsBase } from "@anthropic-ai/sdk/resources/messages";
import { get_encoding } from "tiktoken";
import { log } from "./log";

const enc = get_encoding("cl100k_base");

const getUseModel = (req: any, tokenCount: number, config: any) => {
  if (req.body.model.includes(",")) {
    return req.body.model;
  }
  // if tokenCount is greater than 60K, use the long context model
  if (tokenCount > 1000 * 60 && config.router.longContext) {
    log("Using long context model due to token count:", tokenCount);
    return config.router.longContext;
  }
  // If the model is claude-3-5-haiku, use the background model
  if (req.body.model?.startsWith("claude-3-5-haiku") && config.router.background) {
    log("Using background model for ", req.body.model);
    return config.router.background;
  }
  // if exits thinking, use the think model
  if (req.body.thinking && config.router.think) {
    log("Using think model for ", req.body.thinking);
    return config.router.think;
  }
  return config.router.default;
};

export const router = async (req: any, res: any, config: any) => {
  const { messages, system = [], tools }: MessageCreateParamsBase = req.body;
  try {
    let tokenCount = 0;
    if (Array.isArray(messages)) {
      messages.forEach((message) => {
        if (typeof message.content === "string") {
          tokenCount += enc.encode(message.content).length;
        } else if (Array.isArray(message.content)) {
          message.content.forEach((content) => {
            if (content.type === "text") {
              tokenCount += enc.encode(content.text).length;
            }
          });
        }
      });
    }

    if (Array.isArray(system)) {
      system.forEach((sys) => {
        if (typeof sys === "string") {
          tokenCount += enc.encode(sys).length;
        } else if (sys.text) {
          tokenCount += enc.encode(sys.text).length;
        }
      });
    } else if (typeof system === "string") {
      tokenCount += enc.encode(system).length;
    }

    if (Array.isArray(tools)) {
      tools.forEach((tool) => {
        if (tool.name) {
          tokenCount += enc.encode(tool.name).length;
        }
        if (tool.description) {
          tokenCount += enc.encode(tool.description).length;
        }
        if (tool.input_schema) {
          tokenCount += enc.encode(JSON.stringify(tool.input_schema)).length;
        }
      });
    }
    const model = getUseModel(req, tokenCount, config);
    req.body.model = model;
  } catch (error: any) {
    log("Error in router middleware:", error.message);
    req.body.model = config.router.default;
  }
  return;
};
