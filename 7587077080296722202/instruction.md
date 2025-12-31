原网址：参考网址：https://wonder-theme-fashion.myshopify.com/

请帮我搭建一个网站，要求如下：
1. 体验定调 (Experience Definition)
核心气质：这是一个以高级时尚叙事为核心的沉浸式电商平台。设计不再仅仅是商品的罗列，而是一场光影与材质的视觉巡演。整体风格呈现出一种极简主义的奢华感，通过大面积的留白、比例夸张的摄影构图以及极具节奏感的平滑动效，将购物行为转化为一种观看时尚大片的审美体验。
2. 页面结构与流 (Structure & Flow)
影院级 Hero 揭示流：页面头部采用全屏沉浸式意境大图，文案浮动于画面中央，确立整个品牌的优雅基调。
非对称网格叙事区：商品展示不再遵循单调的对齐，而是采用错落有致的时尚杂志排版布局，通过图片大小的变化引导用户视觉重心的移动。
多维产品交互模块：利用 “分层揭示” 逻辑，将产品细节、品牌故事与动态视频交织在一起，形成一种穿插式的阅读体验。
流体品牌背书区：页尾部分通过极简的品牌矩阵和深邃的单色沉浸块结束叙事，确保品牌调性的高度一致性。
3. 交互与动效编排 (Interaction & Motion Choreography)
滚动诱导的视差揭示 (Parallax Reveal)：随着用户向下滚动，图片元素并不只是机械位移，而是带有平滑的缩放进入感。背景与前景以不同的速率轻微偏移，营造出物理快门般的呼吸感。
磁吸微反馈 (Magnetic Interaction)：光标在靠近交互按钮或商品缩略图时，元素会表现出微妙的磁吸牵引效果，配合柔和的阴影扩散，赋予界面极高的响应品质。
优雅的层级过渡：侧边导航菜单的弹出采用了一种流体揭示动效，内容仿佛从屏幕一侧 “生长” 出来，而非生硬的覆盖。
惯性滚动阻尼：整个页面的滚动过程被赋予了类似物理实体的阻尼手感，确保在视觉信息量巨大的情况下，用户的浏览体验依然保持丝滑与可控。
4. 视觉识别系统 (Visual Identity)
色彩感知：采用中性极简色谱。主基调为纯净灰、石墨黑与象牙白，这种极低饱和度的底色旨在最大限度地烘托服装本身的质感与色彩。
排版节奏：大胆使用全大写衬线体与高辨识度无衬线体的混搭。标题具有强烈的视觉张力，而正文则保持疏朗的字间距，确保在小屏幕上也能维持 “呼吸感”。
5. 页面文案规划 (Content Strategy)
Hero Section
主标题：REDEFINE YOUR ELEGANCE
副标题：探索本季最具张力的剪裁与设计。
CTA：浏览连衣裙 | 浏览配饰
Bestseller Module
标题：OUR BESTSELLER
内容：精选系列，演绎永恒经典。
Campaign Section
标题：CAMPAIGN STYLES
风格分类：Savanna Chic, Midnight Luxe, Champagne Whisper, Urban Muse.
Promotion Zone
主标：SALE UP TO 50% FOR ALL COLLECTIONS
微文案：Discover the best deal.
Footer Group
公告条：Black Friday Sale - 限时七折优惠。
订阅区：加入我们的私享名单。
6. 还原指令摘要 (Implementation Priorities)
首位优先级：实现全站式的视差滚动揭示逻辑，确保图片进入视口时具备平滑的缩放快门感。
布局形态：严格执行Bento Grid (便当盒) 非对称网格，通过间距的亲密性原则区分不同系列。
手感控制：为页面注入滚动阻尼微调，消除原生滚动的生硬感。
响应式韵律：确保在不同终端下，图片的长宽比与文字的层级对比度始终保持杂志级的质感。## 技术栈及要求
你必须使用以下指定的技术栈进行开发：
核心技术：纯 HTML5、CSS3、原生 JavaScript（ES6+）
CSS 框架：Tailwind CSS v3（通过 CDN 使用）
组件库：不使用任何前端框架组件库，所有组件需手写实现
图标库：使用 Lucide 图标（通过 CDN 使用）
构建工具：不允许使用 Webpack、Vite 等构建工具，所有资源通过 CDN 引入
文件结构要求
根目录下必须包含 3 个核心文件：index.html、style.css、script.js
index.html 作为主入口文件，style.css 为自定义 CSS 样式文件，script.js 为网站所需的 JavaScript 代码文件
根目录下可以按需创建 components 目录和 assets 目录
components 目录用于管理可复用的 HTML 组件片段（如 header.html, card.html）
assets 目录用于管理图片、字体等静态资源
颜色配置相关
遵循 WCAG 对比度标准，文本与背景需满足 AA 级及以上可访问性要求。
使用 tailwind.config 配置 Tailwind CSS v3 自定义颜色 (参考下面的代码)：
js
Copy
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
排版要求
根据用户要求和平台类型，设计合适的排版方案，建立明确的字体层次结构（标题 > 正文 > 辅助文字），通过字号、字重和颜色区分。
响应式设计适配屏幕尺寸，使用 clamp () 或视口单位动态调整字号和行高。
正文行高建议 1.5-1.6 倍，标题行高 1.2-1.3 倍，字母间距微调提升可读性。
关键操作元素（按钮、导航）需强化视觉权重，结合颜色和字体粗细突出层级。
Font Awesome 图标与文本风格统一，确保语义和交互意图清晰传达。
使用 tailwind.config 配置 Tailwind CSS v3 自定义字体：
js
Copy
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

