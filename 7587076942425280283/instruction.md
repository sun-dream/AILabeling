### **1. 体验定调 (Experience Definition)**

  


**核心气质**：这是一个融合了**极简审美**与**生态叙事感**的高端电商设计。页面整体以 “可持续时尚” 为灵魂，通过大量留白、自然的低饱和度色彩以及优雅的平滑交互，构建出一种既具感官张力又充满信任感的品牌氛围。视觉优先级极高，文字仅作为品牌哲学的点缀和功能导向。

  


### **2. 还原指令摘要 (Implementation Priorities)**

1.  **首要任务**：建立全局的**平滑阻尼滚动系统**，这是支撑 “高级感” 的物理基础。
1.  **视觉重点**：严格实现**非对称板块间的背景色无感过渡**，确保视觉流动的连贯性。
1.  **精细化交互**：为产品卡片和行动指南按钮（CTA）添加**感知度极高的悬停微动效**。
1.  **内容逻辑**：确保多级导航菜单（Mega Menu）在展开时带有动画效果，增强视觉引导。


## 技术栈及要求  
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

