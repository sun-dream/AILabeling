// 组件配置
const components = [
    { id: 'header-component', file: 'header.html' },
    { id: 'topnews-component', file: 'topnews.html' },
    { id: 'services-home-component', file: 'services-home.html' },
    { id: 'special-offer-musicians-component', file: 'special-offer-musicians.html' },
    { id: 'range-teaser-question-component', file: 'range-teaser-question.html' },
    { id: 'special-offer-client-component', file: 'special-offer-client.html' },
    { id: 'range-teaser-answer-component', file: 'range-teaser-answer.html' },
    { id: 'product-component', file: 'product.html' },
    { id: 'announcement-component', file: 'announcement.html' },
    { id: 'quote-component', file: 'quote.html' },
    { id: 'footer-component', file: 'footer.html' },
    { id: 'dialog-component', file: 'dialog.html' },
];

// 加载所有组件
async function loadComponents() {
    const loader = document.getElementById('loader');
    
    // 串行加载组件
    for (const component of components) {
        try {
            const response = await fetch(`components/${component.file}`);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${component.file}`);
            }
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
                        // 使用 textContent 获取原始文本，避免 HTML 实体解码导致的问题
                        // 并添加换行符防止意外的 EOF 错误
                        newScript.textContent = script.textContent + '\n';
                    }
                    
                    Array.from(script.attributes).forEach(attr => {
                        if (attr.name !== 'src') {
                            newScript.setAttribute(attr.name, attr.value);
                        }
                    });
                    
                    try {
                        console.log('document', document.body,newScript);
                        document.body.appendChild(newScript);
                    } catch (e) {
                        console.error('Error executing script in component:', component.id, e);
                        console.log('Failed script content:', newScript.textContent);
                    }
                });
            }
        } catch (error) {
            console.error(`Error loading component ${component.file}:`, error);
        }
    }
        
    // 隐藏加载指示器
    if (loader) {
        loader.style.display = 'none';
    }
    
    // 初始化组件
    initComponents();
}

// 初始化组件
function initComponents() {
    // 初始化滚动动画
    initScrollReveal();
    
    // 初始化模态窗口
    initModal();
    
    // 初始化按钮交互
    initButtonInteractions();
    
    // 初始化视频播放
    initVideoPlayers();

    // 初始化 Newsletter 弹窗
    initNewsletterPopup();

    // 初始化图标
    if (window.lucide) {
        lucide.createIcons();
    }
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

// Newsletter 弹窗初始化
function initNewsletterPopup() {
    const popup = document.getElementById('newsletter-popup');
    const closeBtn = document.getElementById('newsletter-close-btn');
    const form = document.getElementById('newsletter-form');
    
    if (!popup) return;

    const cookieName = 'newsletter_popup_closed';
    const submittedCookieName = 'newsletter_popup_submitted';
    
    // Cookie 操作辅助函数
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
    }

    // 检查是否已关闭或已提交
    if (getCookie(cookieName) || getCookie(submittedCookieName)) {
        return;
    }

    // 显示弹窗
    function showPopup() {
        popup.classList.remove('hidden');
        // 强制重绘以触发 transition
        popup.offsetHeight; 
        popup.classList.remove('opacity-0');
        
        // 禁止背景滚动
        document.body.style.overflow = 'hidden';
    }

    // 关闭弹窗
    function closePopup() {
        popup.classList.add('opacity-0');
        
        // 等待动画结束
        setTimeout(() => {
            popup.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);

        // 设置关闭 Cookie (7天)
        setCookie(cookieName, 'true', 7);
    }

    // 提交处理
    if (form) {
        form.addEventListener('submit', () => {
            // 设置提交 Cookie (365天)
            setCookie(submittedCookieName, 'true', 365);
            // 提交后关闭弹窗
            closePopup();
            // 表单会正常提交到 target="_blank"
        });
    }

    // 关闭按钮事件
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    // 点击背景关闭
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    // 延迟显示 (5秒)
    setTimeout(showPopup, 5000);
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', loadComponents);