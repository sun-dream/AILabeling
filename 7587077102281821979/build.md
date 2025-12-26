# 项目重构与复刻指导手册 (Project Refactoring & Build Guide)

为了让项目结构更清晰、易于维护，并精确还原设计稿的“拼贴美学”，你需要按照以下方案对现有代码进行**组件化重构**和**视觉修正**。

## 1. 组件化重构方案 (Componentization Strategy)

目前项目组件划分较为扁平，建议采用“原子化”思维，提取通用 UI 组件。

### 1.1 建议目录结构
```text
src/
├── components/
│   ├── common/            # 通用基础组件 (可在多处复用)
│   │   ├── Navbar.jsx     # [新增] 顶部导航栏 (Logo + 菜单)
│   │   ├── EventCard.jsx  # [新增] 通用活动卡片 (用于讲座和工作坊)
│   │   ├── SectionDivider.jsx # [新增] 撕纸边缘分割线
│   │   └── Marquee.jsx    # [新增] 跑马灯滚动条 (从 Footer 提取)
│   ├── sections/          # 页面主要业务板块
│   │   ├── Hero.jsx       # Hero 区域 (使用 DraggablePaper)
│   │   ├── Lectures.jsx   # 讲座板块 (使用 EventCard + SectionDivider)
│   │   ├── Workshops.jsx  # 工作坊板块 (使用 EventCard + SectionDivider)
│   │   ├── Schedule.jsx   # 日程板块
│   │   └── Footer.jsx     # 页脚 (包含 Marquee + Sponsors)
│   └── ui/                # 独立交互单元
│       └── DraggablePaper.jsx # [原 Paper.jsx] 负责单个纸片的物理拖拽逻辑
└── App.jsx                # 组装所有 Section
```

### 1.2 核心组件开发规范

#### A. `SectionDivider.jsx` (通用分割线)
*   **功能**：统一处理板块之间的“撕纸”过渡效果，替代原本 CSS `clip-path` 的简陋实现。
*   **Props**: `imageSrc` (撕纸图片链接), `bgColor` (接壤的背景色, 用于填补缝隙)。
*   **实现**：使用 `<picture>` 标签包裹 `<img>`，宽度 `w-full`，高度自适应，确保视觉上无缝连接。

#### B. `EventCard.jsx` (通用卡片)
*   **功能**：统一讲座 (Lectures) 和工作坊 (Workshops) 的卡片样式。
*   **Props**:
    *   `title` (标题)
    *   `subtitle` (副标题/日期)
    *   `bgImage` (背景纹理图)
    *   `fgImage` (前景主体图 - 人物或文字)
*   **布局逻辑**：
    *   父容器：`relative aspect-[320/380] overflow-hidden`
    *   背景层：`absolute inset-0 object-cover z-0` (渲染 `bgImage`)
    *   前景层：`relative z-10 w-full h-full object-cover` (渲染 `fgImage`)
    *   **注意**：必须实现鼠标 Hover 时前景/背景的微动或视差效果（参考 `instruction.md` 的磁吸感描述）。

#### C. `DraggablePaper.jsx` (Hero 纸片)
*   **修改点**：
    *   移除 `lucide-react` 图标依赖。
    *   移除 `color` 属性（纯色背景）。
    *   **新增** `imageSrc` 属性，直接渲染 `<img src={imageSrc} />`。
    *   保持 `framer-motion` 或原生事件实现的拖拽逻辑。

---

## 2. 视觉还原与素材映射 (Visual & Assets Mapping)

请按照以下映射表，将硬编码的 CSS 样式替换为真实的图片素材。

### 2.1 Hero 区域 (Hero.jsx)
*   **纸片素材池**：请创建一个数组，包含 `p1.png` 到 `p10.png` 的 URL，随机分配给 `DraggablePaper` 组件。
    *   URL 模式：`https://da-festival.hr/wp-content/themes/da2025/assets/p{n}.png` (n=1...10)
*   **交互**：保留拖拽功能，确保 `z-index` 正确（点击时置顶）。

### 2.2 板块分割线 (Section Dividers)
在各板块组件的**顶部**引入 `SectionDivider` 组件，并传入对应图片：

| 板块 (Section) | 组件位置 | 图片 URL |
| :--- | :--- | :--- |
| **Lectures** | Top | `https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green.png` |
| **Workshops** | Top | `https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_orange.png` |
| **Schedule** | Top | `https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_top.png` |
| **Footer** | Top | `https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_blue.png` |
| **Footer** | Bottom (装饰) | `https://da-festival.hr/wp-content/themes/da2025/assets/paper_footer_white.png` |

### 2.3 卡片数据源 (Cards Data) - 完整资源列表
请更新 `Lectures.jsx` 和 `Workshops.jsx` 中的数据源，使用以下完整的图片资源列表：

