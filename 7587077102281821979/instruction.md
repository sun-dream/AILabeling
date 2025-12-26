附加信息

原网址：

参考网址：http://da-festival.hr

Prompt

请帮我搭建一个网站，要求如下：

  


# DA! Festival 2025：感官叙事与拼贴美学设计评审

  


## 1. 体验定调 (Experience Definition)

  


这是一次以**触感互动**与**新达达主义拼贴**为核心的沉浸式数字艺术节展示。网站不再是一个静止的容器，而是一个**互动的创意工坊画布**。设计极度强调平面艺术的张力，文字与图像并非固定定位，而是作为独立的可移动媒介存在，营造出 “工作进行中” 的动态美感。

  


## 2. 页面结构与流 (Structure & Flow)

  


-   **互动式 Hero 画布**：首页采用非线性排版，巨大的艺术字体标题被一群可交互、可任意拖动放置的 “纸质碎片” 包围。这建立了网站 “学生组织、自由跨界” 的核心基因。
-   **不规则板块过渡**：各功能分区（讲座、工作坊、展览）之间拒绝平直的分割线，而是模仿手工撕纸的边缘质感进行层叠，色彩从高能荧光绿过渡到鲜活橙，视觉节奏急促且富有生命力。
-   **模块化网格 (Bento Grid) 变体**：在内容展示区，使用了不规则的白底 “纸张卡片”，内容在此处恢复了易读性，但依然保持着拼贴画的排版逻辑。

  


## 3. 交互与动效编排 (Interaction & Motion Choreography)

  


-   **物理仿真交互**：Hero 区域的每一个元素都具备物理属性。纸片图标并非装饰，用户可以进行**抓取与抛掷**，伴随轻微的旋转偏移，模拟真实纸张在桌面上的堆叠感。
-   **沉浸式叙事流 (Scrollytelling)** ：随着向下滚动，页面背景的巨大装饰性文字会产生缓动位移，与前景的内容形成**深度视差**。特别是 “PREDAVANJA” 等板块，纸张边缘会随着滚动呈现出动态的撕裂或展开效果。
-   **优雅的引导反馈**：光标悬停在卡片或按钮上时，会触发**磁吸般的吸附感**或模拟纸张划过的阴影变化，这种微交互增强了 “触觉” 体验。

  


## 4. 视觉识别系统 (Visual Identity)

  


-   **色彩情绪**：高饱和度的**荧光绿 (Neon Lime)**  与 **活力橙 (Vivid Orange)**  占据主导，配合大面积的纯白与重黑，形成极高的视觉反差，传达出年轻、叛逆且极具创造力的设计语境。
-   **排版特征**：采用非对称、粗犷风格的字体排版。主标题使用极粗的现代衬线体并带有厚重的立体感，导航与信息正文则使用简洁的无衬线体，确保在视觉狂欢中依然保有清晰的信息层级。

  


## 5. 页面文案规划 (Content Strategy)

  


-   **Hero 核心区**：

    -   主标题：DOĐEŠ ZA 10? (为你展现 10?)
    -   辅助说明：第十届 DA! 艺术、设计与建筑学生节（跨度 04.04. - 18.04.）

-   **内容板块**：

    -   **PREDAVANJA (讲座系列)** ：包含 "ORGANIZIRANO OBLIKOVANJE", "IVAN VELJAČA (场景设计思路)", "HIGH ON TYPE" 等跨界分享。
    -   **RADIONICE (工作坊)** ：列举如 KLASJA HABJAN 的插画叙事、BÜRO BIETENHADER 的建筑实践等互动环节。
    -   **RASPORED (日程编排)** ：按周 (Tjedan I-III) 规划的详细时间轴列表。

-   **底部微文案**：滚动循环的 "10. DA!" 动态条，以及 "POGLEDAJ IZLOŽBU (查看展览)" 等强导向性的召唤行动词。

## 6. 还原指令摘要 (Implementation Priorities)

1.  **优先级 P0**：实现 Hero 区域元素的**自由物理拖拽手感**，确保纸张重叠层级的视觉正确性。
1.  **优先级 P1**：精确还原**撕纸边缘 (Torn Paper Edge)**  的蒙版效果与层叠滚动，这是风格化还原的关键。
1.  **优先级 P2**：处理大基数 DOM 元素下的**平滑滚动视差**，特别是在背景巨型文字与前景内容之间的运动速率差。

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

