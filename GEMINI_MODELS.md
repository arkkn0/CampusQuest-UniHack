# Gemini API 模型名称参考

## 当前支持的模型

代码会自动尝试以下模型（按优先级）：

### v1beta API（优先，包含最新模型）
1. `gemini-2.5-flash` - **Gemini 2.5 Flash（主要模型）** ⭐
2. `gemini-2.0-flash-exp` - Gemini 2.0/2.5 实验版本（备用）
3. `gemini-1.5-flash-latest` - 最新 Flash 版本（备用）
4. `gemini-1.5-flash` - 稳定 Flash 版本（备用）

### v1 API（备用，仅稳定模型）
5. `gemini-1.5-flash-latest` - 最新 Flash（v1 API）
6. `gemini-1.5-flash` - 稳定 Flash（v1 API）

**注意：** 
- `gemini-1.5-pro` 系列在 v1 API 中不存在，已移除
- 代码会优先尝试 v1beta API（包含 gemini-2.5-flash）
- 如果 v1beta 失败，会自动尝试 v1 API 的稳定模型

## 关于 Gemini 2.5

**主要模型：** `gemini-2.5-flash`

这是 Gemini 2.5 的正式 Flash 模型名称。代码会优先使用这个模型。

如果遇到 404 错误，代码会自动尝试其他可用的模型。

## 如何查看可用模型

可以通过以下 API 调用查看所有可用模型：

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY"
```

## 常见问题

### Q: 为什么使用 v1beta？
A: v1beta API 通常包含最新的实验性模型，包括 Gemini 2.0/2.5。

### Q: 如果所有模型都返回 404？
A: 检查：
1. API 密钥是否正确
2. API 密钥是否有访问这些模型的权限
3. 模型名称是否已更改

### Q: 如何只使用特定模型？
A: 修改 `models` 数组，只保留你想要的模型名称。
