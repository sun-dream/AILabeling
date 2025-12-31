document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // --- Announcement Bar Logic ---
    const announcementBar = document.getElementById('announcement-bar');
    const closeAnnouncementBtn = document.getElementById('close-announcement');
    if (closeAnnouncementBtn && announcementBar) {
        closeAnnouncementBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            announcementBar.style.display = 'none';
        });
    }

    // --- Mobile Menu Toggle Logic ---
    const menuBtn = document.getElementById('mobile-menu-btn'); // Updated ID
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('icon-menu-container');
    const closeIcon = document.getElementById('icon-close-container');
    let isMenuOpen = false;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent global hijack
            e.preventDefault();
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                if (menuIcon && closeIcon) {
                    menuIcon.classList.remove('block');
                    menuIcon.classList.add('hidden');
                    closeIcon.classList.remove('hidden');
                    closeIcon.classList.add('block');
                }
            } else {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
                if (menuIcon && closeIcon) {
                    menuIcon.classList.remove('hidden');
                    menuIcon.classList.add('block');
                    closeIcon.classList.remove('block');
                    closeIcon.classList.add('hidden');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                 mobileMenu.classList.add('translate-x-full');
                 isMenuOpen = false;
                 document.body.style.overflow = '';
                 if (menuIcon && closeIcon) {
                    menuIcon.classList.remove('hidden');
                    menuIcon.classList.add('block');
                    closeIcon.classList.remove('block');
                    closeIcon.classList.add('hidden');
                 }
            }
        });
    }

    // --- Sticky & Transparent Header Logic ---
    const header = document.getElementById('main-header');
    const headerLogo = document.getElementById('header-logo');
    const isTransparent = header && header.getAttribute('data-transparent') === 'true';

    const updateHeader = () => {
        if (!header) return;

        if (window.scrollY > 20) {
            // Scrolled state: White background, dark text
            header.classList.add('bg-white', 'text-gray-900', 'shadow-sm');
            header.classList.remove('bg-transparent', 'text-white');
            if (headerLogo) {
                headerLogo.classList.remove('brightness-0', 'invert');
            }
        } else {
            // Top state: Transparent background, white text (unless hovered)
            // Note: Hover state is handled by CSS group-hover in HTML
            header.classList.remove('bg-white', 'text-gray-900', 'shadow-sm');
            header.classList.add('bg-transparent', 'text-white');
            if (headerLogo) {
                headerLogo.classList.add('brightness-0', 'invert');
            }
        }
    };
    
    // Initial check
    if (isTransparent) {
        updateHeader();
        window.addEventListener('scroll', updateHeader);
    }

    // --- Navigation & Click Handling (Requirement: Jump to example.com) ---
    const handleInteraction = (e) => {
        // Allow form inputs to work normally
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        // Check if the clicked element or its parent is interactive
        const target = e.target.closest('a, button, .cursor-pointer');
        
        // Exclusions:
        // 1. Mobile Menu Button
        if (target === menuBtn || (menuBtn && menuBtn.contains(target))) return;
        // 2. Announcement Close Button
        if (target === closeAnnouncementBtn || (closeAnnouncementBtn && closeAnnouncementBtn.contains(target))) return;
        
        if (target) {
            e.preventDefault();
            window.open('https://www.example.com', '_blank');
        }
    };

    document.addEventListener('click', handleInteraction);
});