配置后可以使用 font-inter。
使用 text-[clamp (1.5rem,3vw,2.5rem)] 设置字体大小，注意类名中不能有空格。
图表绘制要求
图表绘制统一采用 echarts，图表选择上请多加思考，合理选择，减少复杂图表使用，确保选用最契合场景的形式，避免滥用。
绘制时需确保 图表容器大小受父元素约束，避免图表溢出。容器尺寸计算应准确，例如：
css
Copy
#card-col { height: 400px; } /* 祖先元素必须设置高度 */
#title { height: 36px; padding: 10px; } /* 标题区域 */
#lineChart { height: calc(100% - 56px); } /* 图表高度计算 */

所有图表必须支持 响应式布局，在窗口尺寸变化时自动调整。使用下面的代码实现
js
Copy
window.addEventListener('resize', () => {
  chart.resize();
});

特殊图表（如饼图、仪表盘）需保证 祖先元素宽高比接近 1:1，以避免留白过多。legend 等属性需合理设置，确保整体排版均衡、美观。
一定要避免图表不能出现的问题，图表无法渲染可能包括：
绘制地图报错 regions undefined，解决办法：代码中减少 geo 的配置，地图存在不稳定性，会造成阻塞
高度未配置等问题：其解决办法：在用计算属性 calc 的时候，要保证祖先元素有高度设置
echarts 元素或者祖先元素先隐藏，后面在显示导致无法渲染，解决方法：当图表需要显示的时候，在调用图表的 chart.resize () 方法保证图表渲染
外部资源提供（可选）
Tailwind CSS v3：<script src="https://cdn.tailwindcss.com"></script>
Lucide：<script src="https://unpkg.com/lucide@latest"></script>
Echarts.js：<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
不能修改 URL。
可以引入并使用其他资源，但不要引入未使用的资源。
总体规划
集成 Tailwind CSS v3 框架并配置基础颜色方案和排版样式。
添加 lucide 图标库用于导航和交互元素。
使用 Tailwind CSS v3 布局工具创建响应式网格、弹性布局系统。
应用分层视觉设计原则，通过阴影、渐变、z-index 创建深度感。
添加 CSS 过渡和动画效果实现微交互和状态变化。
开发响应式布局，使用断点适配多设备屏幕。
集成数据可视化元素（图表、进度条、指标卡），图表不要设置 maintainAspectRatio 属性。
详细注意事项
页面中的图表应该以合适的尺寸呈现，避免出现过大的图表
需要保证 页面各项功能的完备性，不能缺少用户能看到的未实现的功能
不要使用 emoji！在你的思考、正文、代码等任何地方，都不要使用 emoji。