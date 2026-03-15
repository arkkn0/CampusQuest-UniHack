# ⚡ 快速开始指南

## 🎯 一句话总结

**是的，可以直接用 Vercel 部署！** 这是一个前端项目，Vercel 完全支持。

---

## 📋 3 步部署到 Vercel

### 第 1 步：准备代码
```bash
# 确保代码已推送到 GitHub
git add .
git commit -m "Ready for Vercel"
git push
```

### 第 2 步：在 Vercel 创建项目
1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 **"Add New Project"**
3. 选择你的 GitHub 仓库
4. Vercel 会自动检测到 Vite 项目 ✅

### 第 3 步：设置环境变量
在项目设置页面：
1. 点击 **Settings** → **Environment Variables**
2. 添加新变量：
   - **Name**: `GEMINI_API_KEY`
   - **Value**: 你的 Gemini API 密钥
   - **Environment**: 全选（Production, Preview, Development）
3. 点击 **Save**
4. 点击 **Deploy**

### ✅ 完成！
部署完成后，你会得到一个 URL，例如：`https://your-project.vercel.app`

---

## 🏠 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 创建 .env 文件（在项目根目录）
echo "GEMINI_API_KEY=your_api_key_here" > .env

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问 http://localhost:5173
```

---

## ❓ 常见问题

### Q: 需要部署 Python 后端吗？
**A: 不需要！** 前端已经直接调用 Gemini API，不需要 Python 后端。

### Q: Vercel 会自动构建吗？
**A: 是的！** Vercel 会自动：
- 运行 `npm install`
- 运行 `npm run build`
- 部署到 CDN

### Q: 如何更新代码？
**A: 推送代码到 GitHub，Vercel 会自动重新部署。**

### Q: 环境变量在哪里设置？
**A: Vercel 项目设置 → Environment Variables**

---

## 📚 更多信息

详细部署说明请查看：[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
