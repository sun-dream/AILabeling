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
    if (typeof initScrollReveal === 'function') initScrollReveal();

    // 初始化按钮交互
    if (typeof initButtonInteractions === 'function') initButtonInteractions();

    // 初始化 TopNews（按钮触发 YouTube 弹窗）
    initTopNews();

    // 初始化 Newsletter 弹窗
    initNewsletterPopup();

    // 初始化 GDPR 弹窗
    if (typeof initGDPRModal === 'function') initGDPRModal();
    // 初始化 GDPR Info Bar
    if (typeof initGDPRInfoBar === 'function') initGDPRInfoBar();

    // 初始化导航栏滚动效果
    if (typeof initNavbarScroll === 'function') initNavbarScroll();

    // 初始化移动端菜单
    if (typeof initMobileMenu === 'function') initMobileMenu();

    // 初始化图标
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Newsletter 弹窗初始化
function initNewsletterPopup() {
    const popup = document.getElementById('newsletter-popup');
    const closeBtn = document.getElementById('newsletter-close-btn');
    const form = document.getElementById('newsletter-form');

    if (!popup) return;

    const cookieName = 'cr-popup-popup';
    const submittedCookieName = 'newsletter_popup_submitted';

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

    // 提交处理（本地模拟提交）
    if (form) {
        const submitBtn = popup.querySelector('button[type="submit"]');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            if (!submitBtn) {
                setCookie(submittedCookieName, 'true', 365);
                closePopup();
                return;
            }

            const originalBtnText = submitBtn.innerText;
            const originalBtnClasses = submitBtn.className;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

            await new Promise(resolve => setTimeout(resolve, 1500));

            submitBtn.innerText = 'Sent!';
            submitBtn.classList.remove('bg-primary', 'hover:bg-[#b02e1a]');
            submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');

            setCookie(submittedCookieName, 'true', 365);

            setTimeout(() => {
                closePopup();
                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.className = originalBtnClasses;
                }, 3000);
            }, 800);
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

// TopNews 组件初始化
function initTopNews() {
    // 1. Video Autoplay Logic
    const video = document.getElementById('topnews-video');
    if (video) {
        // Ensure muted for autoplay
        video.muted = true;

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Autoplay prevented:', error);
                // Fallback to play on user interaction
                const startPlay = () => {
                    video.play();
                    document.removeEventListener('click', startPlay);
                    document.removeEventListener('touchstart', startPlay);
                    document.removeEventListener('keydown', startPlay);
                };
                document.addEventListener('click', startPlay);
                document.addEventListener('touchstart', startPlay);
                document.addEventListener('keydown', startPlay);
            });
        }
    }

    // 2. Video Modal Logic
    // Create modal DOM if it doesn't exist
    if (!document.getElementById('video-modal')) {
        const modalHtml = `
            <div id="video-modal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 hidden opacity-0 transition-opacity duration-300" role="dialog" aria-modal="true">
                <button id="video-modal-close" class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors focus:outline-none z-[201]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div class="w-full max-w-5xl aspect-video mx-4 relative bg-black rounded-lg overflow-hidden shadow-2xl">
                    <iframe id="video-modal-iframe" class="w-full h-full" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-modal-iframe');
    const closeBtn = document.getElementById('video-modal-close');
    const topnewsSection = document.getElementById('topnews');
    const musiciansSection = document.getElementById('special-offer');
    const clientSection = document.getElementById('special-offer-client');
    let triggers = [];
    if (topnewsSection) {
        triggers = triggers.concat(Array.from(topnewsSection.querySelectorAll('[data-video-id]')));
    }
    if (musiciansSection) {
        triggers = triggers.concat(Array.from(musiciansSection.querySelectorAll('[data-video-id]')));
    }
    if (clientSection) {
        triggers = triggers.concat(Array.from(clientSection.querySelectorAll('[data-video-id]')));
    }

    function openModal(videoSrc) {
        if (!modal || !iframe) return;

        let src = videoSrc || '';
        if (src) {
            src += src.includes('?') ? '&autoplay=1' : '?autoplay=1';
        }
        iframe.src = src;

        modal.classList.remove('hidden');
        // Force reflow
        modal.offsetHeight;
        modal.classList.remove('opacity-0');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal || !iframe) return;

        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            iframe.src = ''; // Stop playback
            document.body.style.overflow = '';
        }, 300);
    }

    // Bind triggers
    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = btn.dataset.videoId;
            const videoUrl = btn.dataset.videoUrl;
            const baseSrc = videoUrl || (videoId ? `https://www.youtube.com/embed/${videoId}` : '');

            const hasPopupCookie = !!getCookie('moove_gdpr_popup');
            if (hasPopupCookie) {
                if (baseSrc) openModal(baseSrc);
            } else {
                const gdprModal = document.getElementById('moove_gdpr_cookie_modal');
                if (gdprModal) {
                    gdprModal.classList.remove('hidden');
                    if (typeof gdprModal.showModal === 'function') {
                        gdprModal.showModal();
                    } else {
                        gdprModal.setAttribute('open', '');
                    }
                    document.body.style.overflow = 'hidden';
                    // Switch to YouTube tab
                    const ytTabBtn = document.querySelector('.gdpr-tab-btn[data-target="youtube_cookies"]');
                    if (ytTabBtn) ytTabBtn.click();
                } else {
                    console.error("GDPR Modal not found");
                }
            }
        });
    });

    if (modal) {
        if (!modal.dataset.hasListener) {
            if (closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
            });
            modal.dataset.hasListener = 'true';
        }
    }
}
