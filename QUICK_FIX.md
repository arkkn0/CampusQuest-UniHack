# ⚡ 快速修复：无法处理图片

## 🎯 最可能的原因

你提到使用了 "gemini key id"，**这可能是问题所在**！

### ❌ 错误做法
- 环境变量名称：`GEMINI_API_KEY_ID` 
- 或者只设置了 Key ID 而不是完整的 API Key

### ✅ 正确做法
- 环境变量名称：`GEMINI_API_KEY`（不是 ID）
- 值：完整的 API 密钥（以 `AIza` 开头）

---

## 🔧 立即修复步骤

### 步骤 1：检查环境变量名称

在 Vercel：
1. 进入项目 → **Settings** → **Environment Variables**
2. 检查变量名称：
   - ✅ 应该是：`GEMINI_API_KEY`
   - ❌ 不应该是：`GEMINI_API_KEY_ID`、`GEMINI_KEY_ID` 等

### 步骤 2：检查 API 密钥值

**API 密钥格式：**
- 应该以 `AIza` 开头
- 长度约 39 个字符
- 例如：`AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567`

**如果只有 Key ID：**
- Key ID 不是 API 密钥
- 需要获取完整的 API 密钥

**获取完整 API 密钥：**
1. 访问：https://makersuite.google.com/app/apikey
2. 点击 "Create API Key"
3. 复制完整的密钥（不是 ID）

### 步骤 3：重新部署

**重要：** 修改环境变量后必须重新部署！

1. 在 Vercel 项目页面
2. 点击 **"Deployments"** 标签
3. 点击最新部署右侧的 **"..."**
4. 选择 **"Redeploy"**
5. 等待部署完成

### 步骤 4：测试

1. 访问部署的网站
2. 打开开发者工具（F12）
3. 切换到 Console 标签
4. 尝试拍照
5. 查看是否有错误信息

---

## 🔍 验证环境变量是否正确

### 方法 1：检查 Vercel 设置

在 Vercel Environment Variables 页面：
- ✅ Key: `GEMINI_API_KEY`
- ✅ Value: `AIza...`（完整密钥）
- ✅ Environment: 全选（Production, Preview, Development）

### 方法 2：检查浏览器控制台

打开网站后，在浏览器控制台运行：
```javascript
// 这会显示 API 密钥是否存在（不显示实际值）
console.log('API Key exists:', typeof import.meta.env.VITE_GEMINI_API_KEY !== 'undefined' && import.meta.env.VITE_GEMINI_API_KEY !== '');
```

如果显示 `false`，说明环境变量未正确设置。

---

## 📋 检查清单

- [ ] 环境变量名称是 `GEMINI_API_KEY`（不是 ID）
- [ ] API 密钥是完整的密钥（以 `AIza` 开头）
- [ ] 所有环境都已选择（Production, Preview, Development）
- [ ] 已经重新部署（修改环境变量后）
- [ ] 浏览器控制台没有错误信息

---

## 🆘 如果仍然不行

请检查浏览器控制台的错误信息：

1. **"GEMINI_API_KEY not found"**
   → 环境变量未设置或未重新部署

2. **"Gemini API error: 400"**
   → API 密钥格式错误

3. **"Gemini API error: 403"**
   → API 密钥无效或未启用 Gemini API

4. **"Gemini API error: 429"**
   → API 配额用尽

---

## 💡 提示

- **Key ID ≠ API Key**：Key ID 只是标识符，不能用来调用 API
- **必须重新部署**：修改环境变量后，Vercel 需要重新构建才能生效
- **检查所有环境**：确保 Production、Preview、Development 都设置了
