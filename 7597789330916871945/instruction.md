请帮我搭建一个网站，要求如下：

  


### **1. 体验定调 (Experience Definition)**

  


**核心气质**：这是一个典型的**极简主义数字机构**站点，强调 “内容即视觉”。整体氛围呈现出一种**瑞士平面设计 (Swiss Design)**  的质感，使用高对比度的排版、克制的色彩以及大量的负空间（留白）来传达专业、透明且高效的品牌特征。设计弱化了复杂的修饰，转而通过结构化的网格感建立信任。

  


* * *

  


### **2. 页面结构与流 (Structure & Flow)**

  


-   **叙事逻辑**：

    -   **开篇引力**：采用 “全屏沉浸式 Hero” 区域，通过巨大的非传统衬线体标题建立第一视觉记忆点。
    -   **价值背书**：通过简洁的文字板块陈述核心业务模型，将复杂的开发工作简化为 “Wonderful Experiences”。
    -   **透明沟通**：利用强烈的视觉对比（钩选与叉号）展示 “Yeses and Nos”，以直白的清单形式构建行业差异化。
    -   **业务转化**：通过深色底色的 “作品矩阵 (Bento Grid)” 建立视觉高峰，最后以极致简约的联系表单收尾。

-   **布局形态**：整体采用中心轴对称与非对称图文混排交替。特别是在 “作品集” 部分，使用了**沉浸式深色容器**，打破了页面的浅色主调，形成了强烈的视觉节奏变化。

  


* * *

  


### **3. 交互与动效编排 (Interaction & Motion Choreography)**

  


-   **进场编排**：建议内容板块采用**逐级上浮感**。即随着滚动，文字标题先于正文 100ms 出现，带有轻微的位移补偿，营造出一种纸张滑动的优雅感。
-   **线性指引**：导航项与下方的 “Next Section Link” 均带有**平滑生长线条 (Line Growth)**  效果，悬停时线条由中心向两端匀速延伸，强化学术性的精准感。
-   **物理反馈**：滚动过程中，背景的网格点阵 (Dot Grid Pattern) 应具备**极轻微的视差位移**，使用户感知到画面的深度。
-   **列表交互**：在 “Our Yeses and Nos” 区域，图标应在进入视口时有一个微小的**弹性缩放 (Spring Bounce)** ，增强正负信息的辨识度。

  


* * *

  


### **4. 视觉识别系统 (Visual Identity)**

  


-   **色彩规范**：

    -   **主背景色 (`background-color`)** ：暖灰白 (#F2EFEC)，提供比纯白更高级的纸张温润感。
    -   **强调色 (`color` / `border-color`)** ：亮天蓝 (#00ABEB)，用于标题下划线和关键动作指引。
    -   **深色背景容器 (`background-color`)** ：深邃黑 (#141414)，用于作品集区域，提升 Logo 的色彩还原度。
    -   **辅助色 (`color`)** ：中灰色 (#666666)，用于长段落文字，降低视觉疲劳。

-   **排版识别**：

    -   **标题系统**：使用大字重的 **Poppins**。针对一级标题，采用叠影艺术处理（蓝色描边底层 + 黑色实体表层），增加空间维度感。
    -   **正文系统**：采用 **Work Sans**，设定较大的字间距与行高（约 1.6 倍），确保在任何屏幕尺寸下都具有杂志级的阅读体验。

  


* * *

  


### **5. 页面文案规划 (Content Strategy)**

  


-   **Hero Section**:

    -   **标题**: Custom Crafted Websites & Innovative Web Applications
    -   **行动点**: Learn More

-   **Services Section**:

    -   **核心标题**: We Create Wonderful Web Experiences
    -   **正文**: [引用自 accessibility.json] "We plan, design, and develop user-friendly and responsive web experiences... optimizing our products for fast loading and search engine indexing."

-   **Approach (Yeses & Nos)** :

    -   **积极项**: Custom Design, Clean Code, Fast And Secure, All Screen Ready.
    -   **否定项**: No Templates, No Plugins, No "Themes", No B.S.

-   **Pricing & Portfolio**:

    -   **定价文案**: 强调动态定价（Dynamic Pricing），透明化起步价 ($5K - $10K+)。
    -   **作品展示**: 涵盖 [viddoo.com](https://viddoo.com/), [translinesinc.com](https://translinesinc.com/), [flytstikr.com](https://flytstikr.com/) 等品牌 Logo。

-   **Contact (微文案)** :

    -   **引导**: Let's get in touch! Please use the form below.
    -   **表单项**: Your Name, Company Name, Phone, Email, Message (Required).

  


* * *

  


### **6. 还原指令摘要 (Implementation Priorities)**

  


1.  **优先级 P0**：还原 Hero 标题的艺术层叠效果，确保在移动端不会产生错位。
1.  **优先级 P1**：确保 #F2EFEC 背景与 #00ABEB 强调色之间的视觉呼吸感。
1.  **优先级 P1**：作品集区域 (Portfolio Grid) 的黑色容器需占据全屏宽度，形成强烈的明暗切割感。
1.  **优先级 P2**：所有带有 `hover-line` 类名的元素需实现响应式的平滑线条生长动效。

  


---## 技术栈及要求  
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

  


js

Copy

```
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

## 图片资源映射 (Image Resources)

为了还原页面，请使用以下图片资源替换对应的元素（假设图片位于 image/ 目录下）：

- **导航栏 Logo** (`.nav-logo`): `image/rlcr-logo-dark.png`
- **Hero 区域 Logo** (`#hero img`): `image/logo.png`
- **Approach 区域 - Yes 图标** (`.yes`): `image/icon-yes.svg`
- **Approach 区域 - No 图标** (`.no`): `image/icon-no.svg`
- **Portfolio 作品集 Logo**:
  - viddoo: `image/viddoo-logo.svg`
  - translines: `image/translines-logo.svg`
  - transmotion: `image/transmotion-logo.svg`
  - flytstikr: `image/flytstikr-logo.svg`
  - laurabuble: `image/rlb-logo.svg`
  - simplex: `image/simplex-logo.svg`


  


-   响应式设计适配屏幕尺寸，使用 clamp () 或视口单位动态调整字号和行高。

-   正文行高建议 1.5-1.6 倍，标题行高 1.2-1.3 倍，字母间距微调提升可读性。

-   关键操作元素（按钮、导航）需强化视觉权重，结合颜色和字体粗细突出层级。

-   Font Awesome 图标与文本风格统一，确保语义和交互意图清晰传达。

-   使用 tailwind.config 配置 Tailwind CSS v3 自定义字体：

    js

    Copy

    ```
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

    css

    Copy

    ```
    #card-col { height: 400px; } /* 祖先元素必须设置高度 */
    #title { height: 36px; padding: 10px; } /* 标题区域 */
    #lineChart { height: calc(100% - 56px); } /* 图表高度计算 */
    ```

      


-   所有图表必须支持 **响应式布局**，在窗口尺寸变化时自动调整。使用下面的代码实现

    js

    Copy

    ```
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