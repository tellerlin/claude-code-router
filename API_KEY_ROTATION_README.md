# API Key 轮询功能实现说明

## 🎯 功能概述

本项目为 Claude Code Router 实现了完整的 API Key 轮询功能，支持多种轮询策略、错误处理和监控。

## 🏗️ 架构设计

### 核心组件

1. **ApiKeyRotator** (`src/utils/apiKeyRotation.ts`)
   - 核心轮询逻辑
   - 支持多种轮询策略
   - 状态管理和错误处理

2. **ApiKeyRotationTransformer** (`src/utils/apiKeyRotationTransformer.ts`)
   - 与现有转换器系统集成
   - 请求处理和重试逻辑
   - 全局状态管理

3. **ConfigProcessor** (`src/utils/configProcessor.ts`)
   - 配置解析和验证
   - 向后兼容性处理
   - 初始化轮询系统

4. **Status Monitor** (`src/utils/status.ts`)
   - 轮询状态监控
   - 命令行状态显示

## 🔧 实现细节

### 轮询策略

```typescript
type RotationStrategy = 'round_robin' | 'random' | 'weighted' | 'least_used';
```

- **round_robin**: 顺序轮询，确保负载均衡
- **random**: 随机选择，适合高并发场景
- **weighted**: 加权轮询，支持不同权重的API Key
- **least_used**: 最少使用优先，适合资源优化

### 错误处理机制

1. **失败计数**: 记录每个API Key的失败次数
2. **冷却机制**: 失败的Key进入冷却期
3. **自动禁用**: 超过最大失败次数的Key自动禁用
4. **自动恢复**: 成功的请求重置失败计数

### 配置格式

#### 基本格式
```json
{
  "api_keys": ["sk-xxx1", "sk-xxx2", "sk-xxx3"],
  "enable_rotation": true,
  "rotation_strategy": "round_robin"
}
```

#### 高级格式
```json
{
  "api_keys": [
    {
      "key": "sk-xxx1",
      "weight": 2,
      "maxFailures": 5,
      "cooldownTime": 60000
    }
  ],
  "enable_rotation": true,
  "rotation_strategy": "weighted",
  "retry_on_failure": true,
  "max_retries": 3
}
```

## 🚀 使用方法

### 1. 配置轮询

在 `~/.claude-code-router/config.json` 中配置：

```json
{
  "Providers": [
    {
      "name": "deepseek",
      "api_base_url": "https://api.deepseek.com/chat/completions",
      "api_keys": ["sk-xxx1", "sk-xxx2", "sk-xxx3"],
      "enable_rotation": true,
      "rotation_strategy": "round_robin",
      "models": ["deepseek-chat"]
    }
  ]
}
```

### 2. 启动服务

```bash
ccr start
```

### 3. 监控状态

```bash
# 基本状态
ccr status

# 详细轮询状态
ccr rotation
```

## 📊 监控和调试

### 状态信息

轮询系统提供详细的状态信息：

- **Total Keys**: 总API Key数量
- **Available Keys**: 当前可用的API Key数量
- **Key Status**: 每个API Key的详细状态
  - 活跃状态
  - 失败次数
  - 最后失败时间
  - 最后使用时间

### 日志记录

系统会记录以下事件：

- API Key轮询注册
- 轮询选择过程
- 成功/失败标记
- 错误重试

## 🔄 与上游同步策略

### 分支管理

```
main (保持与上游同步)
├── feature/api-key-rotation (轮询功能分支)
├── upstream-sync (临时同步分支)
└── hotfix/rotation-bug (紧急修复)
```

### 同步步骤

1. **保持上游同步**
```bash
git remote add upstream https://github.com/musistudio/claude-code-router.git
git fetch upstream
git checkout main
git merge upstream/main
```

### 项目信息

- **Fork版本**: [tellerlin/claude-code-router](https://github.com/tellerlin/claude-code-router)
- **原始版本**: [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
- **主要改进**: 新增API Key轮询功能

2. **功能隔离**
- 轮询功能封装在独立模块中
- 使用配置开关控制功能启用
- 保持向后兼容性

3. **冲突处理**
- 优先保留上游更改
- 手动合并轮询相关代码
- 测试确保功能正常

### 最佳实践

1. **模块化设计**: 轮询功能完全独立，不影响核心功能
2. **配置驱动**: 通过配置文件控制功能启用
3. **向后兼容**: 现有配置无需修改即可使用
4. **错误处理**: 完善的错误处理和恢复机制
5. **监控支持**: 提供详细的状态监控

## 🧪 测试建议

### 单元测试

- API Key轮询逻辑测试
- 各种轮询策略测试
- 错误处理测试
- 配置解析测试

### 集成测试

- 与现有转换器系统集成测试
- 端到端请求处理测试
- 错误重试机制测试

### 性能测试

- 高并发场景测试
- 内存使用测试
- 响应时间测试

## 🔮 未来扩展

### 可能的改进

1. **动态配置**: 支持运行时修改轮询配置
2. **健康检查**: 定期检查API Key有效性
3. **负载均衡**: 更智能的负载分配算法
4. **监控告警**: 集成监控和告警系统
5. **API管理**: 提供API Key管理界面

### 兼容性考虑

- 保持与现有配置格式的兼容性
- 支持渐进式升级
- 提供迁移工具和文档

## 📝 总结

这个API Key轮询功能实现具有以下特点：

1. **功能完整**: 支持多种轮询策略和错误处理
2. **易于使用**: 简单的配置和监控命令
3. **高度可扩展**: 模块化设计，易于扩展
4. **向后兼容**: 不影响现有功能
5. **生产就绪**: 完善的错误处理和监控

通过这个实现，用户可以轻松配置多个API Key，提高系统的可用性和稳定性，同时保持与上游项目的良好同步。 