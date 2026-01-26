附加信息

原网址：

参考网址：http://hifi-pawlak.de

Prompt

请帮我搭建一个网站，要求如下：

  


### 1. 体验定调 (Experience Definition)

  


**核心气质**：这是一个以**感官叙事**与**专业权威感**为核心的高级感官品牌网站。设计围绕 “听觉艺术的视觉化传播” 展开，采用大比例的视频画布与波浪形动态分区，打破了传统电子产品的硬冷工业感，建立了温度与专业度并存的 “音频工作室” 氛围。

  


### 2. 页面结构与流 (Structure & Flow)

  


-   **全屏沉浸式叙事流 (Cinema Scrollytelling)** ：Hero 区域通过大幅背景视频直接切入 “声音体验”，将用户瞬间带入高保真音响的情境中。

-   **动感流线性布局**：页面模块之间使用了 **动态波浪分割线 (Wave Dividers)** ，不仅增强了视觉的节奏感，也隐喻了声波的流动。

-   **多维内容矩阵**：

    -   **Hero 体验区**：品牌内核展示与视频导向。
    -   **交互式服务板块**：采用图标化、分栏式的结构展示 “个人化、定制化、可靠度” 三项核心承诺。
    -   **视频内容区 (Musikmenschen / Fiese Fragen)** ：以专题形式展示品牌故事，增加情感厚度。
    -   **网格产品探索 (Bento-inspired Grid)** ：利用高质感的产品静物摄影构建网格画布，引导探寻。
    -   **沉浸式页脚锚点**：基于地理位置与联系方式的功能区。

  


### 3. 交互与动效编排 (Interaction & Motion Choreography)

  


-   **波浪韵律动效**：模块间的波浪边缘在滚动时伴随轻微的**视差滚动 (Parallax Scrolling)** ，使页面仿佛在用户指尖下有规律地呼吸。

-   **柔性填充揭示**：随着页面向下驱动，文字模块并非突兀出现，而是带有明显的**平滑阻尼感**，配合微妙的透明度增加，呈现出如同声音渐入的效果。

-   **媒介交互反馈**：

    -   **磁吸式按钮**：行动点按钮（如 “Video ansehen”）在光标悬停时产生极具张力的收缩反馈。
    -   **弹出式模态窗口**：Newsletter 订阅窗口采用带有**影院级毛玻璃效果**的蒙层，确保视觉焦点的强制转换但不失高级感。

  


### 4. 视觉识别系统 (Visual Identity)

  


-   **色彩规范**：

    -   **页面核心背景 (`background-color`)** ：深邃黑 (#000000) 与 纯净白 (#FFFFFF) 的强对比切换。
    -   **强调品牌色 (`background-color` & `color`)** ：热力红 (#D23820)，用于核心行动按钮及关键文案标识。
    -   **辅助中性色**：石板灰 (#373737) 用于次要交互元素和页脚文本。

-   **排版识别**：采用具有现代主义特征的 **Futura PT**。标题字体厚重有力，与细长的正文排版（高透气感、大行间距）形成鲜明的层级张力，模拟纸感杂志的阅读节奏。

  


### 5. 页面文案规划 (Content Strategy)

  


-   **Hero 区域**：

    -   **标题 1**：HiFi Pawlak! Ihr High-End HiFi Spezialist in Essen.
    -   **副标题 2**：Das Erlebnis Klang – persönlich, individuell, verlässlich.
    -   **CTA 按钮**：Video ansehen

-   **核心价值板块**：

    -   **Persönlich (个人度)** ：描述品牌作为埃森地区资深专家的经验与热情。
    -   **Individuell (定制化)** ：强调家庭环境匹配与定制系统。
    -   **Verlässlich (可靠度)** ：突显售后服务与持续的技术支持。

-   **品牌视频专题区**：

    -   **标题**：HiFi Pawlak präsentiert Musikmenschen (音乐人专题)
    -   **分集导航**：Folge 1, Folge 2, Folge 3, Folge 4

-   **探索交互区**：

    -   **标题**：Unser Sortiment – Sie wollen Musik pur hören? Ohne Abstriche, ohne Verluste?
    -   **文案**：深入定制的高端品牌介绍（提及 Monitor Audio, Atoll Electronique）。

-   **页脚功能区**：

    -   **地址导航**：Studio Essen Stadtmitte, Schwarze Meer 12, 45127 Essen.
    -   **微文案**：Jetzt anrufen: 0201 2363-88.

  


### 6. 还原指令摘要 (Implementation Priorities)

  


1.  **首要保证**：视频背景的极速加载与无缝循环，不能出现断档。
1.  **核心难点**：波浪分割线的自适应响应表现，确保在不同分辨率下边缘的圆滑连接。
1.  **细节触感**：实现滚动时带有惯性的平滑揭示动效（Scroll-triggered animations）。## 技术栈及要求  
    你必须使用以下指定的技术栈进行开发：  
    核心技术：纯 HTML5、CSS3、原生 JavaScript（ES6+）  
    CSS 框架：Tailwind CSS v3（通过 CDN 使用）  
    组件库：不使用任何前端框架组件库，所有组件需手写实现  
    图标库：使用 Lucide 图标（通过 CDN 使用）  
    构建工具：不允许使用 Webpack、Vite 等构建工具，所有资源通过 CDN 引入

  


## 文件结构要求

  


-   根目录下必须包含 3 个核心文件：index.html、style.css、script.js
-   index.html 作为主入口文件，style.css 为自定义 CSS 样式文件，script.js 为网站所需的 JavaScript 代码文件
-   根目录下可以按需创建 components 目录和 assets 目录
-   components 目录用于管理可复用的 HTML 组件片段（如 header.html, card.html）
-   assets 目录用于管理图片、字体等静态资源

  


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


