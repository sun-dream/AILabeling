# 构建反馈与修改建议 (build.md)

你好，我已经仔细审查了你的代码（testbed 目录）以及原始网站（origin.html）。你的复刻在技术架构上使用了 Tailwind CSS 和组件化开发，这是一个很好的起点。为了让网站在“完整性”和“美观度”上达到 HiFi Pawlak 的高标准，我们需要进行以下具体的调整。

请按照以下步骤修改你的代码。**不需要重新编写所有文件，只需在现有文件的基础上进行替换和调整。**

## 1. 核心资源替换 (Original Assets)

目前网站使用了大量 AI 生成的素材和通用图标，缺乏品牌识别度。请使用以下原站资源替换现有的占位符。

### 1.1 Logo 替换 (Header)
- **文件**: `components/header.html`
- **操作**: 将现有的文字 Logo (`<a ...>HiFi <span ...>Pawlak</span></a>`) 替换为图片 Logo。
- **资源地址**: `https://hifi-pawlak.de/wp-content/uploads/2021/09/hifi-pawlak-logo.png`
- **样式建议**: 设置图片高度为 `44px` (与原站一致) 或使用 `h-10` / `h-12` 类。

### 1.2 英雄区视频替换 (Hero Video)
- **文件**: `components/topnews.html`
- **操作**: 将 `video` 标签中的 `source` 地址替换为原站的高清视频。目前的 AI 视频无法传达音响店的真实氛围。
- **资源地址**: `https://hifi-pawlak.de/wp-content/images/video-home.mp4`
- **注意**: 保持 `autoplay muted loop` 属性不变。

### 1.3 服务图标替换 (Service Icons)
- **文件**: `components/services-home.html`
- **操作**: 将 Lucide 图标 (`<i data-lucide="...">`) 替换为原站的 SVG 图标。
- **映射关系**:
    - "Persönlich" (原 `user` 图标) -> `https://hifi-pawlak.de/wp-content/images/icon-persoenlich.svg`
    - "Individuell" (原 `sliders` 图标) -> `https://hifi-pawlak.de/wp-content/images/icon-individuell.svg`
    - "Verlässlich" (原 `shield-check` 图标) -> `https://hifi-pawlak.de/wp-content/images/icon-verlaesslich.svg`
- **样式建议**: 保持图标容器大小，图片宽度建议 `w-12` 或 `w-16`。

### 1.4 店铺氛围图片 (Store Atmosphere)
- **文件**: `components/special-offer-client.html` (推荐)
- **操作**: 将右侧的 AI 生成图片（豪华客厅）替换为真实的店铺照片，以增强信任感。
- **资源地址**: `https://hifi-pawlak.de/wp-content/images/store-stadtmitte.jpg`

### 1.5 社交媒体图标 (Footer)
- **文件**: `components/footer.html`
- **操作**: 将底部的 Lucide 社交图标替换为品牌官方 SVG 图标。
- **映射关系**:
    - Instagram -> `https://hifi-pawlak.de/wp-content/images/icon-instagram.svg`
    - Facebook -> `https://hifi-pawlak.de/wp-content/images/icon-facebook.svg`
    - YouTube -> `https://hifi-pawlak.de/wp-content/uploads/2025/09/icon-youtube.svg`

---

## 2. 交互与功能完善 (Interactivity)

### 2.1 导航锚点修复
- **文件**: `components/header.html` 和 `components/footer.html`
- **问题**: 目前导航链接都是 `#`，点击无反应。
- **修改**: 请将导航链接指向页面对应的 Section ID。
    - "Service" -> `#services` (需要在 `services-home.html` 的 section 标签添加 `id="services"`)
    - "Sortiment" -> `#range` (对应 `range-teaser-question.html`)
    - "Angebote" -> `#offers` (对应 `special-offer-client.html`)
    - "Kontakt" -> `#contact` (对应 `footer.html` 或底部区域)

