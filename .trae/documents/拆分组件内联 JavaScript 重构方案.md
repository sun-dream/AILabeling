# 重构方案：拆分组件内联 JavaScript

这个重构非常可行且建议实施，它能显著提高代码的可维护性和清晰度。由于项目中 [script.js](file:///e:/lcy/codeing/lcy/AILabeling/7597789331080040202/testbed/script.js) 已经具备了处理组件内 `<script src="...">` 标签的逻辑，因此拆分过程不会破坏现有的组件加载机制。

## 实施步骤：

### 1. 准备工作
- 在项目根目录下创建 `js/` 文件夹，专门用于存放各组件的脚本。

### 2. 提取并转换
针对包含内联脚本的组件（已通过扫描确定）：
- **提取**：将 HTML 中 `<script>` 标签内的 JS 代码提取出来。
- **创建**：在 `js/` 目录下创建对应的 `.js` 文件（例如 `js/header.js`）。
- **替换**：将 HTML 中的内联脚本替换为外部引用，例如 `<script src="js/header.js"></script>`。

### 3. 涉及文件清单
- [header.html](file:///e:/lcy/codeing/lcy/AILabeling/7597789331080040202/testbed/components/header.html) -> `js/header.js`
- [customer-review.html](file:///e:/lcy/codeing/lcy/AILabeling/7597789331080040202/testbed/components/customer-review.html) -> `js/customer-review.js`
- [contact-text-form.html](file:///e:/lcy/codeing/lcy/AILabeling/7597789331080040202/testbed/components/contact-text-form.html) -> `js/contact-text-form.js`
- [service-intro-pic.html](file:///e:/lcy/codeing/lcy/AILabeling/7597789331080040202/testbed/components/service-intro-pic.html) -> `js/service-intro-pic.js`

### 4. 验证
- 检查导航栏固定、Mega Menu、表单交互等逻辑是否依然正常工作。

您是否同意按照这个方案开始操作？确认后我将立即执行。
