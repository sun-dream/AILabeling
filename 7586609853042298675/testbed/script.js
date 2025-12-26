/*  
 * Ubac 前端主脚本（按功能分区） 
 * 1. 全局：图标初始化、测试图片、商品数据 
 * 2. 导航与子菜单：顶栏公告、Mega Submenu 交互 
 * 3. 商品轮播：Women/Men Tab 切换与左右滚动 
 * 4. Unique 轮播：“What makes ubac unique” 内容滚动 
 * 5. 导航滚动阴影：页面滚动时为导航添加阴影 
 * 6. 进场动画与懒加载：IntersectionObserver & 图片透明度过渡 
 * 7. 移动端菜单：展开/收起导航 
 * 8. 表单提交：Newsletter 简单提交提示 
 */ 
// 初始化Lucide图标 
lucide.createIcons(); 
 
const testImages = { 
  "code": 0, 
  "message": "success", 
   "data": [ 
    { "id": 1, "url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop" }, 
    { "id": 2, "url": "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=600&h=800&fit=crop" }, 
    { "id": 3, "url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=800&fit=crop" }, 
    { "id": 4, "url": "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600&h=800&fit=crop" }, 
    { "id": 5, "url": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=800&fit=crop" }, 
    { "id": 6, "url": "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600&h=800&fit=crop" }, 
    { "id": 7, "url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop" }, 
    { "id": 8, "url": "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600&h=800&fit=crop" }, 
    { "id": 9, "url": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=800&fit=crop" }, 
    { "id": 10, "url": "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=800&fit=crop" } 
  ] 
}; 
 
// 模拟商品数据（分为Women和Men） 
const productData = { 
    women: [ 
        { id: 1, name: 'VOLA VERT-ARCTIC', desc: 'Recycled wool', price: '99.00 €', oldPrice: '129.00 €', img: testImages.data[0].url }, 
        { id: 2, name: 'VOLA PRUNE', desc: 'Recycled wool', price: '99.00 €', oldPrice: '129.00 €', img: testImages.data[1].url }, 
        { id: 3, name: 'TERRA-E OCRE', desc: 'Recycled wool', price: '99.00 €', oldPrice: '139.00 €', img: testImages.data[2].url }, 
        { id: 4, name: 'TERRA-E PRUNE', desc: 'Recycled wool', price: '99.00 €', oldPrice: '139.00 €', img: testImages.data[3].url }, 
        { id: 5, name: 'AXOLO LIN SABLE', desc: 'French Linen', price: '109.00 €', oldPrice: '', img: testImages.data[4].url }, 
    ], 
    men: [ 
        { id: 6, name: 'VOLKAN KNIT BLACK', desc: 'Recycled plastic', price: '119.00 €', oldPrice: '', img: testImages.data[5].url }, 
        { id: 7, name: 'VOLKAN KNIT GREY', desc: 'Recycled plastic', price: '119.00 €', oldPrice: '', img: testImages.data[6].url }, 
        { id: 8, name: 'KOTO KNIT BLUE', desc: 'Tencel & Cotton', price: '109.00 €', oldPrice: '129.00 €', img: testImages.data[7].url }, 
        { id: 9, name: 'AXOLO MESCLAT', desc: 'Recycled wool', price: '99.00 €', oldPrice: '', img: testImages.data[0].url }, 
        { id: 10, name: 'TERRA-H KAKI', desc: 'Recycled wool', price: '109.00 €', oldPrice: '139.00 €', img: testImages.data[1].url }, 
    ] 
}; 
 
(function(){ 
    const notice = document.getElementById('topNotice'); 
    const closeBtn = document.getElementById('topNoticeClose'); 
    const header = document.getElementById('mainHeader'); 
 
    function updateOffsets(){ 
        const noticeHeight = notice && getComputedStyle(notice).display !== 'none' && !notice.classList.contains('hidden') ? notice.offsetHeight : 0; 
        const total = noticeHeight ; 
 
        if (header) header.style.top = noticeHeight + 'px'; 
        document.documentElement.style.scrollPaddingTop = total + 'px'; 
        document.body.style.paddingTop = total + 'px'; 
    } 
 
    function closeNotice(){ 
        if (!notice) return; 
        // 隐藏公告（保留在 DOM 中，便于未来复原或动画） 
        notice.classList.add('hidden'); 
        notice.setAttribute('aria-hidden', 'true'); 
        updateOffsets(); 
    } 
 
    if (closeBtn) { 
        closeBtn.addEventListener('click', closeNotice); 
    } 
 
    window.addEventListener('resize', updateOffsets); 
    document.addEventListener('DOMContentLoaded', updateOffsets); 
    // 保险一次（资源加载后高度可能变化） 
    setTimeout(updateOffsets, 250); 
})(); 
 
// 2. 导航与子菜单：Mega Submenu（模板注入 + 悬停/点击交互） 
(function(){ 
    const nav = document.getElementById('mainNav'); 
    const submenu = document.getElementById('mainSubmenu'); 
    const header = document.getElementById('mainHeader');
    if (!nav || !submenu) return; 

    // 新增：切换 Header 样式（白色/透明 + 文字颜色反转）
    function updateHeaderStyle(isWhite) {
        if (!header) return;
        
        // 1. 切换背景色
        if (isWhite) {
            header.classList.add('bg-white');
            header.classList.remove('backdrop-blur-md');
        } else {
            header.classList.remove('bg-white');
            header.classList.add('backdrop-blur-md');
        }

        // 2. 切换文字/图标颜色
        // 选取 header 内的所有链接，排除掉语言切换按钮（因为它有特定的背景色）
        // 语言切换按钮有 .rounded-full 类，以此区分
        const links = header.querySelectorAll('a:not(.rounded-full)');
        
        links.forEach(link => {
            if (isWhite) {
                // 变黑
                link.classList.remove('text-white', 'hover:text-gray-200');
                link.classList.add('text-gray-700', 'hover:text-primary');
            } else {
                // 变白
                link.classList.remove('text-gray-700', 'hover:text-primary');
                link.classList.add('text-white', 'hover:text-gray-200');
            }
        });
    }

    const TRIGGER_SELECTOR = 'a[data-submenu]'; 
    const CLOSE_DELAY = 150; 
    let closeTimer = null; 
    let openTrigger = null; 
    let currentName = null; 
    const templateCache = {}; 
 
    ['femme','homme','collections'].forEach(name => { 
        const tmpl = document.getElementById('tmpl-' + name); 
        if (tmpl) templateCache[name] = tmpl; 
    }); 
 
    function getRandomTestImageUrl(){ 
        const arr = (testImages && Array.isArray(testImages.data)) ? testImages.data : []; 
        if (arr.length === 0) return ''; 
        const idx = Math.floor(Math.random() * arr.length); 
        return arr[idx].url; 
    } 
 
    function setupSubmenuInteractions(){ 
        // 选择注入后的预览图片（模板中左侧的第一个 img） 
        const previewImg = submenu.querySelector('img'); 
        if (previewImg) { 
            // 保留原始 src 以便需要时恢复 
            if (!previewImg.dataset.originalSrc) previewImg.dataset.originalSrc = previewImg.src || ''; 
        } 
 
        // 移除旧的事件处理（避免重复绑定），然后重新绑定 
        submenu.querySelectorAll('.submenu-item').forEach(li => { 
            li.onmouseenter = null; 
            li.onmouseleave = null; 
 
            li.onmouseenter = () => { 
                const url = getRandomTestImageUrl(); 
                if (!url || !previewImg) return; 
                // 预加载图片，加载完成后切换预览以减少闪烁 
                const tmp = new Image(); 
                tmp.onload = () => { 
                    previewImg.src = url; 
                }; 
                tmp.src = url; 
            }; 
 
            // 可选：离开后恢复默认图（这里恢复为模板原图） 
            li.onmouseleave = () => { 
                if (!previewImg || !previewImg.dataset.originalSrc) return; 
                // 不强制恢复，可按需注释下一行 
                // previewImg.src = previewImg.dataset.originalSrc; 
            }; 
        }); 
    } 
 
    function injectTemplate(name){ 
        const tmpl = templateCache[name]; 
        if (!tmpl) return; 
        // 清空并注入（使用 innerHTML 以移除旧事件，随后重新绑定） 
        submenu.innerHTML = ''; 
        submenu.appendChild(tmpl.content.cloneNode(true)); 
 
        // 绑定注入后交互（进度条是 CSS，这里负责配图切换等 JS 交互） 
        setupSubmenuInteractions(); 
    } 
 
    function open(name, trigger){ 
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; } 
        injectTemplate(name); 
        openTrigger = trigger; 
        currentName = name; 
        // 标记触发元素 aria 
        document.querySelectorAll(TRIGGER_SELECTOR).forEach(a => a.setAttribute('aria-expanded','false')); 
        if (trigger) trigger.setAttribute('aria-expanded','true'); 

        // 切换 Header 样式为白色背景 + 黑色文字
        updateHeaderStyle(true);

        submenu.classList.remove('translate-y-2','opacity-0','invisible'); 
        submenu.classList.add('translate-y-0','opacity-100','visible'); 
        submenu.setAttribute('aria-hidden','false'); 

        // 初始显示一张随机测试图（如果模板里含图） 
        const previewImg = submenu.querySelector('img'); 
        if (previewImg) { 
            const url = getRandomTestImageUrl(); 
            if (url) { 
                const tmp = new Image(); 
                tmp.onload = () => previewImg.src = url; 
                tmp.src = url; 
            } 
        } 
    } 

    function close(){ 
        openTrigger = null; 
        currentName = null; 
        document.querySelectorAll(TRIGGER_SELECTOR).forEach(a => a.setAttribute('aria-expanded','false')); 

        // 恢复 Header 样式为透明背景 + 白色文字
        updateHeaderStyle(false);

        submenu.classList.remove('translate-y-0','opacity-100','visible'); 
        submenu.classList.add('translate-y-2','opacity-0','invisible'); 
        submenu.setAttribute('aria-hidden','true'); 
    } 
 
    // 绑定触发器事件 
    nav.querySelectorAll(TRIGGER_SELECTOR).forEach(a => { 
        const name = a.getAttribute('data-submenu'); 
        if (!name) return; 
 
        a.addEventListener('mouseenter', (e) => { 
            open(name, a); 
        }); 
        a.addEventListener('focusin', () => open(name, a)); 
 
        a.addEventListener('click', (e) => { 
            // 桌面端使用点击切换，移动端允许正常跳转链接 
            const isDesktop = window.matchMedia('(min-width: 768px)').matches; 
            if (isDesktop) { 
                e.preventDefault(); 
                if (openTrigger === a) close(); 
                else open(name, a); 
            } 
        }); 
    }); 
 
    nav.addEventListener('mouseover', (e) => { 
        const a = e.target.closest(TRIGGER_SELECTOR); 
        if (!a) return; 
        const name = a.getAttribute('data-submenu'); 
        if (!name) return; 
        if (name !== currentName) open(name, a); 
    }); 
 
    // 当鼠标进入 submenu 时取消延时关闭；离开则延时关闭 
    submenu.addEventListener('mouseenter', () => { 
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; } 
    }); 
    submenu.addEventListener('mouseleave', () => { 
        if (closeTimer) clearTimeout(closeTimer); 
        closeTimer = setTimeout(close, CLOSE_DELAY); 
    }); 
 
    // nav 整体也监听离开，延时收起 
    nav.addEventListener('mouseleave', () => { 
        if (closeTimer) clearTimeout(closeTimer); 
        closeTimer = setTimeout(close, CLOSE_DELAY); 
    }); 

    // 新增：监听 VISION 及图标等非 submenu 触发器的悬停事件，直接关闭 submenu
    document.querySelectorAll('.nav-close-trigger').forEach(el => {
        el.addEventListener('mouseenter', () => {
             // 立即关闭，或稍微延时关闭以防误触，这里采用立即关闭以符合“划入即隐藏”的要求
             if (closeTimer) clearTimeout(closeTimer);
             close();
        });
    });

    // keyboard: ESC 关闭 
    document.addEventListener('keydown', (e) => { 
        if (e.key === 'Escape') {
            close(); 
            closeCart();
        }
    }); 
})(); 

    // 2.5 购物车抽屉逻辑
