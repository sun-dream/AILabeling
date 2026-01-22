// Load components
async function loadComponents() {
    const components = [
        { id: 'header', path: 'components/header.html' },
        { id: 'hero', path: 'components/hero.html' },
        { id: 'services', path: 'components/services.html' },
        { id: 'approach', path: 'components/approach.html' },
        { id: 'portfolio', path: 'components/portfolio.html' },
        { id: 'contact', path: 'components/contact.html' },
        { id: 'footer', path: 'components/footer.html' }
    ];

    for (const component of components) {
        try {
            const response = await fetch(component.path);
            if (!response.ok) {
                throw new Error(`Failed to load ${component.path}`);
            }
            const html = await response.text();
            const element = document.getElementById(component.id);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading component:', error);
        }
    }

    // Initialize Lucide icons after components are loaded
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

// Scroll animation
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in or spring-bounce classes
    document.querySelectorAll('.fade-in, .spring-bounce').forEach(el => {
        observer.observe(el);
    });
}


// Dot grid parallax effect
function initDotGridParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const dotGrids = document.querySelectorAll('.dot-grid');
        
        dotGrids.forEach(grid => {
            const speed = 0.02;
            grid.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', async () => {
    await loadComponents();
    
    // Re-initialize functions after components are loaded
    setTimeout(() => {
        initScrollAnimations();
        initMobileMenu();
        initDotGridParallax();
        initSmoothScroll();
    }, 200);
});