window.initContactForm = function () {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (!form || !submitBtn) return;

    // Helper: Validate a single field
    const validateField = (input) => {
        const errorMsg = input.parentElement.querySelector('.error-msg');
        let isValid = true;

        // Reset styles
        input.classList.remove('ring-2', 'ring-red-500', 'border-red-500');
        if (errorMsg) errorMsg.classList.add('hidden');

        // Check required
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            if (errorMsg) errorMsg.textContent = 'This field is required';
        }
        // Check email
        else if (input.type === 'email' && input.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                if (errorMsg) errorMsg.textContent = 'Please enter a valid email address';
            }
        }

        if (!isValid) {
            input.classList.add('ring-2', 'ring-red-500');
            if (errorMsg) errorMsg.classList.remove('hidden');
        }

        return isValid;
    };

    // Real-time validation
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            // If already showing error, re-validate on input to clear it
            if (input.classList.contains('ring-red-500')) {
                validateField(input);
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Simulate submission
            const originalBtnText = submitBtn.innerText;
            const originalBtnClasses = submitBtn.className;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success state
            submitBtn.innerText = 'Sent!';
            submitBtn.classList.remove('bg-primary', 'hover:bg-opacity-90');
            submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');

            form.reset();

            // Restore button after 3 seconds
            setTimeout(() => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.className = originalBtnClasses;
            }, 3000);
        }
    });
};