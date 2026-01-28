// 组件加载函数
async function loadComponents() {
    // 组件列表
    const components = [
        { id: 'header', file: 'header.html' },
        { id: 'banner', file: 'banner.html' },
        { id: 'consultation-form', file: 'consultation-form.html' },
        { id: 'service-intro-pic', file: 'service-intro-pic.html' },
        { id: 'service-intro-text', file: 'service-intro-text.html' },
        { id: 'contact-card-phone', file: 'contact-card-phone.html' },
        { id: 'service-details', file: 'service-details.html' },
        { id: 'customer-review', file: 'customer-review.html' },
        { id: 'fire-faq', file: 'fire-faq.html' },
        { id: 'customer-showcase', file: 'customer-showcase.html' },
        { id: 'faq', file: 'faq.html' },
        { id: 'contact-card-phone2', file: 'contact-card-phone.html' },
        { id: 'contact-customer-service-team', file: 'contact-customer-service-team.html' },
        { id: 'contact-text-phone', file: 'contact-text-phone.html' },
        { id: 'contact-text-form', file: 'contact-text-form.html' },
        { id: 'footer', file: 'footer.html' },
    ];

    // 加载组件
    for (const component of components) {
        try {
            const response = await fetch(`components/${component.file}`);
            const content = await response.text();
            const container = document.getElementById(component.id);
            if (container) {
                container.innerHTML = content;
            }
        } catch (error) {
            console.error(`Failed to load component ${component.id}:`, error);
        }
    }

    // 初始化组件逻辑
    if (window.initHeader) window.initHeader();
    if (window.initCustomerReview) window.initCustomerReview();
    if (window.initContactForm) window.initContactForm();
    if (window.initServiceIntroPic) window.initServiceIntroPic();

    // 初始化 Lucide 图标
    if (window.lucide) {
        lucide.createIcons();
    }

    // 初始化交互功能
    initInteractions();
}

// 初始化交互功能
function initInteractions() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function () {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('navbar-scrolled');
            } else {
                header.classList.remove('navbar-scrolled');
            }
        }
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    // Helper to close an item
    const closeItem = (item) => {
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.lucide');
        if (content && icon) {
            content.style.maxHeight = null;
            icon.classList.remove('rotate-45');
            // Remove primary color from text if needed, though usually handled by group-hover or CSS
            // The HTML uses group-hover for text color, so we don't strictly need to toggle it here 
            // unless we want it persistent. The screenshot implies active state might be colored.
            // Let's keep it simple and consistent with CSS.
        }
    };

    // Helper to open an item
    const openItem = (item) => {
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.lucide');
        if (content && icon) {
            // Recalculate height
            // Add a small buffer (1px) to avoid sub-pixel cropping issues
            content.style.maxHeight = (content.scrollHeight + 1) + "px";
            icon.classList.add('rotate-45');
        }
    };

    faqItems.forEach(item => {
        const button = item.querySelector('button');

        if (button) {
            button.addEventListener('click', () => {
                const content = item.querySelector('.faq-content');
                const isOpen = content && content.style.maxHeight && content.style.maxHeight !== '0px';

                // Close all others
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        closeItem(otherItem);
                    }
                });

                // Toggle current
                if (isOpen) {
                    closeItem(item);
                } else {
                    openItem(item);
                }
            });
        }
    });

    // Update heights on resize to prevent content cropping
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            faqItems.forEach(item => {
                const content = item.querySelector('.faq-content');
                // If open (has inline max-height), update it
                if (content && content.style.maxHeight && content.style.maxHeight !== '0px') {
                    content.style.maxHeight = (content.scrollHeight + 1) + "px";
                }
            });
        }, 100); // Debounce resize
    });

    // 平滑滚动
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
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    loadComponents();
});

// 图片懒加载
document.addEventListener('DOMContentLoaded', function () {
    const lazyImages = document.querySelectorAll('img.lazy');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    image.classList.add('loaded');
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach(function (image) {
            imageObserver.observe(image);
        });
    } else {
        // 回退方案
        lazyImages.forEach(function (image) {
            image.src = image.dataset.src;
            image.classList.remove('lazy');
            image.classList.add('loaded');
        });
    }
});