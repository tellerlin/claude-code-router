#!/usr/bin/env node
import { run } from "./index";
import { showStatus, showDetailedRotationStatus } from "./utils/status";
import { executeCodeCommand } from "./utils/codeCommand";
import { cleanupPidFile, isServiceRunning } from "./utils/processCheck";
import { showVersionInfo, showUpdatePrompt, shouldShowUpdatePrompt } from "./utils/versionCheck";
const version = require(require('path').join(__dirname, '../package.json')).version;
import { spawn } from "child_process";
import { PID_FILE, REFERENCE_COUNT_FILE } from "./constants";
import { existsSync, readFileSync } from "fs";
import {join} from "path";

const command = process.argv[2];

const HELP_TEXT = `
Usage: ccr [command]

Commands:
  start         Start service 
  stop          Stop service
  status        Show service status
  rotation      Show API key rotation status
  code          Execute code command
  test          Test all models and API keys in config.json
  -v, version   Show version information
  -h, help      Show help information

Example:
  ccr start
  ccr code "Write a Hello World"
  ccr rotation  # Show detailed API key rotation status
  ccr test      # Test all models and API keys in config.json
`;

async function waitForService(
  timeout = 30000,
  initialDelay = 2000
): Promise<boolean> {
  // Wait for an initial period to let the service initialize
  await new Promise((resolve) => setTimeout(resolve, initialDelay));

  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (isServiceRunning()) {
      // Wait for an additional short period to ensure service is fully ready
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  return false;
}

async function main() {
  // Show version info and update prompt for all commands except help and version
  if (command !== "-h" && command !== "help" && command !== "-v" && command !== "version") {
    showVersionInfo();
    if (shouldShowUpdatePrompt()) {
      showUpdatePrompt();
    }
  }
  
  switch (command) {
    case "start":
      run();
      break;
    case "stop":
      try {
        const pid = parseInt(readFileSync(PID_FILE, "utf-8"));
        process.kill(pid);
        cleanupPidFile();
        if (existsSync(REFERENCE_COUNT_FILE)) {
          try {
            require("fs").unlinkSync(REFERENCE_COUNT_FILE);
          } catch (e) {
            // Ignore cleanup errors
          }
        }
        console.log(
          "claude code router service has been successfully stopped."
        );
      } catch (e) {
        console.log(
          "Failed to stop the service. It may have already been stopped."
        );
        cleanupPidFile();
      }
      break;
    case "status":
      showStatus();
      break;
    case "rotation":
      showDetailedRotationStatus();
      break;
    case "code":
      if (!isServiceRunning()) {
        console.log("Service not running, starting service...");
        const cliPath = join(__dirname, "cli.js");
        const startProcess = spawn("node", [cliPath, "start"], {
          detached: true,
          stdio: "ignore",
        });

        startProcess.on("error", (error) => {
          console.error("Failed to start service:", error);
          process.exit(1);
        });

        startProcess.unref();

        if (await waitForService()) {
          executeCodeCommand(process.argv.slice(3));
        } else {
          console.error(
            "Service startup timeout, please manually run `ccr start` to start the service"
          );
          process.exit(1);
        }
      } else {
        executeCodeCommand(process.argv.slice(3));
      }
      break;
    case "test":
      // 自动调用 scripts/ccr-test.ts，兼容 Windows 路径
      try {
        const tsNodeCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
        const scriptPath = require('path').join(__dirname, '../scripts/ccr-test.ts');
        const { spawn } = require('child_process');
        const child = spawn(tsNodeCmd, ['ts-node', scriptPath], { stdio: 'inherit' });
        child.on('exit', (code: number) => process.exit(code));
      } catch (e) {
        console.error('Failed to run test script:', e);
        process.exit(1);
      }
      break;
    case "-v":
    case "version":
      console.log(`claude-code-router version: ${version}`);
      break;
    case "-h":
    case "help":
      console.log(HELP_TEXT);
      break;
    default:
      console.log(HELP_TEXT);
      process.exit(1);
  }
}

main().catch(console.error);
