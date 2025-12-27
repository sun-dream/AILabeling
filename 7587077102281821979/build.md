# 页面复刻评审与修改指南

## 0. 当前项目目录结构 (testbed/src)
```
src/
├── assets/
│   └── react.svg
├── components/
│   ├── Footer.jsx    (已更新：按钮链接修复)
│   ├── Hero.jsx      (已更新：拖拽优化，撕纸元素补全)
│   ├── Intro.jsx     (新创建：包含简介和报名按钮)
│   ├── Lectures.jsx  (已更新：包含 Predavanja 和 Radionice 版块)
│   ├── Navbar.jsx    (新创建：响应式导航)
│   ├── Paper.jsx     (已更新：拖拽性能优化，移除阴影)
│   ├── Schedule.jsx  (待优化：数据提取)
│   └── Workshops.jsx (已删除：功能合并至 Lectures.jsx)
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## 1. 最新进展 (Progress Update)
经过最近的修改，项目核心功能已取得显著进展：
*   **导航与简介完善**：`Navbar` 和 `Intro` 组件已成功创建并集成，页面结构不再缺失。导航链接已统一指向 `https://www.example.com`。
*   **Hero 区域优化**：
    *   **完整性**：已从原网站提取并添加了 30+ 个撕纸装饰元素，视觉还原度大幅提升。
    *   **交互体验**：重构了拖拽逻辑，移除了拖拽时的阴影效果（符合原设计），并消除了拖拽过程中的卡顿现象，体验丝滑。
*   **Footer 修复**：底部的 "POGLEDAJ IZLOŽBU" 按钮已修复为链接跳转。

---

## 2. 后续修改建议 (Remaining Action Items)

### HTML/组件结构
*   **Lectures & Workshops 组件**：
    *   **数据分离**：目前的数据（讲座列表、工作坊列表）硬编码在组件内部。建议将其提取到单独的 JSON 文件或常量文件中，以便于维护。
    *   **交互增强**：目前的讲座和工作坊卡片仅作展示。请检查需求，如果需要点击查看详情，请使用 `<a>` 标签包裹卡片内容，并指向 `https://www.example.com`。
    *   **视觉丰富**：目前的卡片样式较为单一（白色背景+阴影）。建议参考 `Hero` 区域的实现，为部分卡片引入背景纹理图片，以增强“拼贴”风格的视觉冲击力。

### CSS/样式
*   **撕纸边缘 (Torn Edges)**：
    *   目前部分组件使用 CSS `clip-path` 模拟撕纸边缘。建议逐步替换为使用图片素材（如 `.paper-top-green`），以获得更真实的纸张质感。
*   **颜色校准**：
    *   请再次核对 `tailwind.config.js` 中的自定义颜色（如 `neonLime`, `vividOrange`），确保与原设计稿完全一致。

### 图片资源本地化 (Image Assets)
目前所有图片均引用自 `https://da-festival.hr/...` 的远程链接。为了保证项目的稳定性和加载速度，建议执行以下操作：
1.  **创建目录**：在 `src/assets/images` 下创建文件夹。
2.  **下载资源**：将下列关键图片下载到本地。
3.  **替换引用**：修改组件代码，将远程 URL 替换为本地 import 路径。

**关键图片资源清单（源自 origin.html）：**

*   **全局/导航：**
    *   Logo: `https://da-festival.hr/wp-content/themes/da2025/assets/logo.svg`
    *   菜单背景: `https://da-festival.hr/wp-content/themes/da2025/assets/menu-bg.png`
    *   菜单条: `https://da-festival.hr/wp-content/themes/da2025/assets/menu_bg.png`

*   **Hero 区域：**
    *   白色纸片背景: `https://da-festival.hr/wp-content/themes/da2025/assets/paper-white.png`
    *   长条纸片背景: `https://da-festival.hr/wp-content/themes/da2025/assets/paper-white-long.png`
    *   报名按钮 (默认): `https://da-festival.hr/wp-content/themes/da2025/assets/prijavi-button-bg.png`
    *   报名按钮 (悬停): `https://da-festival.hr/wp-content/themes/da2025/assets/prijavi-hover.png`
    *   撕纸装饰 (部分): `https://da-festival.hr/wp-content/themes/da2025/assets/p1.webp` (及其他 p2-p15.webp)

*   **装饰/分隔：**
    *   绿色顶部撕纸: `https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green.png`
    *   橙色顶部撕纸: `https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_orange.png`
    *   水平纸张边缘: `https://da-festival.hr/wp-content/themes/da2025/assets/paper-horizontal.png`

*   **特殊卡片背景：**
    *   Organizirano Oblikovanje: `https://da-festival.hr/wp-content/uploads/2025/03/organiziranoobl.png`
    *   Ivan Veljača: `https://da-festival.hr/wp-content/uploads/2025/03/ivan-veljaca-papirici-1.png`