(function() {
    // 修改选择器以支持多个触发器（桌面端+移动端）
    const cartTriggers = document.querySelectorAll('#cartTrigger, #cartTrigger2');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartCloseBtn = document.getElementById('cartCloseBtn');

    if (cartTriggers.length === 0 || !cartDrawer || !cartOverlay || !cartCloseBtn) return;

    function openCart() {
        // 打开抽屉：移除 translate-x-full，设置为 translate-x-0
        cartDrawer.classList.remove('translate-x-full');
        cartDrawer.classList.add('translate-x-0');

        // 显示遮罩：设置为 visible, opacity-100
        cartOverlay.classList.remove('invisible', 'opacity-0');
        cartOverlay.classList.add('visible', 'opacity-100');

        // 锁定 body 滚动
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        // 关闭抽屉：恢复 translate-x-full
        cartDrawer.classList.remove('translate-x-0');
        cartDrawer.classList.add('translate-x-full');

        // 隐藏遮罩：恢复 invisible, opacity-0
        cartOverlay.classList.remove('visible', 'opacity-100');
        cartOverlay.classList.add('invisible', 'opacity-0');

        // 恢复 body 滚动
        document.body.style.overflow = '';
    }

    // 绑定事件
    cartTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    });

    cartCloseBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // 暴露给全局以便 ESC 键关闭
    window.closeCart = closeCart;

    // 购物车删除交互：左滑确认
    // 使用事件委托处理（因为商品可能是动态生成的）
    if (cartDrawer) {
        cartDrawer.addEventListener('click', (e) => {
            const trigger = e.target.closest('.btn-delete-trigger');
            const confirmBtn = e.target.closest('.btn-delete-confirm');
            
            // 数量加减
            const minusBtn = e.target.closest('.btn-quantity-minus');
            const plusBtn = e.target.closest('.btn-quantity-plus');

            if (minusBtn) {
                const input = minusBtn.parentElement.querySelector('.input-quantity');
                if (input) {
                    let val = parseInt(input.value) || 1;
                    if (val > 1) {
                        input.value = val - 1;
                    }
                }
            } else if (plusBtn) {
                const input = plusBtn.parentElement.querySelector('.input-quantity');
                if (input) {
                    let val = parseInt(input.value) || 1;
                    input.value = val + 1;
                }
            } else if (trigger) {
                // 点击删除文字 -> 显示确认按钮
                const wrapper = trigger.closest('.relative');
                if (wrapper) {
                    const confirm = wrapper.querySelector('.btn-delete-confirm');
                    if (confirm) {
                        confirm.classList.remove('translate-x-full');
                        confirm.classList.add('translate-x-0');
                    }
                }
            } else if (confirmBtn) {
                // 点击确认按钮 -> 执行删除（此处仅隐藏商品作为演示）
                const itemRow = confirmBtn.closest('.flex-col'); // 找到最外层的 item 容器
                if (itemRow) {
                    // 添加淡出动画
                    itemRow.style.transition = 'opacity 0.3s ease, height 0.3s ease';
                    itemRow.style.opacity = '0';
                    setTimeout(() => {
                        itemRow.remove();
                    }, 300);
                }
            } else {
                // 点击其他区域 -> 隐藏所有已打开的确认按钮
                // 排除点击确认按钮本身的情况（上面已经处理）
                cartDrawer.querySelectorAll('.btn-delete-confirm.translate-x-0').forEach(btn => {
                    // 检查点击是否发生在当前按钮的 wrapper 内，如果是则不关闭（防止误关）
                    // 但实际上点击 wrapper 内除了 trigger 和 confirmBtn 的地方也应该关闭吗？
                    // 简单起见，点击非 trigger 非 confirmBtn 的地方都关闭
                    btn.classList.remove('translate-x-0');
                    btn.classList.add('translate-x-full');
                });
            }
        });
    }
})();

