document.addEventListener('DOMContentLoaded', function() {
    // Mission Carousel Logic - True Infinite Loop
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselContainer = document.querySelector('.carousel-container');
    const prevBtn = document.getElementById('missionPrev');
    const nextBtn = document.getElementById('missionNext');
    const missionItems = document.querySelectorAll('.mission-item');
    
    let currentIndex = 0;
    let itemsPerView = 3;
    const totalItems = missionItems.length; // 6
    
    // Clone items for seamless infinite loop
    const clonesNeeded = itemsPerView * 2;
    for (let i = 0; i < clonesNeeded; i++) {
        carouselTrack.appendChild(missionItems[i % totalItems].cloneNode(true));
    }
    
    for (let i = 0; i < itemsPerView; i++) {
        carouselTrack.insertBefore(missionItems[totalItems - 1 - i].cloneNode(true), carouselTrack.firstChild);
    }
    
    function updateCarousel() {
        const itemWidth = missionItems[0].offsetWidth + 30; // + gap
        const offset = -currentIndex * itemWidth;
        carouselTrack.style.transform = `translateX(${offset}px)`;
        
        // Buttons always enabled for infinite
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        prevBtn.style.opacity = '1';
        nextBtn.style.opacity = '1';
    }
    
    // Next button - infinite loop
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });
    
    // Prev button - infinite loop  
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let currentX = 0;
    
    carouselTrack.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    carouselTrack.addEventListener('touchmove', function(e) {
        currentX = e.touches[0].clientX;
    });
    
    carouselTrack.addEventListener('touchend', function() {
        const diffX = startX - currentX;
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) { // Swipe left → next
                currentIndex = (currentIndex + 1) % totalItems;
            } else if (diffX < 0) { // Swipe right → prev
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            }
            updateCarousel();
        }
    });
    
    // Responsive: adjust items per view
    function handleResize() {
        const width = window.innerWidth;
        if (width < 768) {
            itemsPerView = 1;
        } else if (width < 1200) {
            itemsPerView = 2;
        } else {
            itemsPerView = 3;
        }
        // Keep currentIndex valid for infinite loop (modulo handles it)
        updateCarousel();
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initialize
    updateCarousel();
    
    // Auto-play infinite
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex++;
            updateCarousel();
        }, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Pause on hover
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
    
    // Start auto-play after init
    setTimeout(startAutoPlay, 2000);
    
    console.log('Mission carousel initialized - INFINITE LOOP: 6 items continuous sliding');
});

