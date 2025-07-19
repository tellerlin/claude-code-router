import { existsSync, readFileSync } from "fs";
import { PID_FILE } from "../constants";
import { getApiKeyRotationStatus } from "./configProcessor";

export const showStatus = () => {
  const isRunning = existsSync(PID_FILE);
  
  if (isRunning) {
    try {
      const pid = parseInt(readFileSync(PID_FILE, "utf-8"));
      console.log("✅ Service is running (PID:", pid, ")");
      
      // 显示API Key轮询状态
      showApiKeyRotationStatus();
    } catch (error) {
      console.log("❌ Service status file is corrupted");
    }
  } else {
    console.log("❌ Service is not running");
  }
};

/**
 * 显示API Key轮询状态
 */
function showApiKeyRotationStatus(): void {
  try {
    const rotationStatus = getApiKeyRotationStatus();
    
    if (rotationStatus.length === 0) {
      console.log("📊 API Key Rotation: Not configured");
      return;
    }
    
    console.log("\n📊 API Key Rotation Status:");
    console.log("=" .repeat(60));
    
    rotationStatus.forEach(provider => {
      console.log(`\n🔧 Provider: ${provider.provider}`);
      console.log(`   Strategy: ${provider.strategy}`);
      console.log(`   Total Keys: ${provider.totalKeys}`);
      console.log(`   Available Keys: ${provider.availableKeys}`);
      
      if (provider.keyStatus && provider.keyStatus.length > 0) {
        console.log("   Key Status:");
        provider.keyStatus.forEach((keyStatus: any) => {
          const status = keyStatus.isActive ? "✅" : "❌";
          const failures = keyStatus.failures > 0 ? ` (${keyStatus.failures} failures)` : "";
          console.log(`     ${status} ${keyStatus.key.substring(0, 8)}...${failures}`);
        });
      }
    });
    
    console.log("\n" + "=" .repeat(60));
  } catch (error) {
    console.log("⚠️  Failed to get API key rotation status:", error);
  }
}

/**
 * 显示详细的API Key轮询状态
 */
export const showDetailedRotationStatus = () => {
  try {
    const rotationStatus = getApiKeyRotationStatus();
    
    if (rotationStatus.length === 0) {
      console.log("No API key rotation configured");
      return;
    }
    
    console.log("🔍 Detailed API Key Rotation Status");
    console.log("=" .repeat(80));
    
    rotationStatus.forEach(provider => {
      console.log(`\n📋 Provider: ${provider.provider}`);
      console.log(`   Enabled: ${provider.enabled ? "Yes" : "No"}`);
      console.log(`   Strategy: ${provider.strategy}`);
      console.log(`   Total Keys: ${provider.totalKeys}`);
      console.log(`   Available Keys: ${provider.availableKeys}`);
      
      if (provider.keyStatus && provider.keyStatus.length > 0) {
        console.log("\n   Individual Key Status:");
        provider.keyStatus.forEach((keyStatus: any, index: number) => {
          console.log(`   ${index + 1}. ${keyStatus.key.substring(0, 12)}...`);
          console.log(`      Active: ${keyStatus.isActive ? "Yes" : "No"}`);
          console.log(`      Failures: ${keyStatus.failures}`);
          console.log(`      Last Failure: ${keyStatus.lastFailureTime > 0 ? new Date(keyStatus.lastFailureTime).toLocaleString() : "Never"}`);
          console.log(`      Last Used: ${keyStatus.lastUsedTime > 0 ? new Date(keyStatus.lastUsedTime).toLocaleString() : "Never"}`);
        });
      }
    });
    
    console.log("\n" + "=" .repeat(80));
  } catch (error) {
    console.log("Error getting detailed rotation status:", error);
  }
};
