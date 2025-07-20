#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const HOME_DIR = path.join(os.homedir(), '.claude-code-router');
const CONFIG_FILE = path.join(HOME_DIR, 'config.json');

// Get the package directory
const packageDir = path.dirname(require.resolve('../package.json'));

// Bilingual messages
const messages = {
  en: {
    title: '🚀 Claude Code Router Configuration Setup',
    dirCreated: '✅ Created directory:',
    configExists: '⚠️  Configuration file already exists:',
    overwritePrompt: 'Do you want to overwrite the existing configuration file? This will lose all your configured data. (y/N): ',
    overwritePromptZh: '是否要覆盖现有配置文件？这将丢失所有已配置的数据。(y/N): ',
    templateNotFound: '❌ Configuration template not found in package.',
    installCommand: '   Please run: npm install -g @tellerlin/claude-code-router',
    configCreated: '✅ Configuration file created:',
    nextSteps: '📝 Next steps:',
    step1: '   1. Edit the configuration file with your API keys',
    step2: '   2. Run: ccr code',
    tip: '💡 Tip: Use nano, vim, or your preferred editor to edit the config file',
    failed: '❌ Failed to create configuration file:',
    cancelled: '❌ Setup cancelled by user.',
    success: '🎉 Configuration setup completed successfully!'
  },
  zh: {
    title: '🚀 Claude Code Router 配置设置',
    dirCreated: '✅ 已创建目录:',
    configExists: '⚠️  配置文件已存在:',
    overwritePrompt: '是否要覆盖现有配置文件？这将丢失所有已配置的数据。(y/N): ',
    overwritePromptZh: '是否要覆盖现有配置文件？这将丢失所有已配置的数据。(y/N): ',
    templateNotFound: '❌ 在包中未找到配置模板。',
    installCommand: '   请运行: npm install -g @tellerlin/claude-code-router',
    configCreated: '✅ 配置文件已创建:',
    nextSteps: '📝 后续步骤:',
    step1: '   1. 编辑配置文件，添加您的 API Keys',
    step2: '   2. 运行: ccr code',
    tip: '💡 提示: 使用 nano、vim 或您喜欢的编辑器编辑配置文件',
    failed: '❌ 创建配置文件失败:',
    cancelled: '❌ 用户取消了设置。',
    success: '🎉 配置设置成功完成！'
  }
};

// Detect language preference (you can enhance this with environment variables)
const lang = process.env.LANG && process.env.LANG.includes('zh') ? 'zh' : 'en';
const msg = messages[lang];

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().trim());
    });
  });
}

async function setupConfig() {
  console.log(`${msg.title}\n`);

  // Create directory if it doesn't exist
  if (!fs.existsSync(HOME_DIR)) {
    fs.mkdirSync(HOME_DIR, { recursive: true });
    console.log(`${msg.dirCreated} ${HOME_DIR}`);
  }

  // Check if config already exists
  if (fs.existsSync(CONFIG_FILE)) {
    console.log(`${msg.configExists} ${CONFIG_FILE}`);
    
    const answer = await askQuestion(`${msg.overwritePrompt}\n${msg.overwritePromptZh}\n`);
    
    if (answer !== 'y' && answer !== 'yes') {
      console.log(`\n${msg.cancelled}`);
      return;
    }
  }

  // Copy configuration template (prefer annotated version)
  let templatePath = path.join(packageDir, 'config.example.with-rotation.jsonc');
  
  // Fallback to regular version if annotated version doesn't exist
  if (!fs.existsSync(templatePath)) {
    templatePath = path.join(packageDir, 'config.example.with-rotation.json');
  }
  
  if (!fs.existsSync(templatePath)) {
    console.log(`${msg.templateNotFound}`);
    console.log(`${msg.installCommand}`);
    return;
  }

  try {
    fs.copyFileSync(templatePath, CONFIG_FILE);
    console.log(`${msg.configCreated} ${CONFIG_FILE}`);
    console.log(`\n${msg.nextSteps}`);
    console.log(`${msg.step1}`);
    console.log(`${msg.step2}`);
    console.log(`\n${msg.tip}`);
    console.log(`\n${msg.success}`);
  } catch (error) {
    console.log(`${msg.failed} ${error.message}`);
  }
}

setupConfig(); 