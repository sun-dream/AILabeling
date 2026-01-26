// 组件列表
const components = [
    'header.html',
    'topnews.html',
    'services-home.html',
    'special-offer-musicians.html',
    'range-teaser-question.html',
    'special-offer-client.html',
    'range-teaser-answer.html',
    'product.html',
    'announcement.html',
    'quote.html',
    'footer.html',
    'dialog.html'
];

// 加载所有组件
async function loadComponents() {
    const app = document.getElementById('app');
    const loader = document.getElementById('loader');
    
    try {
        for (const component of components) {
            const response = await fetch(`components/${component}`);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${component}`);
            }
            const html = await response.text();
            app.insertAdjacentHTML('beforeend', html);
        }
        
        // 隐藏加载指示器
        loader.style.display = 'none';
        
        // 初始化组件
        initComponents();
    } catch (error) {
        console.error('Error loading components:', error);
        loader.innerHTML = '<p class="text-primary">加载失败，请刷新页面重试</p>';
    }
}

// 初始化组件
function initComponents() {
    // 初始化滚动动画
    initScrollReveal();
    
    // 初始化导航栏滚动效果
    initNavbarScroll();
    
    // 初始化模态窗口
    initModal();
    
    // 初始化按钮交互
    initButtonInteractions();
    
    // 初始化视频播放
    initVideoPlayers();
}

// 滚动触发动画
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });
}

// 模态窗口初始化
function initModal() {
    const modal = document.getElementById('modal');
    const modalBtn = document.querySelector('[data-modal="open"]');
    const closeBtn = document.querySelector('[data-modal="close"]');
    
    if (modal && modalBtn && closeBtn) {
        modalBtn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // 点击模态框外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// 按钮交互效果
function initButtonInteractions() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

// 视频播放器初始化
function initVideoPlayers() {
    const videoBtns = document.querySelectorAll('[data-video]');
    
    videoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoId = btn.getAttribute('data-video');
            const videoContainer = document.getElementById(videoId);
            
            if (videoContainer) {
                const video = videoContainer.querySelector('video');
                if (video) {
                    // 滚动到视频位置
                    videoContainer.scrollIntoView({ behavior: 'smooth' });
                    
                    // 播放视频
                    setTimeout(() => {
                        video.play().catch(err => {
                            console.error('Error playing video:', err);
                        });
                    }, 500);
                }
            }
        });
    });
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', loadComponents);