// 2.6 移动端菜单逻辑
(function() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menuDrawer = document.getElementById('mobileMenuDrawer');
    const menuOverlay = document.getElementById('mobileMenuOverlay');
    const menuCloseBtn = document.getElementById('mobileMenuCloseBtn');

    if (!menuBtn || !menuDrawer || !menuOverlay || !menuCloseBtn) return;

    function openMenu() {
        menuDrawer.classList.remove('-translate-x-full');
        menuDrawer.classList.add('translate-x-0');
        menuOverlay.classList.remove('invisible', 'opacity-0');
        menuOverlay.classList.add('visible', 'opacity-100');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuDrawer.classList.remove('translate-x-0');
        menuDrawer.classList.add('-translate-x-full');
        menuOverlay.classList.remove('visible', 'opacity-100');
        menuOverlay.classList.add('invisible', 'opacity-0');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openMenu();
    });

    menuCloseBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
})();

// 3. 商品轮播：Women/Men Tab 切换 + 左右滚动 
document.addEventListener('DOMContentLoaded', function(){ 
    const track = document.getElementById('productTrack'); 
    const tabs = document.querySelectorAll('.tab-btn'); 
    if (!track) return; 
 
    let currentTab = 'women'; 
 
    // 渲染商品卡片 
    function renderProducts(category) { 
        // 确保 productData 存在且有对应分类数据 
        if (!productData || !productData[category]) { 
            console.error('Product data not found for category:', category); 
            return; 
        } 
 
        const items = productData[category]; 
        track.innerHTML = items.map(item => ` 
            <div class="flex-none w-[280px] md:w-[350px] snap-start group cursor-pointer"> 
                <div class="relative overflow-hidden bg-gray-100 mb-4 aspect-[3/4]"> 
                    <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"> 
                </div> 
                <div class="space-y-1"> 
                    <h3 class="font-bold text-lg uppercase">${item.name}</h3> 
                    <p class="text-gray-500 text-sm">${item.desc}</p> 
                    <div class="flex items-center gap-3 mt-2"> 
                        <span class="font-bold">${item.price}</span> 
                        ${item.oldPrice ? `<span class="text-gray-400 line-through text-sm">${item.oldPrice}</span>` : ''} 
                    </div> 
                </div> 
            </div> 
        `).join(''); 
         
        // 重置滚动位置 
        track.scrollTo({ left: 0, behavior: 'smooth' }); 
    } 
 
    // 初始化渲染 
    renderProducts(currentTab); 
 
    // Tab 切换事件 
    tabs.forEach(btn => { 
        btn.addEventListener('click', () => { 
            const tabName = btn.getAttribute('data-tab'); 
            if (!tabName || tabName === currentTab) return; 
 
            // 更新 Tab 样式 
            tabs.forEach(t => { 
                t.classList.remove('border-black', 'text-black'); 
                t.classList.add('border-transparent', 'text-gray-400'); 
            }); 
            btn.classList.remove('border-transparent', 'text-gray-400'); 
            btn.classList.add('border-black', 'text-black'); 
 
            currentTab = tabName; 
             
            // 简单的淡出淡入效果 
            track.style.opacity = '0'; 
            track.style.transition = 'opacity 0.2s ease'; 
             
            setTimeout(() => { 
                renderProducts(currentTab); 
                track.style.opacity = '1'; 
            }, 200); 
        }); 
    }); 
 
    // 轮播控制按钮 
    const prevBtns = [document.getElementById('carouselPrev'), document.getElementById('carouselPrevMobile')]; 
    const nextBtns = [document.getElementById('carouselNext'), document.getElementById('carouselNextMobile')]; 
 
    // 获取滚动距离（基于卡片宽度） 
    function getScrollAmount() { 
        const firstCard = track.firstElementChild; 
        if (firstCard) { 
            const style = window.getComputedStyle(firstCard); 
            const margin = parseFloat(style.marginRight) || 24; // 默认 gap-6 (24px) 
            return firstCard.offsetWidth + margin; 
        } 
        return 350 + 24; // 默认值 
    } 
 
    prevBtns.forEach(btn => { 
        if(btn) btn.addEventListener('click', () => { 
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' }); 
        }); 
    }); 
 
    nextBtns.forEach(btn => { 
        if(btn) btn.addEventListener('click', () => { 
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' }); 
        }); 
    }); 
 
}); 
 