#### **Lectures (讲座)**
| 标题 | 背景图 (bgImage) | 前景图 (fgImage) |
| :--- | :--- | :--- |
| **Organizirano Oblikovanje** | `https://da-festival.hr/wp-content/uploads/2025/03/organiziranoobl.png` | `https://da-festival.hr/wp-content/uploads/2025/03/orgobl-white.png` |
| **Ivan Veljača** | `https://da-festival.hr/wp-content/uploads/2025/03/ivan-veljaca-papirici-1.png` | `https://da-festival.hr/wp-content/uploads/2025/03/ivan-veljaca-white-1.png` |
| **high on type** | `https://da-festival.hr/wp-content/uploads/2025/03/high-on-type-papirici.png` | `https://da-festival.hr/wp-content/uploads/2025/03/high-on-type-white.png` |
| **Matej Merlić & Maja Merlić Ilić** | `https://da-festival.hr/wp-content/uploads/2025/03/modvremena-papiric.png` | `https://da-festival.hr/wp-content/uploads/2025/03/modernavrwhitte.png` |

#### **Workshops (工作坊)**
| 标题 | 背景图 (bgImage) | 前景图 (fgImage) |
| :--- | :--- | :--- |
| **Klasja Habjan** | `https://da-festival.hr/wp-content/uploads/2025/03/klasja-papirici.png` | `https://da-festival.hr/wp-content/uploads/2025/03/klasja-white.png` |
| **Büro Bietenhader Moroder** | `https://da-festival.hr/wp-content/uploads/2025/03/dea-papirici_bg.png` | `https://da-festival.hr/wp-content/uploads/2025/03/dea-white.png` |
| **Appear Offline** | `https://da-festival.hr/wp-content/uploads/2025/03/appear-papirici.png` | `https://da-festival.hr/wp-content/uploads/2025/03/appear-white.png` |
| **Emil Flatz & Luka Perić** | `https://da-festival.hr/wp-content/uploads/2025/03/pf-papiric.png` | `https://da-festival.hr/wp-content/uploads/2025/03/pf-white-2.png` |

### 2.4 页脚赞助商 (Footer Sponsors) - 完整资源列表
在 Footer 底部添加一个 Flex 容器，展示以下所有赞助商 Logo（按顺序）：
1. `https://da-festival.hr/wp-content/uploads/2025/03/l1.svg`
2. `https://da-festival.hr/wp-content/uploads/2025/03/l2.svg`
3. `https://da-festival.hr/wp-content/uploads/2025/03/l3.svg`
4. `https://da-festival.hr/wp-content/uploads/2025/03/l6.svg`
5. `https://da-festival.hr/wp-content/uploads/2025/03/brigada-02.svg`
6. `https://da-festival.hr/wp-content/uploads/2025/03/buro-05.svg`
7. `https://da-festival.hr/wp-content/uploads/2025/03/daz-05.svg`
8. `https://da-festival.hr/wp-content/uploads/2025/03/grad-zagreb-02.svg`
9. `https://da-festival.hr/wp-content/uploads/2025/03/vizkultura-02.svg`
10. `https://da-festival.hr/wp-content/uploads/2025/03/KSPUFF-logo_vektor.svg`
11. `https://da-festival.hr/wp-content/uploads/2025/03/oris-12.svg`
12. `https://da-festival.hr/wp-content/uploads/2025/03/kulturpunkt-01.svg`
13. `https://da-festival.hr/wp-content/uploads/2025/03/uha-03.png`
14. `https://da-festival.hr/wp-content/uploads/2025/03/dar-04.png`
15. `https://da-festival.hr/wp-content/uploads/2025/03/Logo-SZAF-1.png`
16. `https://da-festival.hr/wp-content/uploads/2025/03/aluprotekt-novi.png`
17. `https://da-festival.hr/wp-content/uploads/2025/03/erste-crnovijel.png`

---

## 3. 功能缺失补全 (Missing Features)

### 3.1 顶部导航栏 (Navbar.jsx)
*   **状态**：目前缺失。
*   **要求**：
    *   固定在顶部或随页面滚动显示。
    *   **左侧**：Logo (`https://da-festival.hr/wp-content/themes/da2025/assets/logo.svg`)。
    *   **右侧**：菜单项 [Predavanja, Radionice, Izložba, O nama, Prijavi rad]。
    *   **背景**：使用 instruction.md 中提到的 `.menu-bg` 图片 (`https://da-festival.hr/wp-content/themes/da2025/assets/menu_bg.png`) 作为导航栏背景纹理。

### 3.2 全局点击跳转 (Global Interaction)
*   **规则**：页面中所有可交互元素（Nav Links, Buttons, Cards, Social Icons）都必须添加点击事件。
*   **行为**：`onClick={() => window.open('https://www.example.com', '_blank')}`。
*   **覆盖范围**：
    *   Navbar 上的所有链接。
    *   Hero 区域的 "Pogledaj izložbu" 按钮。
    *   所有 EventCard。
    *   Footer 中的 Email 和社交媒体链接。

---

## 4. 样式细节修正 (CSS Polish)

*   **字体**：确保按照 instruction.md 配置 `tailwind.config.js`，正确引入 `Inter` 或 `Anyone` (如果原站有) 字体，并使用 `clamp()` 处理响应式字号。
*   **纹理背景**：给 `body` 或主容器添加纸张纹理背景 (`paper-white.png`)，避免纯白背景带来的生硬感。