### 2.2 按钮与表单反馈
- **文件**: `script.js`
- **建议**:
    - 确保 `script.js` 中处理了锚点跳转的**平滑滚动 (Smooth Scroll)**，并考虑到顶部固定 Header 的高度偏移（避免标题被遮挡）。
    - 为 Newsletter 订阅按钮添加简单的点击事件，弹出 `alert("感谢订阅！")` 或更改按钮文字为 "已订阅"，给用户明确的反馈。

---

## 3. 美观度与细节 (Aesthetics)

- **字体优化**: 确保 `Futura PT` 字体加载正常。如果无法加载，请提供一个类似的无衬线字体作为回退（如 `Helvetica`, `Arial`），避免直接回退到默认衬线体。
- **波浪分割线**: 目前的波浪分割线在移动端可能会显得过高或拉伸，建议检查其在手机屏幕上的显示效果，必要时调整 `height` 或 `background-size`。

---

**总结**: 请优先完成**第 1 部分（资源替换）**，这对提升网站的“高保真”质感至关重要。完成后，再进行第 2 和第 3 部分的优化。


## 图片记录
### logo
https://aidp.juejin.cn/agentic/api/v1/tool/text2image?prompt=这是 HiFi Pawlak 的品牌logo，背景纯白色，字符内容为：Hifi Pawlak！ ,字体为粗体，纯黑色；所有字符紧密相连，无图形、无装饰、风格简洁专业，适配 HiFi 音响品牌标识调性，底部有红色粗线条横向贯穿整个图。[注意：整体为文字水平单行紧凑排列，无上下分层结构；文字中有感叹号的]&width=237&height=44

### 产品排列图
https://p3-aidp.byteimg.com/tos-cn-i-979rioudue/6f0938cf99354a3d8366284ec129f979~tplv-979rioudue-resize_image.image
https://aidp.juejin.cn/agentic/api/v1/tool/text2image?prompt=尺寸为:1430*919，4 行 6 列网格布局的高端 Hi-Fi 音响设备产品拼贴展示图，共 24 个产品特写 / 场景画面，顶部和底部边缘带有红色波浪弧形装饰条，背景为纯白色，排版规整；展示品类涵盖黑胶唱片机、功放机、落地 / 书架音箱、头戴式耳机、音频播放器、音响线材及高端音频组件等，包含 McIntosh、Grado、Cambridge Audio、Rotel、Burmester 等知名 Hi-Fi 品牌；所有画面为高清特写，色调以金属银灰、黑色为主，搭配少量木质、红色点缀，清晰呈现金属拉丝、磨砂、木质纹理等材质细节，灯光运用专业，凸显产品精致工艺与高端质感，整体风格专业奢华，聚焦高端音频设备的品质与设计。注意：[图片空余部分，不允许使用黑色填充]。&width=1430&height=1430

### 导航徽章
https://p3-aidp.byteimg.com/tos-cn-i-979rioudue/4c4ea37589d64686b48d993969508380~tplv-979rioudue-resize_image.image
https://aidp.juejin.cn/agentic/api/v1/tool/text2image?prompt=尺寸为:生成一张高端奖章风格的徽章图像，画面为正方形构图，整体背景由两块大色面斜向分割组成，左下区域为纯黑色，右上区域为高饱和度正红色，分割线为清晰、笔直的对角线；画面中央居中放置一枚圆形金属质感奖章，奖章整体呈深蓝色到蓝灰色的细腻渐变，具有明显的立体高光和边缘阴影，外圈为略浅的金属描边，体现厚重与质感；奖章内部上方居中位置有一个简洁的白色品牌标志图形，其下方以大号、粗体、白色无衬线字体写有“TOP 40”，文字清晰、居中、具有权威感，下方以较小字号白色字体写有“HIFI-HÄNDLER”，再下方为更小的年份文字“2022/23”；奖章左右两侧对称分布一圈月桂叶图案，颜色为浅灰或银色，环绕文字形成经典荣誉徽章结构；整体风格正式、权威、高端、偏欧洲奖项设计语言，画面干净利落，无人物、无多余装饰、无复杂纹理，适用于高端音响行业评选、榜单或认证标识的视觉呈现。&width=430&height=430