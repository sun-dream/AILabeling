// Load components
async function loadComponents() {
    const components = [
        { id: 'header', path: 'components/header.html' },
        { id: 'hero', path: 'components/hero.html' },
        { id: 'services', path: 'components/services.html' },
        { id: 'approach', path: 'components/approach.html' },
        { id: 'pricing', path: 'components/pricing.html' },
        { id: 'portfolio', path: 'components/portfolio.html' },
        { id: 'contact', path: 'components/contact.html' },
        { id: 'footer', path: 'components/footer.html' },
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
        initDotGridParallax();
        initSmoothScroll();
        initContactForm();
    }, 200);
});

// Contact Form Validation and Submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = document.getElementById('submitBtn');

    // Real-time validation
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('border-red-500')) {
                validateField(input);
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Simulate submission
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success state
            submitBtn.innerText = 'Sent!';
            submitBtn.classList.remove('bg-black', 'hover:bg-gray-800');
            submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');

            // Reset form
            form.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-600', 'hover:bg-green-700');
                submitBtn.classList.add('bg-black', 'hover:bg-gray-800');
            }, 3000);
        }
    });
}

function validateField(input) {
    const errorId = input.id + 'Error';
    const errorElement = document.getElementById(errorId);
    let isValid = true;

    if (input.value.trim() === '') {
        isValid = false;
        if (errorElement) errorElement.textContent = 'This field is required';
    } else if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            if (errorElement) errorElement.textContent = 'Please enter a valid email address';
        }
    }

    if (!isValid) {
        input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
        input.classList.remove('border-gray-300', 'focus:border-dark', 'focus:ring-dark');
        if (errorElement) errorElement.classList.remove('hidden');
    } else {
        input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
        input.classList.add('border-gray-300', 'focus:border-dark', 'focus:ring-dark');
        if (errorElement) errorElement.classList.add('hidden');
    }

    return isValid;
}