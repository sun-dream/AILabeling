        window.initServiceIntroPic = function () {
            const track = document.getElementById('gallery-track');
            const prevBtn = document.querySelector('.carousel-prev');
            const nextBtn = document.querySelector('.carousel-next');

            if (!track || !prevBtn || !nextBtn) return;

            // 清空已有内容，防止重复初始化
            track.innerHTML = '';

            // Image sources
            const images = [
                "https://aidp.juejin.cn/agentic/api/v1/tool/text2image?prompt=%E8%BF%99%E5%BC%A0%E5%9B%BE%E7%89%87%E7%94%B1%E4%B8%89%E9%83%A8%E5%88%86%E7%BB%84%E6%88%90%EF%BC%8C%E5%B7%A6%E8%BE%B9%E8%BE%83%E5%A4%A7%EF%BC%8C%E5%8F%B3%E8%BE%B9%E5%88%86%E4%B8%BA%E4%B8%8A%E4%B8%8B%E4%B8%A4%E9%83%A8%E5%88%86%E3%80%82%E4%BB%A5%E4%B8%8B%E6%98%AF%E5%AF%B9%E5%9B%BE%E7%89%87%E7%9A%84%E8%AF%A6%E7%BB%86%E6%8F%8F%E8%BF%B0%EF%BC%9A%E5%B7%A6%E5%9B%BE%E5%8D%A02/3%E5%B1%95%E7%A4%BAZicklin%20Contracting%E6%9C%8D%E5%8A%A1%E8%BD%A6%E6%A0%87%22FIRE%E2%80%A2WATER%E2%80%A2MOLD%E2%80%A2CRIME%20SCENE%20CLEANUP%22%E5%8F%8A%22DISASTER%20RECOVERY%20EXPERTS%22%EF%BC%8C%E4%BA%94%E5%90%8D%E5%9B%A2%E9%98%9F%E6%88%90%E5%91%98%E9%9D%A2%E9%83%A8%E6%B8%85%E6%99%B0%E7%A9%BF%E6%B7%B1%E8%89%B2%E5%B7%A5%E8%A3%85(%E6%B7%B1%E8%93%9DT%E6%81%A4/%E9%BB%91%E8%89%B2%E6%88%98%E6%9C%AF%E8%83%8C%E5%BF%83)%E7%AB%99%E7%AB%8B%E4%BA%8E%E7%BB%BF%E6%A0%91%E4%BD%8F%E5%AE%85%E5%B8%A6%E5%A4%AA%E9%98%B3%E8%83%BD%E6%9D%BF%E8%83%8C%E6%99%AF%EF%BC%9B%E5%8F%B3%E5%9B%BE%E4%B8%8A%E9%83%A8%E7%81%AB%E7%81%BE%E6%8D%9F%E6%AF%81%E7%8E%B0%E5%9C%BA%EF%BC%88%E5%9D%8D%E5%A1%8C%E5%A4%A9%E8%8A%B1%E6%9D%BF%E3%80%81%E7%83%A7%E6%AF%81%E6%A9%B1%E6%9F%9C%E3%80%81%E7%83%9F%E5%B0%98%E5%BC%A5%E6%BC%AB%E5%A2%99%E9%9D%A2%EF%BC%89%EF%BC%8C%E4%B8%8B%E9%83%A8%E4%BF%AE%E5%A4%8D%E5%90%8E%E7%A9%BA%E9%97%B4(%E5%A2%99%E9%9D%A2%E6%B4%81%E7%99%BD%E5%B9%B3%E6%95%B4%E3%80%81%E6%B0%B4%E6%B3%A5%E5%9C%B0%E9%9D%A2%E5%B9%B2%E5%87%80%E3%80%81%E5%A4%A9%E8%8A%B1%E6%9D%BF%E8%A7%84%E6%95%B4%E7%AE%A1%E9%81%93%E3%80%81%E7%8E%B0%E4%BB%A3LED%E7%85%A7%E6%98%8E%E3%80%81%E7%99%BD%E8%89%B2%E6%A5%BC%E6%A2%AF%E6%89%B6%E6%89%8B)%EF%BC%9B%E7%94%BB%E9%9D%A2%E5%85%83%E7%B4%A0%E6%97%A0%E7%BC%9D%E5%A1%AB%E5%85%85%E6%95%B4%E5%BC%A0%E5%9B%BE%EF%BC%8C%E6%97%A0%E8%BE%B9%E8%B7%9D%E7%A9%BA%E7%99%BD,%E8%83%8C%E6%99%AF%E4%B8%BA%E7%99%BD%E8%89%B2%E3%80%82&width=810&height=470",
                "https://aidp.juejin.cn/agentic/api/v1/tool/text2image?prompt=professional%20technician%20using%20advanced%20equipment%20for%20fire%20damage%20restoration&size=1024x1024"
            ];

            // Configuration
            const itemsToShow = 4; // Show 4 images at a time (responsive adjustments below)
            let currentIndex = 0;
            let autoPlayInterval;

            // Build carousel items
            // Duplicate images to create a long strip for infinite scrolling illusion
            const displayImages = [...images, ...images, ...images, ...images, ...images, ...images];

            displayImages.forEach((src, index) => {
                const item = document.createElement('div');
                item.className = 'w-full md:w-1/3 lg:w-1/4 flex-shrink-0 px-2'; // 1 col mobile, 3 tablet, 4 desktop
                item.innerHTML = `
                    <div class="aspect-[4/3] overflow-hidden rounded-lg">
                        <img src="${src}" alt="Gallery Image ${index}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
                    </div>
                `;
                track.appendChild(item);
            });

            // Carousel Logic
            function updateCarousel() {
                const itemWidth = track.children[0].offsetWidth;
                track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

                // Reset if reached end (infinite loop illusion)
                if (currentIndex >= displayImages.length - itemsToShow) {
                    setTimeout(() => {
                        track.style.transition = 'none';
                        currentIndex = 0;
                        track.style.transform = `translateX(0)`;
                        setTimeout(() => {
                            track.style.transition = 'transform 0.5s ease-in-out';
                        }, 50);
                    }, 500);
                }
            }

            function nextSlide() {
                currentIndex++;
                updateCarousel();
            }

            function prevSlide() {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    // Jump to end
                    track.style.transition = 'none';
                    currentIndex = displayImages.length - itemsToShow - 1;
                    const itemWidth = track.children[0].offsetWidth;
                    track.style.transform = `translateX(-${(currentIndex + 1) * itemWidth}px)`;
                    setTimeout(() => {
                        track.style.transition = 'transform 0.5s ease-in-out';
                        updateCarousel();
                    }, 50);
                    return;
                }
                updateCarousel();
            }

            // Event Listeners
            const newNextBtn = nextBtn.cloneNode(true);
            const newPrevBtn = prevBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
            prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);

            newNextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoPlay();
            });

            newPrevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoPlay();
            });

            // Auto Play
            function startAutoPlay() {
                clearInterval(autoPlayInterval);
                autoPlayInterval = setInterval(nextSlide, 3000);
            }

            function resetAutoPlay() {
                clearInterval(autoPlayInterval);
                startAutoPlay();
            }

            // Resize handler
            window.removeEventListener('resize', updateCarousel);
            window.addEventListener('resize', updateCarousel);

            // Start
            startAutoPlay();

            // Pause on hover
            track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
            track.addEventListener('mouseleave', startAutoPlay);
        };