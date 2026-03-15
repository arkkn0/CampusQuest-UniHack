# 🚀 CampusQuest 部署指南

## 📁 项目结构说明

这是一个**前后端分离**的项目：

### 前端部分（React + Vite）
- **位置**: `src/` 目录下的所有文件
- **技术栈**: React 19 + Vite
- **功能**: 相机拍照、识别地点、显示奖励
- **部署**: ✅ **可以直接用 Vercel 部署**

### 后端部分（Python FastAPI）
- **位置**: `main.py`
- **技术栈**: FastAPI + Google Gemini API
- **功能**: 图像识别 API（现在已改为前端直接调用 Gemini）
- **状态**: ⚠️ **现在前端直接调用 Gemini API，不再需要 Python 后端**

## 🎯 部署方式

### 方式一：只用 Vercel 部署前端（推荐）⭐

**现在推荐使用这种方式**，因为前端已经直接调用 Gemini API，不需要 Python 后端。

#### 步骤：

1. **准备代码**
   ```bash
   # 确保代码已提交到 Git
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **在 Vercel 部署**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 **"Add New Project"**
   - 导入你的 GitHub/GitLab/Bitbucket 仓库
   - Vercel 会自动检测到这是一个 Vite 项目

3. **设置环境变量**
   - 在项目设置 → **Environment Variables**
   - 添加：
     ```
     Key: GEMINI_API_KEY
     Value: 你的 Gemini API 密钥
     Environment: Production, Preview, Development（全选）
     ```
   - 点击 **Save**

4. **部署**
   - Vercel 会自动构建和部署
   - 构建命令：`npm run build`（自动）
   - 输出目录：`dist`（自动）

5. **完成！**
   - 部署完成后会得到一个 URL，例如：`https://your-project.vercel.app`
   - 访问即可使用

#### Vercel 自动配置：
- ✅ 自动检测 Vite 项目
- ✅ 自动运行 `npm install` 和 `npm run build`
- ✅ 自动配置路由和静态文件服务
- ✅ 支持环境变量

---

### 方式二：同时部署前后端（如果需要 Python API）

如果你还需要 Python 后端 API（`main.py`），需要：

1. **前端部署到 Vercel**（同上）
2. **后端部署到其他平台**（Vercel 不支持 Python 后端）：
   - **选项 A**: Railway.app
   - **选项 B**: Render.com
   - **选项 C**: Fly.io
   - **选项 D**: Google Cloud Run
   - **选项 E**: AWS Lambda + API Gateway

#### 后端部署示例（Railway）：

1. 访问 [railway.app](https://railway.app)
2. 创建新项目，选择 GitHub 仓库
3. 添加环境变量：
   ```
   GEMINI_API_KEY=你的密钥
   GEMINI_MODEL=gemini-2.5-flash
   ```
4. Railway 会自动检测 Python 项目并部署
5. 获得后端 URL，例如：`https://your-api.railway.app`
6. 在前端代码中更新 API 地址（如果需要）

---

## 🛠️ 本地开发

### 前端开发

```bash
# 1. 安装依赖
npm install

# 2. 创建 .env 文件
echo "GEMINI_API_KEY=your_api_key_here" > .env

# 3. 启动开发服务器
npm run dev

# 4. 访问 http://localhost:5173
```

### 后端开发（可选）

```bash
# 1. 安装 Python 依赖
pip install -r requirements.txt

# 2. 创建 .env 文件
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "GEMINI_MODEL=gemini-2.5-flash" >> .env

# 3. 启动后端服务器
uvicorn main:app --reload

# 4. 后端运行在 http://localhost:8000
```

---

## ✅ 推荐部署方案

**对于这个项目，推荐：**

1. ✅ **只用 Vercel 部署前端**
   - 前端已经直接调用 Gemini API
   - 不需要 Python 后端
   - 最简单、最快、免费

2. **环境变量设置**：
   - 在 Vercel 中设置 `GEMINI_API_KEY`
   - 前端会自动使用

3. **部署完成**：
   - 访问 Vercel 提供的 URL
   - 功能完全可用

---

## 📝 重要提示

1. **API 密钥安全**：
   - ⚠️ 不要将 API 密钥提交到 Git
   - ✅ 只在 Vercel 环境变量中设置
   - ✅ 本地开发使用 `.env` 文件（已添加到 `.gitignore`）

2. **构建优化**：
   - Vercel 会自动优化构建
   - 生产环境会自动压缩和优化代码

3. **域名配置**：
   - Vercel 提供免费域名：`your-project.vercel.app`
   - 可以绑定自定义域名

---

## 🎉 总结

**是的，可以直接用 Vercel 部署！**

- ✅ 前端项目完全支持 Vercel
- ✅ 只需设置 `GEMINI_API_KEY` 环境变量
- ✅ 一键部署，自动构建
- ✅ 免费使用，性能优秀

**部署步骤**：
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 设置 `GEMINI_API_KEY` 环境变量
4. 点击部署，完成！
