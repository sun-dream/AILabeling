请帮我完成【图片生成与替换】流程：
1. **接口信息**：
   - 接口地址：`https://aidp.juejin.cn/agentic/api/v1/tool/text2image`
   - 参数要求：width=80, height=80
   - 画面描述（Prompt）：[在此处填写画面描述，如：极简风格的蓝色 Logo，包含 RLCR 字母]

2. **执行动作**：
   - 请请求上述接口。
   - **动作 A (代码替换)**：获取接口重定向后的**最终 CDN 链接**（如 p3-aidp.byteimg.com...），替换文件 `[文件路径]` 第 `[行号]` 行的图片 src。
   - **动作 B (文档记录)**：将包含完整参数的**原始 API 链接**（如 aidp.juejin.cn...?prompt=...），追加写入到文件 `[文件路径]` 的末尾。