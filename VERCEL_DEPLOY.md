# Vercel 部署说明

## 环境变量设置

在 Vercel 项目设置中，只需要设置 **一个** 环境变量：

### 必需的环境变量

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 可选的环境变量

```
GEMINI_MODEL=gemini-2.5-flash
```

## 部署步骤

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 Vercel 中导入项目
3. 在项目设置 → **Environment Variables** 中添加：
   - **Key**: `GEMINI_API_KEY`
   - **Value**: 你的 Gemini API 密钥
   - **Environment**: Production, Preview, Development（全选）
4. （可选）添加 `GEMINI_MODEL` = `gemini-2.5-flash`（前端会自动使用 gemini-2.5-flash，此变量主要用于后端）
5. 点击 **Save** 并重新部署项目

## 说明

✅ **统一环境变量名称**：前端和后端都使用 `GEMINI_API_KEY`

- **前端（Vite）**：通过 `vite.config.js` 自动将 `GEMINI_API_KEY` 映射为 `VITE_GEMINI_API_KEY` 供客户端使用
- **后端（Python）**：直接读取 `GEMINI_API_KEY` 环境变量

✅ **只需设置一次**：在 Vercel 的 Environment Variables 中设置 `GEMINI_API_KEY` 即可，无需设置多个变量

## 本地开发

本地开发时，在项目根目录创建 `.env` 文件：

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```
