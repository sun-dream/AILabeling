请帮我搭建一个网站，要求如下：

## **1. 体验定调 (Experience Definition)**
**核心气质**：这是一个以**叙事性视觉 (Visual Storytelling)**  为灵魂的创意机构展示空间。设计风格游走于**极简现代性**与**几何超现实派**之间。它不只是在展示信息，而是在通过大面积的色块呼吸、不规则的构图张力以及高度动态的图形语言，构建一个 “品牌剧场”。高对比度的色彩体系与低文本密度的排版，明确传达了 “视觉创意先行” 的设计意图。
* * *

**2. 页面结构与流 (Structure & Flow)**
-   **叙事逻辑**：
    -   **序幕 (The Canvas Entrance)** ：全屏纯净的呼吸感 Hero 区域，建立品牌第一印象。
    -   **品牌叙事带 (Graphic Chapters)** ：通过巨大的几何图形（如太阳状圆球）波动，作为内容板块的自然隔断。
    -   **项目矩阵 (Bento & Masonry Hybrid)** ：非平衡的网格布局，展示代表性案例，打破传统的线性审美。
    -   **地理坐标与尾声 (Contextual Footer)** ：将地理信息与品牌使命融合成极具张力的几何色块区域。

-   **布局形态**：

    -   **全屏沉浸式模块**：每个主要案例拥有独立的视觉重心，利用边缘留白创造 “框景” 感。
    -   **非对称 Bento Grid**：案例展示区采用不规则切分，增强页面的节奏感与探索欲。
* * *
**3. 交互与动效编排 (Interaction & Motion Choreography)**

-   **进场编排 (The Reveal)** ：内容采用**异步位移揭示**。当用户滚动时，巨大的圆形几何体以不同的速率从屏幕边缘切入，产生一种如同天体运行般的宏大轨迹感。

-   **惯性叙事流 (Scrollytelling)** ：整个滚动过程带有明显的**阻尼物理感**，内容不是生硬地跳出，而是随着滚轮深度进行丝滑的缩放与平移平衡。

-   **交互感知**：

    -   **磁吸微交互**：导航与行动点在光标靠近时产生轻微的感官吸引。
    -   **视觉路径引导**：当背景色块发生激烈转换（如从暖黄切入薄荷绿）时，文本内容通过柔和的淡入淡出进行视觉重心的平稳交接。
* * *
**4. 视觉识别系统 (Visual Identity)**

-   **色彩系统**：
    -   **警示色系**：大胆使用饱和度极高的琥珀橘、深邃红与科技蓝，用于象征创意能量。
    -   **呼吸底色**：大面积的温暖灰白或极浅薄荷绿作为过渡，防止视觉疲劳。

-   **排版节奏**：

    -   标题文字采用加粗的**经典衬线体**，象征品牌的叙事底蕴与专业度；配套正文则使用**极简无衬线体**，确保在复杂动效下的阅读清晰度。
* * *

**5. 页面文案规划 (Content Strategy)**

-   **1. Hero 区域**

    -   品牌核心：Balzac – Racconti di marca
    -   定位语：品牌故事的讲述者，从初创到全域。

-   **2. 重要案例区 (Aixam Mega)**

    -   主标题：Aixam Mega
    -   品牌语：Your style, everywhere. / Since 1983 the future of minicars.
    -   交互入口：[欣赏作品]

-   **3. 企业社会责任区 (Vol.To)**

    -   主标题：Vol.To Volontariato Torino ETS
    -   文案：数字背后的故事，关于人，关于城市。

-   **4. 科技与创新 (NanoFabNet / Zeca)**

    -   NanoFabNet：纳米技术的宏大枢纽。
    -   Zeca：于微茫处启发无限灵感。

-   **5. 联系信息 (Footer Context)**

    -   总部：Balzac s.r.l. Via Valfrè 14, 10121 Torino.
    -   微文案：位于都灵中心，皮埃特罗・米卡要塞后方。跟随导航，或者 [Google Maps] 更简单。

  


* * *

  


**6. 还原指令摘要 (Implementation Priorities)**
1.  **高精度滚动阻尼**：确保层与层之间的视差偏移符合物理逻辑。
2.  **几何图形流体化**：圆形色块的进场需具备无缝的弹性缓动感。
3.  **非对称响应式**：在不同尺寸屏幕下，确保色块的切割感与文字的边缘对齐依然保持艺术张力。
* * *
## 技术栈及要求
你必须使用以下指定的技术栈进行开发：  
前端框架： React  
语言：JavaScript 或 TypeScript，任选其中之一  
css 框架：Tailwind CSS v3  
组件库：shadcn  
图标库：lucide

  


## 颜色配置相关

  


-   遵循 WCAG 对比度标准，文本与背景需满足 AA 级及以上可访问性要求。

-   使用 tailwind.config 配置 Tailwind CSS v3 自定义颜色 (参考下面的代码)：
```js
    <script>
    tailwind.config = {
    theme: {
    extend: {
        colors: {
        primary: '#165DFF',
        },
    },
    }
    }
    </script>
```

      


  


## 排版要求

  


根据用户要求和平台类型，设计合适的排版方案，建立明确的字体层次结构（标题 > 正文 > 辅助文字），通过字号、字重和颜色区分。

  


-   响应式设计适配屏幕尺寸，使用 clamp () 或视口单位动态调整字号和行高。

-   正文行高建议 1.5-1.6 倍，标题行高 1.2-1.3 倍，字母间距微调提升可读性。

