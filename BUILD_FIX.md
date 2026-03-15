# 🔧 Vercel 构建失败修复指南

## 错误：Command "vite build" exited with 127

退出代码 127 通常表示命令未找到。以下是修复步骤：

## ✅ 已应用的修复

1. **创建了 `vercel.json`** - 明确指定构建配置
2. **更新了 `package.json`** - 添加了 Node.js 版本要求
3. **创建了 `.nvmrc`** - 指定 Node.js 版本为 20

## 🔍 检查清单

### 1. 在 Vercel 项目设置中检查

**Settings → General → Node.js Version**
- 确保设置为 **20.x** 或更高版本
- 或者使用 `.nvmrc` 文件（已创建）

### 2. 检查环境变量

**Settings → Environment Variables**
- 确保 `GEMINI_API_KEY` 已设置
- 环境选择：Production, Preview, Development（全选）

### 3. 检查构建日志

在 Vercel 部署页面查看详细错误信息：
- 点击失败的部署
- 查看 "Build Logs"
- 查找具体错误信息

## 🛠️ 可能的解决方案

### 方案 1：清除缓存并重新部署

1. 在 Vercel 项目设置中
2. 点击 **"Redeploy"**
3. 选择 **"Use existing Build Cache"** = ❌ (取消勾选)
4. 点击 **"Redeploy"**

### 方案 2：检查 package-lock.json

确保 `package-lock.json` 已提交到 Git：
```bash
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

### 方案 3：简化构建（如果仍有问题）

如果问题持续，可以尝试简化 `vite.config.js`：

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

然后在代码中直接使用：
```js
const apiKey = import.meta.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY
```

## 📋 验证步骤

1. ✅ 确认 `vercel.json` 存在
2. ✅ 确认 `package.json` 有 `engines` 字段
3. ✅ 确认 `.nvmrc` 文件存在
4. ✅ 确认 `package-lock.json` 已提交
5. ✅ 在 Vercel 设置中指定 Node.js 版本为 20

## 🚀 重新部署

完成上述检查后：
1. 推送所有更改到 Git
2. 在 Vercel 中触发新的部署
3. 查看构建日志确认成功

## 💡 如果仍然失败

请提供 Vercel 构建日志的完整错误信息，以便进一步诊断。
