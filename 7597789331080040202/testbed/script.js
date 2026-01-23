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
        { id: 'fire-repair', file: 'fire-repair.html' },
        { id: 'repair-service', file: 'repair-service.html' },
        { id: 'risk-reminder', file: 'risk-reminder.html' },
        { id: 'contact-card-link', file: 'contact-card-link.html' },
        { id: 'customer-showcase', file: 'customer-showcase.html' },
        { id: 'faq', file: 'faq.html' },
        { id: 'contact-price-phone', file: 'contact-price-phone.html' },
        { id: 'contact-text-phone', file: 'contact-text-phone.html' },
        { id: 'contact-text-form', file: 'contact-text-form.html' },
        { id: 'footer', file: 'footer.html' },
        { id: 'contact-us', file: 'contact-us.html' }
    ];
    
    // 加载组件
    for (const component of components) {
        try {
            const response = await fetch(`components/${component.file}`);
            const content = await response.text();
            const container = document.getElementById(component.id);
            if (container) {
                container.innerHTML = content;
                
                // 执行加载内容中的脚本
                const scripts = container.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.innerHTML;
                    }
                    // 保留属性
                    Array.from(script.attributes).forEach(attr => {
                        if (attr.name !== 'src') {
                            newScript.setAttribute(attr.name, attr.value);
                        }
                    });
                    
                    document.body.appendChild(newScript);
                });
            }
        } catch (error) {
            console.error(`Failed to load component ${component.id}:`, error);
        }
    }
    
    // 初始化 Lucide 图标
    lucide.createIcons();
    
    // 初始化交互功能
    initInteractions();
}

// 初始化交互功能
function initInteractions() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
             if (window.scrollY > 100) {
                header.classList.add('navbar-scrolled');
            } else {
                header.classList.remove('navbar-scrolled');
            }
        }
    });
    
    // FAQ 手风琴效果
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const panel = this.nextElementSibling;
            panel.classList.toggle('active');
            
            // 切换图标
            const icon = this.querySelector('i[data-lucide="chevron-down"]');
            if (panel.classList.contains('active')) {
                icon.classList.add('rotate-180');
            } else {
                icon.classList.remove('rotate-180');
            }
        });
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
    
    // 表单验证
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // 这里可以添加表单提交逻辑
            alert('表单已提交，我们将尽快与您联系！');
        });
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
});

// 图片懒加载
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    image.classList.add('loaded');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // 回退方案
        lazyImages.forEach(function(image) {
            image.src = image.dataset.src;
            image.classList.remove('lazy');
            image.classList.add('loaded');
        });
    }
});
