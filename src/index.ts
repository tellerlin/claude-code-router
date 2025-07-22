import { existsSync } from "fs";
import { writeFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import { initConfig, initDir } from "./utils";
import { createServer } from "./server";
import { router } from "./utils/router";
import { apiKeyAuth } from "./middleware/auth";
import {
  cleanupPidFile,
  isServiceRunning,
  savePid,
} from "./utils/processCheck";
import { CONFIG_FILE } from "./constants";

async function initializeClaudeConfig() {
  const homeDir = homedir();
  const configPath = join(homeDir, ".claude.json");
  if (!existsSync(configPath)) {
    const userID = Array.from(
      { length: 64 },
      () => Math.random().toString(16)[2]
    ).join("");
    const configContent = {
      numStartups: 184,
      autoUpdaterStatus: "enabled",
      userID,
      hasCompletedOnboarding: true,
      lastOnboardingVersion: "1.0.17",
      projects: {},
    };
    await writeFile(configPath, JSON.stringify(configContent, null, 2));
  }
}

interface RunOptions {
  port?: number;
}

async function run(options: RunOptions = {}) {
  // Check if service is already running
  if (isServiceRunning()) {
    console.log("✅ Service is already running in the background.");
    return;
  }

  await initializeClaudeConfig();
  await initDir();
  const processedConfig = await initConfig();
  let HOST = processedConfig.global.HOST;

  if (processedConfig.global.HOST && !processedConfig.global.APIKEY) {
    HOST = "127.0.0.1";
    console.warn(
      "⚠️ API key is not set. HOST is forced to 127.0.0.1."
    );
  }

  const port = options.port || 3456;

  // Save the PID of the background process
  savePid(process.pid);

  // Handle SIGINT (Ctrl+C) to clean up PID file
  process.on("SIGINT", () => {
    console.log("Received SIGINT, cleaning up...");
    cleanupPidFile();
    process.exit(0);
  });

  // Handle SIGTERM to clean up PID file
  process.on("SIGTERM", () => {
    cleanupPidFile();
    process.exit(0);
  });
  console.log(HOST)

  // Use port from environment variable if set (for background process)
  const servicePort = process.env.SERVICE_PORT
    ? parseInt(process.env.SERVICE_PORT)
    : port;
  
  // 让 @musistudio/llms 直接从 jsonPath 读取原始配置，但添加 providers 到 initialConfig
  const server = createServer({
    jsonPath: CONFIG_FILE,
    initialConfig: {
      providers: processedConfig.providers.map(p => ({
        name: p.name,
        api_base_url: p.api_base_url,
        api_key: Array.isArray(p.api_keys) && p.api_keys.length > 0 ? p.api_keys[0] : '',
        models: p.models,
        transformer: p.transformer
      })),
      HOST: HOST,
      PORT: servicePort,
      LOG_FILE: join(
        homedir(),
        ".claude-code-router",
        "claude-code-router.log"
      ),
    },
  });
  server.addHook("preHandler", apiKeyAuth(processedConfig.global));
  server.addHook("preHandler", async (req, reply) =>
    router(req, reply, processedConfig)
  );
  
  try {
    await server.start();
    console.log(`🚀 Claude Code Router service started successfully on ${HOST}:${servicePort}`);
  } catch (error) {
    console.error("Failed to start service:", error);
    cleanupPidFile();
    process.exit(1);
  }
}

export { run };
