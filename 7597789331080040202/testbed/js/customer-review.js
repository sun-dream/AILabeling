        window.initCustomerReview = function () {
            const testimonials = [
                {
                    text: "I cannot praise Zicklin Contractors highly enough. I had to handle some home repairs from abroad before selling a flat in NY, and Raja and his team were an absolute pleasure to work with swift with comms, professional and thorough in their report, and direct in managing expectations on the overall project. Thank you lots, Zicklin!",
                    author: "Daisy de Plume"
                },
                {
                    text: "We had a great experience with Zicklin. We required brickpointing, repair and waterproofing of a portion of our home, and concrete repair around our house. They were able to start in a timely matter. They constantly checked in with us regarding the quality of their work. They made sure that everything requested was completed. The workmen were respectful of the property.",
                    author: "Leiana Richardson"
                },
                {
                    text: "I am so happy we went with Zicklin Construction to complete our renovations! They not only helped us to make our home more beautiful and accessible by way of repairing water-damaged walls, updating one of our bathrooms, and building a ramp, but they also did so while providing unmatched customer service and consistent consideration for my sick grandmother and her space.",
                    author: "Megan G. Astoria"
                },
                {
                    text: "Had a great experience working with Zicklin Contracting to waterproof our roof deck and fix some leaks on our apartment's exterior walls and brick pointing on my entire building. Our building, MGMT, also uses Zicklin for a variety of projects. They're reliable, give fair prices and do great work.",
                    author: "Ashley Palucci"
                },
                {
                    text: "Great communication throughout the project, which is already better than other contractors I've worked with. The work is good and efficient, and I am getting what I'm paying for, so overall, I am happy about the outcome.",
                    author: "Kj L."
                }
            ];

            let currentIndex = 0;
            const container = document.getElementById('review-container');
            const textEl = document.getElementById('review-text');
            const authorEl = document.getElementById('review-author');
            const prevBtn = document.getElementById('prev-review');
            const nextBtn = document.getElementById('next-review');

            if (!container || !textEl || !authorEl) return;

            // Initialize content
            function updateContent(index) {
                textEl.textContent = testimonials[index].text;
                authorEl.textContent = testimonials[index].author;
            }

            // Initial render
            if (testimonials.length > 0) {
                updateContent(0);
            }

            function fadeTransition(nextIndex) {
                // Fade out
                container.classList.add('opacity-0');

                setTimeout(() => {
                    updateContent(nextIndex);
                    // Fade in
                    container.classList.remove('opacity-0');
                }, 300); // Reduced duration for snappier feel
            }

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                    fadeTransition(currentIndex);
                });

                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    fadeTransition(currentIndex);
                });
            }
        };