元素图片替换指引（基于 origin.html 提取的 URL）
站点分享图（社交分享用）：https://da-festival.hr/wp-content/themes/da2025/assets/share.png
站点 Logo：.site-logo 使用 https://da-festival.hr/wp-content/themes/da2025/assets/logo.svg
导航当前项背景：.menu-bg 使用 https://da-festival.hr/wp-content/themes/da2025/assets/menu-bg.webp 或 https://da-festival.hr/wp-content/themes/da2025/assets/menu-bg.png
导航最后一项背景：.menu-bg-last 使用 https://da-festival.hr/wp-content/themes/da2025/assets/menu-bg-last.webp 或 https://da-festival.hr/wp-content/themes/da2025/assets/menu-bg-last.png
菜单分隔背景图：.menu-bg-strip 使用 https://da-festival.hr/wp-content/themes/da2025/assets/menu_bg.webp 或 https://da-festival.hr/wp-content/themes/da2025/assets/menu_bg.png
纸张白色纹理背景：.paper-bg 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper-white.webp 或 https://da-festival.hr/wp-content/themes/da2025/assets/paper-white.png
长纸张白色纹理背景：.paper-long-bg 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper-white-long.webp 或 https://da-festival.hr/wp-content/themes/da2025/assets/paper-white-long.png
纸张横向边缘装饰：.paper-edge 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper-horizontal.png
“查看展览”按钮背景：.prijavi-button 默认使用 https://da-festival.hr/wp-content/themes/da2025/assets/prijavi-button-bg.png，悬停使用 https://da-festival.hr/wp-content/themes/da2025/assets/prijavi-hover.png
绿色顶部撕纸背景：.paper-top-green 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green.png（大屏 2x 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green_2x.png；移动端使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green_mobile.png；webp 对应同名 .webp）
讲座卡片背景与前景（示例四组）：
.card-bg-organizirano 使用 https://da-festival.hr/wp-content/uploads/2025/03/organiziranoobl.png
.card-fg-organizirano 使用 https://da-festival.hr/wp-content/uploads/2025/03/orgobl-white.png
.card-bg-ivan 使用 https://da-festival.hr/wp-content/uploads/2025/03/ivan-veljaca-papirici-1.png
.card-fg-ivan 使用 https://da-festival.hr/wp-content/uploads/2025/03/ivan-veljaca-white-1.png
.card-bg-highontype 使用 https://da-festival.hr/wp-content/uploads/2025/03/high-on-type-papirici.png
.card-fg-highontype 使用 https://da-festival.hr/wp-content/uploads/2025/03/high-on-type-white.png
.card-bg-moderna 使用 https://da-festival.hr/wp-content/uploads/2025/03/modvremena-papiric.png
.card-fg-moderna 使用 https://da-festival.hr/wp-content/uploads/2025/03/modernavrwhitte.png
赞助商 Logo 区域：使用 https://da-festival.hr/wp-content/uploads/2025/03/ 路径下的 .svg/.png（例如 l1.svg、l2.svg、l3.svg、brigada-02.svg、buro-05.svg、daz-05.svg、grad-zagreb-02.svg、vizkultura-02.svg、KSPUFF-logo_vektor.svg、oris-12.svg、kulturpunkt-01.svg、uha-03.png、dar-04.png、Logo-SZAF-1.png、aluprotekt-novi.png、erste-crnovijel.png）
站点图标：favicon 与触控图标分别使用
https://da-festival.hr/wp-content/uploads/2025/04/cropped-web-icon-32x32.png
https://da-festival.hr/wp-content/uploads/2025/04/cropped-web-icon-192x192.png
https://da-festival.hr/wp-content/uploads/2025/04/cropped-web-icon-180x180.png
https://da-festival.hr/wp-content/uploads/2025/04/cropped-web-icon-270x270.png

以上资源请按模块为元素添加清晰的类名进行绑定，优先使用 webp，其次回退到 png。保持素材与源站一致，避免使用占位图库图片。

补充边缘纹理映射（含移动端与 2x 变体）
.paper-bottom-green 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_green.png（2x 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_green_2x.png；webp 对应同名 .webp）
.paper-top-orange 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_orange.png（移动端使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_orange_top_mobile.png；2x 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_orange_2x.png；webp 对应同名 .webp）
.paper-bottom-orange 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_orange.png（移动端使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_orange_mobile.png；2x 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_orange_2x.png；webp 对应同名 .webp）
.paper-top-yellow 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_top.png（2x 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_top_2x.png；webp 对应同名 .webp）
.paper-bottom-yellow 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_bottom.png（移动端使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_bottom_mobile.png；2x 使用 https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_bottom_2x.png；webp 对应同名 .webp）
.menu-bg-strip 使用 https://da-festival.hr/wp-content/themes/da2025/assets/menu_bg.png（2x 使用 https://da-festival.hr/wp-content/themes/da2025/assets/menu_bg_2x.png；webp 对应同名 .webp）