// “What makes ubac unique” 轮播 
// “What makes ubac unique” 轮播（支持桌面与移动端按钮） 
document.addEventListener('DOMContentLoaded', function () { 
    const uniqueTrack = document.getElementById('uniqueTrack'); 
    if (!uniqueTrack) return; 
 
    const uniqueData = [ 
        { 
            badge: 'VOLKAN', 
            title: 'EXTRAGRIP™', 
            desc: 'An ultra-versatile recycled wool sneaker with running-inspired EXTRAGRIP™ sole that lets it take on any terrain.', 
            img: testImages.data[0].url 
        }, 
        { 
            badge: 'RECYCLED WOOL', 
            title: 'R-LENO™', 
            desc: 'Recycled wool is lightweight, comfortable, thermoregulating, water-resistant and future-proof. Discover unsurpassed comfort with our recycled wool models.', 
            img: testImages.data[2].url 
        }, 
        { 
            badge: 'SUGAR CANE', 
            title: 'Green EVA®', 
            desc: 'Discover ultra-lightness with our emblematic VOLA model, featuring a light sugarcane sole for comfort and cushioning.', 
            img: testImages.data[5].url 
        }, 
        { 
            badge: 'RECYCLED COTTON', 
            title: 'Velours mon amour', 
            desc: 'Velours mon amour is a capsule using velvet made from recycled cotton. Available on AXOLO, KOTO and MID KOTO, find it now.', 
            img: testImages.data[7].url 
        }, 
        { 
            badge: 'LINEN', 
            title: 'French Linen', 
            desc: 'AXOLO LIN features breathable French linen for summer-ready comfort, sourced responsibly.', 
            img: testImages.data[4].url 
        }, 
        { 
            badge: 'RECYCLED PLASTIC', 
            title: 'Volkan Knit', 
            desc: 'High-performance knit crafted from recycled plastic, delivering support and flexibility.', 
            img: testImages.data[6].url 
        }, 
        { 
            badge: 'RESPONSIBLE WOOL', 
            title: 'Terra-E', 
            desc: 'Thermoregulating recycled wool keeps your feet comfortable in any season.', 
            img: testImages.data[1].url 
        }, 
        { 
            badge: 'HERITAGE', 
            title: 'Koto Knit', 
            desc: 'Soft yet durable knit construction for everyday wear, inspired by timeless design.', 
            img: testImages.data[3].url 
        } 
    ]; 
 
    function renderUnique() { 
        uniqueTrack.innerHTML = uniqueData.map(item => ` 
            <div class="flex-none w-[300px] md:w-[340px] lg:w-[380px] xl:w-[420px] bg-white border border-gray-200 snap-start"> 
                <div class="relative overflow-hidden aspect-[4/3]"> 
                    <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover"> 
                </div> 
                <div class="p-4"> 
                    <span class="inline-block text-xs font-semibold uppercase border border-gray-900 px-3 py-1 rounded-full mb-3">${item.badge}</span> 
                    <h3 class="text-lg font-bold mb-2">${item.title}</h3> 
                    <p class="text-sm text-gray-600">${item.desc}</p> 
                </div> 
            </div> 
        `).join(''); 
        uniqueTrack.scrollTo({ left: 0 }); 
    } 
 
    renderUnique(); 
 
    // 同时选择桌面与移动端的上一页/下一页按钮 
    const prevBtns = [document.getElementById('uniquePrev'), document.getElementById('uniquePrevMobile')]; 
    const nextBtns = [document.getElementById('uniqueNext'), document.getElementById('uniqueNextMobile')]; 
 
    function getScrollAmountUnique() { 
        const firstCard = uniqueTrack.firstElementChild; 
        if (firstCard) { 
            const style = window.getComputedStyle(firstCard); 
            const margin = parseFloat(style.marginRight) || 24; 
            return firstCard.offsetWidth + margin; 
        } 
        return 320 + 24; 
    } 
 
    prevBtns.forEach(btn => { 
        if (btn) btn.addEventListener('click', () => { 
            uniqueTrack.scrollBy({ left: -getScrollAmountUnique(), behavior: 'smooth' }); 
        }); 
    }); 
    nextBtns.forEach(btn => { 
        if (btn) btn.addEventListener('click', () => { 
            uniqueTrack.scrollBy({ left: getScrollAmountUnique(), behavior: 'smooth' }); 
        }); 
    }); 
}); 
 
