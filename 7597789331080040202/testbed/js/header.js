    // Mega Menu 数据
    const servicesData = [
        {
            id: 'renovations',
            title: 'Renovations & Remodeling',
            icon: 'hammer',
            description: 'Refresh your interiors for a new look',
            items: [
                { icon: 'home', title: 'Home Renovation NYC', desc: 'Three decades of experience in providing complete house renovation', link: '#' },
                { icon: 'layers', title: 'NYC Basement Remodeling', desc: 'Converting basements into livable spaces like home theaters, gyms, guest suites, or rental units.', link: '#' },
                { icon: 'utensils', title: 'Kitchen Remodeling NYC', desc: 'Identification and repair of leaks in walls, ceilings, and plumbing systems.', link: '#' },
                { icon: 'align-justify', title: 'Vinyl Flooring', desc: 'Discover the Unparalleled Beauty and Durability of Vinyl Flooring in New York.', link: '#' },
                { icon: 'hammer', title: 'Gut Renovation', desc: 'Experience the Zicklin Difference in Manhattan, Brooklyn & Queens', link: '#' },
                { icon: 'droplets', title: 'NYC Bathroom Remodeling', desc: 'Basement, roof, and exterior waterproofing solutions with lifetime warranties.', link: '#' },
                { icon: 'bed', title: 'Bedroom Remodeling', desc: 'Create Your Perfect Sanctuary in the City That Never Sleeps with Zicklin Contracting.', link: '#' },
                { icon: 'sofa', title: 'Living Room Remodeling', desc: 'Enhance the space by updating design elements like flooring, furniture, and lighting.', link: '#' },
                { icon: 'sun', title: 'Exterior Renovation NYC', desc: 'Professional exterior renovations add beauty & value to your home through services that include siding, window installation, & landscaping.', link: '#' },
                { icon: 'brick-wall', title: 'Masonry NYC', desc: 'Professional masonry work in brick, stucco, concrete, and stone raises the value and beauty of Properties.', link: '#' },
                { icon: 'layout-grid', title: 'Pavers NYC', desc: 'Paver installation in driveways, walkways, patios, and pools gives you professional finishes that add aesthetic appeal.', link: '#' }
            ]
        },
        {
            id: 'roofing',
            title: 'Roofing & Structural Services',
            icon: 'umbrella',
            description: 'Protect and repair with confidence',
            items: [
                { icon: 'shield', title: 'Roofing', desc: 'Installation, repair, and maintenance of roofs. Specialize in energy-efficient, metal, and solar roofing options.', link: '#' },
                { icon: 'plus-square', title: 'New Roof NYC', desc: 'We provide new roof installations with high-quality materials and attention to detail for long-lasting results.', link: '#' },
                { icon: 'wrench', title: 'Roof Repairs NYC', desc: 'Expert repair services to address leaks, structural issues, and other roof-related problems.', link: '#' },
                { icon: 'layout', title: 'Premier Flat Roof Solutions', desc: 'Get durable, energy-efficient flat roofing solutions with expert services across NYC.', link: '#' },
                { icon: 'clipboard-check', title: 'Roof Evaluation NYC', desc: 'Comprehensive assessment of your roof’s condition to identify necessary repairs or maintenance.', link: '#' },
                { icon: 'sun', title: 'Skylight Roofing NYC', desc: 'Installation and repair of skylights to enhance natural light and ventilation.', link: '#' },
                { icon: 'tool', title: 'Roof Structural Maintenance', desc: 'Ongoing maintenance to ensure the structural integrity of your roof over time.', link: '#' },
                { icon: 'building', title: 'Expert Structural Repairs', desc: 'Expert structural repairs for beams, foundations, and floors in NYC.', link: '#' }
            ]
        },
        {
            id: 'repairs',
            title: 'Repairs & Fixes',
            icon: 'wrench',
            description: 'Ensure full compliance with ease',
            items: [
                { icon: 'footprints', title: 'Sidewalk Violation', desc: 'Address and correct DOT-mandated sidewalk repairs. Ensure compliance and avoid fines.', link: '#' },
                { icon: 'wrench', title: 'Roof Repairs NYC', desc: 'Repair roof damage and improve its performance with expert solutions.', link: '#' },
                { icon: 'search', title: 'Leak Detection', desc: 'Use advanced thermal imaging technology to detect leaks in walls, ceilings, and plumbing systems.', link: '#' },
                { icon: 'droplets', title: 'NYC Waterproofing', desc: 'Basement, roof, and exterior waterproofing solutions with lifetime warranties.', link: '#' },
                { icon: 'building', title: 'Structural Repairs', desc: 'Repair structural issues to ensure the safety and stability of your property.', link: '#' },
                { icon: 'file-text', title: 'Sidewalk Repair Process NYC', desc: 'Get NYC Sidewalk Repairs Done Right', link: '#' }
            ]
        },
        {
            id: 'safety',
            title: 'Safety & Compliance Services',
            icon: 'shield-check',
            description: 'Ensure full compliance with ease',
            items: [
                { icon: 'file-text', title: 'Local Law Compliance', desc: 'Make sure your building is compliant with the Local Law 10/11 through our inspection process.', link: '#' },
                { icon: 'zap', title: 'Energy Code Compliance', desc: 'Navigate complex NYSECCC requirements with confidence and deliver exceptional energy-efficient construction projects', link: '#' },
                { icon: 'file-check', title: 'Permit and Documentation Services', desc: 'Manage all necessary permits and legal documentation. Ensure smooth project progression with legal approval from the start.', link: '#' },
                { icon: 'file-check', title: 'Local Law 152', desc: 'Zicklin Contracting specializes in ensuring that your building complies with all Local Law 152 (LL152) standards.', link: '#' },
                { icon: 'alert-triangle', title: 'Expert Help for NYC DEP Violations', desc: 'ZickLin Contracting facilitates quick resolution of DEP violations in New York City.', link: '#' },
                { icon: 'hammer', title: 'Professional Alterations and Demolitions', desc: 'Zicklin Contracting offers expert NYC demolition and alteration services, focusing on safety, quality, and efficiency.', link: '#' },
                { icon: 'hard-hat', title: 'Experienced Demolition Contractors', desc: 'Zicklin Contracting handles NYC demolition permits, ensuring compliance with regulations and efficiency.', link: '#' },
                { icon: 'alert-circle', title: 'Sidewalk Repair Violations NYC', desc: 'Manage and correct curb violations.Compliance with city regulations to prevent penalties.', link: '#' },
                { icon: 'x-circle', title: 'DOB Violation Removal', desc: 'Removal of Department of Buildings (DOB) violations and Other Municipal Violations. Navigate the process to bring properties into compliance.', link: '#' },
                { icon: 'eye', title: 'Annual Parapet Wall Inspections', desc: 'Keep your building safe and compliant with professional parapet inspections.', link: '#' },
                { icon: 'search', title: 'Comprehensive Facade Inspection Services', desc: 'Ensure compliance with Local Law 11 NYC. Expert facade inspections, SWARMP solutions, and repairs for safe and compliant buildings', link: '#' },
                { icon: 'gavel', title: 'Expert ECB Violation Hearing Services', desc: 'Zicklin Contracting helps resolve NYC ECB violations, offering legal solutions and compliance support.', link: '#' },
                { icon: 'badge-check', title: 'NYC Licensed Contractors', desc: 'Zicklin Contracting assists with obtaining NYC general contractor licenses, ensuring full legal compliance.', link: '#' }
            ]
        },
        {
            id: 'damage',
            title: 'Damage Restoration & Claims',
            icon: 'flame',
            description: 'Expert restoration and claims assistance',
            items: [
                { icon: 'droplets', title: 'Water Damage Claims', desc: 'Assistance with filing and managing insurance claims for water damage. Provide full support from assessment to restoration.', link: '#' },
                { icon: 'waves', title: 'Water Damage Restoration NYC', desc: 'Comprehensive water damage restoration services to mitigate damage and prevent future issues.', link: '#' },
                { icon: 'flame', title: 'Fire Damage Claims', desc: 'Manage insurance claims for fire damage. Handle everything from initial damage assessment to completing the necessary repairs.', link: '#' },
                { icon: 'pipette', title: 'Pipe Burst Claims', desc: 'When tragedy strikes with a burst pipe in New York City, Zicklin Contracting is your professional claims assistance and restoration company of choice.', link: '#' },
                { icon: 'wind', title: 'Mold Remediation Claims', desc: 'Assistance with insurance claims related to mold issues. Provide end-to-end services from detection and remediation to insurance negotiation.', link: '#' },
                { icon: 'file-text', title: 'Insurance Claim Assistance', desc: 'Professional assistance in managing insurance claims for damage restoration, ensuring you receive the maximum compensation for necessary repairs.', link: '#' },
                { icon: 'umbrella', title: 'Flood Mitigation Claims', desc: 'We bring decades of expertise and innovative technologies to provide efficient, timely flood mitigation services.', link: '#' },
                { icon: 'zap', title: 'Electrical Fire Claims', desc: 'Expert guidance for electrical fire claims in New York City, helping you rebuild and recover.', link: '#' },
                { icon: 'trash-2', title: 'Sewer Backup Claims', desc: 'When disaster strikes with sewer backup in New York, Zicklin Contracting stands ready to help.', link: '#' }
            ]
        },
        {
            id: 'contact',
            title: 'Contact Us',
            icon: 'phone',
            description: 'Feel free to reach out with any questions',
            items: [
                { icon: 'mail', title: 'General Inquiry', desc: 'Have a question? Send us a message.', link: '#contact-text-form' },
                { icon: 'file-text', title: 'Get a Quote', desc: 'Request a free estimate for your project.', link: '#contact-text-form' },
                { icon: 'phone-call', title: 'Emergency Service', desc: '24/7 emergency response available.', link: 'tel:+1-347-495-4959' }
            ]
        }
    ];
    // Mega Menu 交互逻辑
    function initMegaMenu() {
        const container = document.getElementById('mega-menu-container');
        if (!container) return;
        // 渲染 Mega Menu 内容
        renderMegaMenu(container);
        // 渲染完成后，移除 display: none，允许 CSS 控制显隐
        // 使用 setTimeout 确保渲染帧已更新，防止 FOUC
        setTimeout(() => (container.classList.remove('hidden')), 100);
        const triggers = container.querySelectorAll('.mega-menu-trigger');
        const contents = container.querySelectorAll('.mega-menu-content');
        // 辅助函数：切换 Tab
        function switchTab(targetId) {
            // 重置所有 Trigger 样式
            triggers.forEach(t => {
                t.classList.remove('bg-white', 'text-primary', 'border-l-4', 'border-primary', 'shadow-sm');
                t.classList.add('border-l-4', 'border-transparent', 'text-secondary');

                // 重置图标颜色
                const icon = t.querySelector('.trigger-icon');
                if (icon) {
                    icon.classList.remove('text-primary');
                    icon.classList.add('text-gray-400');
                }
            });
            // 隐藏所有 Content
            contents.forEach(c => {
                c.classList.add('hidden');
            });
            // 激活当前 Trigger
            const currentTrigger = container.querySelector(`.mega-menu-trigger[data-target="${targetId}"]`);
            if (currentTrigger) {
                currentTrigger.classList.remove('border-transparent', 'text-secondary');
                currentTrigger.classList.add('bg-white', 'text-primary', 'border-primary', 'shadow-sm');
                // 激活图标颜色
                const icon = currentTrigger.querySelector('.trigger-icon');
                if (icon) {
                    icon.classList.remove('text-gray-400');
                    icon.classList.add('text-primary');
                }
            }
            // 显示当前 Content
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        }
        triggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', () => {
                const targetId = trigger.getAttribute('data-target');
                switchTab(targetId);
            });
        });
        // 初始化默认选中第一个
        if (triggers.length > 0) {
            const firstTargetId = triggers[0].getAttribute('data-target');
            switchTab(firstTargetId);
        }
    }
    // 渲染 Mega Menu HTML
    function renderMegaMenu(container) {
        let sidebarHtml = '';
        let contentHtml = '';
        servicesData.forEach((category, index) => {
            // 生成 Sidebar Item
            sidebarHtml += `
            <div class="mega-menu-trigger w-full flex items-center gap-3 px-6 py-4 cursor-pointer transition-all duration-200 border-l-4 border-transparent hover:bg-white hover:text-primary group" data-target="mega-content-${category.id}">
                <i data-lucide="${category.icon}" class="trigger-icon w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"></i>
                <div class="flex-1">
                    <div class="font-bold text-base">${category.title}</div>
                    <div class="text-xs text-gray-400 mt-0.5 hover:text-primary/70 line-clamp-1">${category.description}</div>
                </div>
                <i data-lucide="chevron-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary"></i>
            </div>
        `;
            // 生成 Content Item (Grid Layout)
            contentHtml += `
            <div id="mega-content-${category.id}" class="mega-menu-content hidden h-full overflow-y-auto custom-scrollbar">
                <div class="grid grid-cols-2 gap-x-8 gap-y-6">
                    ${category.items.map(item => `
                        <a href="${item.link}" class="flex items-start gap-3 group/item p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div class="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                <i data-lucide="${item.icon}" class="w-4 h-4 text-primary group-hover/item:text-white transition-colors"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-sm text-secondary group-hover/item:text-primary transition-colors">${item.title}</h4>
                                <p class="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">${item.desc}</p>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
        });
        const fullHtml = `
        <div class="flex bg-white rounded-b-lg overflow-hidden">
            <!-- Sidebar (Left) -->
            <div class="w-[300px] bg-gray-50 flex-shrink-0 py-4 overflow-y-auto border-r border-gray-100">
                ${sidebarHtml}
            </div>
            <!-- Content (Right - 2 Columns) -->
            <div class="flex-1 p-8 bg-white">
                ${contentHtml}
            </div>
        </div>
    `;
        container.innerHTML = fullHtml;
    }

    // 移动端菜单逻辑
    function initMobileMenu() {
        const mobileServicesContent = document.getElementById('mobile-services-content');
        if (!mobileServicesContent) return;
        // 渲染服务列表
        let html = '';
        servicesData.forEach(category => {
            html += `
            <div class="border-b border-gray-100 last:border-0">
                <button class="mobile-service-category w-full flex justify-between items-start py-3 text-secondary hover:text-primary transition-colors text-left">
                    <div class="flex gap-3">
                        <i data-lucide="${category.icon}" class="w-5 h-5 text-primary mt-1 flex-shrink-0"></i>
                        <div>
                            <div class="font-bold text-base">${category.title}</div>
                            <div class="text-xs text-gray-500 mt-1 font-normal">${category.description}</div>
                        </div>
                    </div>
                    <i data-lucide="chevron-down" class="w-4 h-4 transition-transform duration-300 mt-1"></i>
                </button>
                <div class="overflow-hidden transition-all duration-300 ease-in-out max-h-0 bg-gray-50">
                    <div class="pl-8 pr-4 py-4 space-y-4">
                        ${category.items.map(item => `
                            <a href="${item.link}" class="block group">
                                <div class="font-bold text-sm text-secondary group-hover:text-primary transition-colors mb-1">
                                    ${item.title}
                                </div>
                                <div class="text-xs text-gray-500 leading-relaxed">
                                    ${item.desc}
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        });
        mobileServicesContent.innerHTML = html;

        // 辅助函数：手风琴切换
        function toggleAccordion(element, icon) {
            if (element.style.maxHeight && element.style.maxHeight !== '0px') {
                // 关闭
                element.style.maxHeight = element.scrollHeight + 'px'; // 设置固定高度以便过渡
                element.offsetHeight; // 强制重绘
                element.style.maxHeight = '0px';
                if (icon) icon.classList.remove('rotate-180');
            } else {
                // 打开
                element.style.maxHeight = element.scrollHeight + 'px';
                if (icon) icon.classList.add('rotate-180');

                element.addEventListener('transitionend', function () {
                    if (element.style.maxHeight !== '0px') {
                        element.style.maxHeight = 'none';
                    }
                }, { once: true });
            }
        }
        // 绑定事件
        // 1. 主 Services 展开/收起
        const mobileServicesToggle = document.getElementById('mobile-services-toggle');
        if (mobileServicesToggle) {
            mobileServicesToggle.addEventListener('click', function () {
                const content = document.getElementById('mobile-services-content');
                const icon = this.querySelector('i[data-lucide="chevron-down"]');
                if (content.style.maxHeight === 'none') {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.offsetHeight; // 强制重绘
                }
                toggleAccordion(content, icon);
            });
        }
        // 2. 子分类展开/收起
        const categoryButtons = document.querySelectorAll('.mobile-service-category');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const content = this.nextElementSibling;
                const icon = this.querySelector('i[data-lucide="chevron-down"]');
                if (content.style.maxHeight === 'none') {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.offsetHeight;
                }

                toggleAccordion(content, icon);
            });
        });
    }
    // 移动端菜单切换逻辑
    function initMobileToggle() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', function () {
                menu.classList.toggle('hidden');
                // 切换图标
                // 注意：Lucide 会将 i 标签替换为 svg，所以我们需要查找具有对应 class 的元素
                // 查找时可能已经是 svg 了
                let iconMenu = btn.querySelector('.icon-menu');
                let iconClose = btn.querySelector('.icon-close');

                if (iconMenu && iconClose) {
                    iconMenu.classList.toggle('hidden');
                    iconClose.classList.toggle('hidden');
                }
            });
        }
    }
    // 导航栏滚动固定逻辑
    function initStickyNav() {
        const nav = document.getElementById('main-nav');
        if (!nav) return;
        // 创建占位符，防止页面跳动
        const placeholder = document.createElement('div');
        placeholder.style.display = 'none'; // 默认隐藏
        nav.parentNode.insertBefore(placeholder, nav);
        // 获取导航栏初始位置（缓存，假设初始在顶部或固定位置）
        // 注意：如果页面有顶部通栏，nav.offsetTop 可能不为0
        let navTop = nav.offsetTop;
        // 监听 resize 更新 navTop，防止布局变化导致位置不对
        window.addEventListener('resize', () => {
            if (!nav.classList.contains('fixed')) {
                navTop = nav.offsetTop;
            }
        });
        window.addEventListener('scroll', function () {
            const scrollY = window.scrollY;
            // 动态获取高度，确保准确
            // 优先获取内部固定高度的容器 (.h-20)，加上 border-bottom (1px)
            // 这样可以避免 mobile-menu 或 mega-menu 的 absolute 定位在某些情况下影响 nav 高度的问题
            const headerContent = nav.querySelector('.h-20');
            // 如果找不到 .h-20，回退到 nav.offsetHeight，但通常 .h-20 是存在的
            // nav border-b width is 1px
            const navHeight = headerContent ? (headerContent.offsetHeight + 1) : nav.offsetHeight;
            if (scrollY > (navTop + navHeight)) { // 当滚动超过导航栏原始底部位置时
                if (!nav.classList.contains('fixed')) { // 启用固定定位前设置占位符高度
                    placeholder.style.height = navHeight + 'px';
                    placeholder.style.display = 'block'; // 显示占位符

                    nav.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'shadow-md', 'animate-slide-down');
                    nav.classList.remove('relative');
                }
            } else {
                if (nav.classList.contains('fixed')) { // 取消固定定位
                    nav.classList.remove('fixed', 'top-0', 'left-0', 'w-full', 'shadow-md', 'animate-slide-down');
                    nav.classList.add('relative');
                    placeholder.style.display = 'none'; // 隐藏占位符
                }
            }
        });
    }
    // 初始化函数
    window.initHeader = function () {
        initMegaMenu();
        initMobileMenu();
        initMobileToggle();
        initStickyNav();
    };