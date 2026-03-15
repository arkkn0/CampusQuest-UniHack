# 🔧 故障排除指南 - "Cannot Process Image"

## ❌ 问题：设置了环境变量但无法处理图片

### 🔍 可能的原因和解决方案

#### 1. **环境变量名称错误** ⚠️ 最常见

**检查：**
- 在 Vercel 中，环境变量名称必须是：`GEMINI_API_KEY`（不是 `GEMINI_API_KEY_ID` 或其他）
- 值应该是完整的 API 密钥，不是密钥 ID

**正确设置：**
```
Key: GEMINI_API_KEY
Value: AIzaSy...（完整的 API 密钥）
Environment: Production, Preview, Development（全选）
```

**错误示例：**
```
❌ GEMINI_API_KEY_ID
❌ GEMINI_KEY
❌ VITE_GEMINI_API_KEY（虽然可以，但建议用 GEMINI_API_KEY）
```

---

#### 2. **需要重新部署** 🔄

**重要：** 在 Vercel 中设置环境变量后，必须重新部署才能生效！

**步骤：**
1. 在 Vercel 项目页面
2. 点击 **"Deployments"** 标签
3. 点击最新的部署右侧的 **"..."** 菜单
4. 选择 **"Redeploy"**
5. 或者推送新的代码触发自动部署

---

#### 3. **环境变量未应用到所有环境** 🌍

**检查：**
在 Vercel 设置环境变量时，确保选择了所有环境：
- ✅ Production
- ✅ Preview  
- ✅ Development

如果只选择了 Production，Preview 部署可能无法访问环境变量。

---

#### 4. **API 密钥格式错误** 🔑

**检查 API 密钥：**
- Gemini API 密钥通常以 `AIza` 开头
- 长度大约 39 个字符
- 不应该包含空格或换行符

**获取正确的 API 密钥：**
1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 创建新的 API 密钥
3. 复制完整的密钥（包括 `AIza` 前缀）

---

#### 5. **构建时环境变量未读取** 🏗️

**问题：** Vite 在构建时读取环境变量。如果构建时环境变量不存在，即使后来添加也不会生效。

**解决方案：**
1. 确保在部署前设置环境变量
2. 或者重新部署（见上面的步骤 2）

---

## ✅ 验证步骤

### 步骤 1：检查环境变量设置

在 Vercel 项目：
1. 进入 **Settings** → **Environment Variables**
2. 确认存在 `GEMINI_API_KEY`
3. 确认值是正确的 API 密钥
4. 确认所有环境都已选择

### 步骤 2：检查浏览器控制台

1. 打开部署的网站
2. 按 F12 打开开发者工具
3. 切换到 **Console** 标签
4. 尝试拍照
5. 查看是否有错误信息

**常见错误：**
- `GEMINI_API_KEY not found` → 环境变量未设置或未重新部署
- `Gemini API error: 400` → API 密钥格式错误
- `Gemini API error: 403` → API 密钥无效或未启用
- `Gemini API error: 429` → API 配额用尽

### 步骤 3：检查网络请求

1. 在开发者工具中切换到 **Network** 标签
2. 尝试拍照
3. 查找对 `generativelanguage.googleapis.com` 的请求
4. 查看请求状态：
   - **200** = 成功
   - **400/403** = API 密钥问题
   - **500** = 服务器错误

---

## 🛠️ 快速修复步骤

1. **确认环境变量名称**：`GEMINI_API_KEY`
2. **确认 API 密钥格式**：以 `AIza` 开头，39 字符
3. **确认所有环境已选择**：Production, Preview, Development
4. **重新部署**：在 Vercel 中触发新的部署
5. **清除浏览器缓存**：Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)
6. **测试**：再次尝试拍照

---

## 📝 调试代码

如果问题持续，可以在代码中添加调试信息：

在浏览器控制台查看：
```javascript
console.log('API Key exists:', !!import.meta.env.VITE_GEMINI_API_KEY);
console.log('API Key length:', import.meta.env.VITE_GEMINI_API_KEY?.length);
```

**注意：** 不要在生产环境中打印完整的 API 密钥！

---

## 🆘 如果仍然无法解决

请提供以下信息：
1. Vercel 构建日志（是否有错误）
2. 浏览器控制台的错误信息
3. Network 标签中的 API 请求详情（状态码、响应内容）
4. 环境变量的设置截图（隐藏实际密钥值）