// 5. 导航滚动阴影：使用 Tailwind 阴影类 
const header = document.getElementById('mainHeader'); 
window.addEventListener('scroll', () => { 
    if (window.scrollY > 50) { 
        header.classList.add('shadow-sm'); 
    } else { 
        header.classList.remove('shadow-sm'); 
    } 
}); 
 
// 6. 进场动画与懒加载：IntersectionObserver 控制显示 
const observerOptions = { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
}; 
const observer = new IntersectionObserver((entries) => { 
    entries.forEach(entry => { 
        if (entry.isIntersecting) { 
            // 使用 Tailwind 类实现进场动画：去除初始隐藏，添加可见状态 
            entry.target.classList.remove('opacity-0', 'translate-y-8'); 
            entry.target.classList.add('opacity-100', 'translate-y-0'); 
            observer.unobserve(entry.target); 
        } 
    }); 
}, observerOptions); 
// 观察带有 animate-on-scroll 的元素 
document.addEventListener('DOMContentLoaded', () => { 
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el)); 
}); 
 
// 平滑滚动到锚点 
document.querySelectorAll('a[href^="#"]').forEach(anchor => { 
    anchor.addEventListener('click', function (e) { 
        e.preventDefault(); 
        const target = document.querySelector(this.getAttribute('href')); 
        if (target) { 
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            }); 
        } 
    }); 
}); 
 