-   关键操作元素（按钮、导航）需强化视觉权重，结合颜色和字体粗细突出层级。

-   Font Awesome 图标与文本风格统一，确保语义和交互意图清晰传达。

-   使用 tailwind.config 配置 Tailwind CSS v3 自定义字体：

    ```js
    <script>
    tailwind.config = {
        theme: {
        extend: {
            fontFamily: {
            inter: ['Inter', 'sans-serif'],
            },
        },
        }
    }
    </script>
    ```

      
    配置后可以使用 font-inter。

-   使用 text-[clamp (1.5rem,3vw,2.5rem)] 设置字体大小，注意类名中不能有空格。

  


## 图表绘制要求

  


-   图表绘制统一采用 echarts，图表选择上请多加思考，合理选择，减少复杂图表使用，确保选用最契合场景的形式，避免滥用。

-   绘制时需确保 **图表容器大小受父元素约束**，避免图表溢出。容器尺寸计算应准确，例如：

    ```css
    #card-col { height: 400px; } /* 祖先元素必须设置高度 */
    #title { height: 36px; padding: 10px; } /* 标题区域 */
    #lineChart { height: calc(100% - 56px); } /* 图表高度计算 */
    ```

      


-   所有图表必须支持 **响应式布局**，在窗口尺寸变化时自动调整。使用下面的代码实现

    


    ```js
    window.addEventListener('resize', () => {
      chart.resize();
    });
    ```

      


-   特殊图表（如饼图、仪表盘）需保证 **祖先元素宽高比接近 1:1**，以避免留白过多。`legend` 等属性需合理设置，确保整体排版均衡、美观。

-   一定要避免图表不能出现的问题，图表无法渲染可能包括：

    -   绘制地图报错 regions undefined，解决办法：代码中减少 geo 的配置，地图存在不稳定性，会造成阻塞
    -   高度未配置等问题：其解决办法：在用计算属性 calc 的时候，要保证祖先元素有高度设置
    -   echarts 元素或者祖先元素先隐藏，后面在显示导致无法渲染，解决方法：当图表需要显示的时候，在调用图表的 chart.resize () 方法保证图表渲染

  


## 外部资源提供（可选）

  


-   Tailwind CSS v3：<script src="https://cdn.tailwindcss.com"></script>
-   Lucide：<script src="https://unpkg.com/lucide@latest"></script>
-   Echarts.js：<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
-   不能修改 URL。
-   可以引入并使用其他资源，但不要引入未使用的资源。

  


## 总体规划

  


1.  集成 Tailwind CSS v3 框架并配置基础颜色方案和排版样式。
1.  添加 lucide 图标库用于导航和交互元素。
1.  使用 Tailwind CSS v3 布局工具创建响应式网格、弹性布局系统。
1.  应用分层视觉设计原则，通过阴影、渐变、z-index 创建深度感。
1.  添加 CSS 过渡和动画效果实现微交互和状态变化。
1.  开发响应式布局，使用断点适配多设备屏幕。
1.  集成数据可视化元素（图表、进度条、指标卡），图表不要设置 maintainAspectRatio 属性。

  


## 详细注意事项

  


-   页面中的图表应该以合适的尺寸呈现，避免出现过大的图表
-   需要保证 页面各项功能的完备性，不能缺少用户能看到的未实现的功能
-   不要使用 emoji！在你的思考、正文、代码等任何地方，都不要使用 emoji。

图片资源映射（首页）

为确保复刻页面的图片元素完整，请按以下类名将图片替换为指定链接：

.navbar-logo 应该使用的图片是： https://balzac.it/wp-content/uploads/2021/10/Logo-tondo.png
.hero-bg-texture 应该使用的图片是： https://balzac.it/wp-content/uploads/2021/10/Texture.png
.hero-sun-orange 应该使用的图片是： https://balzac.it/wp-content/uploads/2021/10/Sole-Arancio.png
.hero-sun-yellow 应该使用的图片是： https://balzac.it/wp-content/uploads/2021/10/Sole-Giallo.png
.hero-group-image-desktop 应该使用的图片是： https://balzac.it/wp-content/uploads/2021/10/gruppo.jpg
.hero-group-image-mobile 应该使用的图片是： https://balzac.it/wp-content/uploads/2021/10/gruppo-Mobile.jpg
.award-badge-top10 应该使用的图片是： https://balzac.it/wp-content/uploads/2022/01/Badge-Top-10.jpg
.award-badge-bar 应该使用的图片是： https://balzac.it/wp-content/uploads/2022/01/Badge.jpg
.case-campagna-2025 应该使用的图片是： https://balzac.it/wp-content/uploads/2025/09/feature_campagna_2025_01.webp
.case-aixam-bg 应该使用的图片是： https://balzac.it/wp-content/uploads/2024/07/Aixam-Step-Hero.jpg
.case-volto-bg 应该使用的图片是： https://balzac.it/wp-content/uploads/2024/07/Film-VolTo-Hero.webp
.case-nanofabnet-bg 应该使用的图片是： https://balzac.it/wp-content/uploads/2022/12/Fondo-NanoFabNet.jpg
.case-ledalux-bg 应该使用的图片是： https://balzac.it/wp-content/uploads/2022/01/Ledalux-01.jpg
.site-favicon 应该使用的图片是： https://balzac.it/wp-content/uploads/2022/01/Baffo-ico.png
