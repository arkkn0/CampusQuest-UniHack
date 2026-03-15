# ✅ 模型名称对齐检查

## 已对齐的文件

### 前端文件
- ✅ `src/components/QRScanner.jsx`
  - 主要模型：`gemini-2.5-flash`（第一位）
  - 备用模型：`gemini-2.0-flash-exp`, `gemini-1.5-flash-latest`, 等

### 后端文件
- ✅ `main.py`
  - 默认模型：`gemini-2.5-flash`
  - 可通过环境变量 `GEMINI_MODEL` 覆盖

### 配置文件
- ✅ `vite.config.js`
  - 环境变量映射：`GEMINI_API_KEY` → `VITE_GEMINI_API_KEY`

### 文档文件
- ✅ `GEMINI_MODELS.md` - 已更新
- ✅ `VERCEL_DEPLOY.md` - 已更新
- ✅ `DEPLOYMENT_GUIDE.md` - 已更新

## 模型使用说明

### 前端（QRScanner.jsx）
```javascript
const models = [
  'gemini-2.5-flash',          // 主要模型 ⭐
  'gemini-2.0-flash-exp',      // 备用
  'gemini-1.5-flash-latest',   // 备用
  // ...
];
```

### 后端（main.py）
```python
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip()
```

## 环境变量设置

### Vercel
```
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash  # 可选，前端会自动使用 gemini-2.5-flash
```

### 本地开发
```env
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash  # 可选
```

## API 版本

代码会尝试：
1. `v1beta` API（优先，通常有最新模型）
2. `v1` API（备用）

## 验证

所有文件已对齐使用 `gemini-2.5-flash` 作为主要模型。

✅ **检查完成** - 所有文件已对齐