// 图片懒加载：使用 Tailwind 透明度过渡 
document.addEventListener('DOMContentLoaded', () => { 
    const images = document.querySelectorAll('img[loading="lazy"]'); 
    images.forEach(img => { 
        img.classList.add('opacity-0', 'transition-opacity', 'duration-500'); 
        function reveal() { 
            img.classList.remove('opacity-0'); 
            img.classList.add('opacity-100'); 
        } 
        if (img.complete) reveal(); 
        else img.onload = reveal; 
    }); 
}); 
 
// 添加阻尼滚动效果 
let ticking = false; 
let lastScrollY = window.scrollY; 
 
function updateScroll() { 
    const currentScrollY = window.scrollY; 
    const diff = currentScrollY - lastScrollY; 
    const delta = Math.abs(diff) > 100 ? diff * 0.1 : diff * 0.5; 
     
    // 这里可以添加更复杂的阻尼效果，目前使用简单的实现 
     
    lastScrollY = currentScrollY; 
    ticking = false; 
} 
 
window.addEventListener('scroll', () => { 
    if (!ticking) { 
        requestAnimationFrame(updateScroll); 
        ticking = true; 
    } 
}); 
 
// 为主要块添加滚动进场效果（Tailwind 类） 
document.querySelectorAll('section:not(#productCarouselSection) > div > div').forEach(section => { 
    section.classList.add('animate-on-scroll','opacity-0','translate-y-8','transition-all','duration-700','ease-out'); 
    observer.observe(section); 
}); 
const visionText = document.querySelector('.max-w-3xl'); 
if(visionText) { 
    visionText.classList.add('animate-on-scroll','opacity-0','translate-y-8','transition-all','duration-700','ease-out'); 
    observer.observe(visionText); 
} 
const subContainer = document.querySelector('section.py-24.bg-earth-beige:not(#productCarouselSection) .container'); 
if(subContainer) { 
    subContainer.classList.add('animate-on-scroll','opacity-0','translate-y-8','transition-all','duration-700','ease-out'); 
    observer.observe(subContainer); 
} 
 
