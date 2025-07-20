#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME_DIR = path.join(os.homedir(), '.claude-code-router');
const CONFIG_FILE = path.join(HOME_DIR, 'config.json');

// Get the package directory
const packageDir = path.dirname(require.resolve('../package.json'));

function setupConfig() {
  console.log('🚀 Claude Code Router Configuration Setup\n');

  // Create directory if it doesn't exist
  if (!fs.existsSync(HOME_DIR)) {
    fs.mkdirSync(HOME_DIR, { recursive: true });
    console.log(`✅ Created directory: ${HOME_DIR}`);
  }

  // Check if config already exists
  if (fs.existsSync(CONFIG_FILE)) {
    console.log(`⚠️  Configuration file already exists: ${CONFIG_FILE}`);
    console.log('   If you want to overwrite it, please delete it first.\n');
    return;
  }

  // Copy configuration template
  const templatePath = path.join(packageDir, 'config.example.with-rotation.json');
  
  if (!fs.existsSync(templatePath)) {
    console.log('❌ Configuration template not found in package.');
    console.log('   Please run: npm install -g @tellerlin/claude-code-router');
    return;
  }

  try {
    fs.copyFileSync(templatePath, CONFIG_FILE);
    console.log(`✅ Configuration file created: ${CONFIG_FILE}`);
    console.log('\n📝 Next steps:');
    console.log('   1. Edit the configuration file with your API keys');
    console.log('   2. Run: ccr code');
    console.log('\n💡 Tip: Use nano, vim, or your preferred editor to edit the config file');
  } catch (error) {
    console.log('❌ Failed to create configuration file:', error.message);
  }
}

setupConfig(); 