// 7. 移动端菜单切换：展开/收起导航 
const menuBtn = document.querySelector('button.md:hidden'); 
if (menuBtn) { 
    menuBtn.addEventListener('click', () => { 
        const nav = document.querySelector('nav.hidden.md:flex'); 
        if (nav) { 
            nav.classList.toggle('hidden'); 
            nav.classList.toggle('flex'); 
            nav.classList.toggle('flex-col'); 
            nav.classList.toggle('absolute'); 
            nav.classList.toggle('top-full'); 
            nav.classList.toggle('left-0'); 
            nav.classList.toggle('right-0'); 
            nav.classList.toggle('bg-white'); 
            nav.classList.toggle('p-4'); 
            nav.classList.toggle('shadow-lg'); 
        } 
    }); 
} 
 
// 8. 表单提交处理：Newsletter 简单提交提示 
const newsletterForm = document.querySelector('form'); 
if (newsletterForm) { 
    newsletterForm.addEventListener('submit', (e) => { 
        // 允许默认提交行为以打开新链接
        const emailInput = newsletterForm.querySelector('input[type="email"]'); 
        if (emailInput.value) { 
            // 这里可以添加实际的订阅逻辑 
            alert('Merci pour votre abonnement !'); 
            // 如果希望保留输入内容以便提交到目标页面，则不清除 value
            // emailInput.value = ''; 
        } 
    }); 
} 