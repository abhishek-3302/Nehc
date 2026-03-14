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

    // Services Carousel Logic - True Infinite Loop
    const servicesTrack = document.getElementById('servicesTrack');
    const servicesPrevBtn = document.getElementById('servicesPrev');
    const servicesNextBtn = document.getElementById('servicesNext');
    const serviceCards = document.querySelectorAll('.services-carousel .service-card');
    
    let servicesCurrentIndex = 0;
    let servicesItemsPerView = 3;
    const servicesTotalItems = serviceCards.length;
    
    // Clone items for seamless infinite loop
    const servicesClonesNeeded = servicesItemsPerView * 2;
    for (let i = 0; i < servicesClonesNeeded; i++) {
        servicesTrack.appendChild(serviceCards[i % servicesTotalItems].cloneNode(true));
    }
    
    for (let i = 0; i < servicesItemsPerView; i++) {
        servicesTrack.insertBefore(serviceCards[servicesTotalItems - 1 - i].cloneNode(true), servicesTrack.firstChild);
    }
    
    function updateServicesCarousel() {
        const itemWidth = serviceCards[0].offsetWidth + 30;
        const offset = -servicesCurrentIndex * itemWidth;
        servicesTrack.style.transform = `translateX(${offset}px)`;
        
        servicesPrevBtn.disabled = false;
        servicesNextBtn.disabled = false;
        servicesPrevBtn.style.opacity = '1';
        servicesNextBtn.style.opacity = '1';
    }
    
    servicesNextBtn.addEventListener('click', function() {
        servicesCurrentIndex = (servicesCurrentIndex + 1) % servicesTotalItems;
        updateServicesCarousel();
    });
    
    servicesPrevBtn.addEventListener('click', function() {
        servicesCurrentIndex = (servicesCurrentIndex - 1 + servicesTotalItems) % servicesTotalItems;
        updateServicesCarousel();
    });
    
    // Touch/swipe support for mobile
    let servicesStartX = 0;
    let servicesCurrentX = 0;
    
    servicesTrack.addEventListener('touchstart', function(e) {
        servicesStartX = e.touches[0].clientX;
    });
    
    servicesTrack.addEventListener('touchmove', function(e) {
        servicesCurrentX = e.touches[0].clientX;
    });
    
    servicesTrack.addEventListener('touchend', function() {
        const diffX = servicesStartX - servicesCurrentX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                servicesCurrentIndex = (servicesCurrentIndex + 1) % servicesTotalItems;
            } else if (diffX < 0) {
                servicesCurrentIndex = (servicesCurrentIndex - 1 + servicesTotalItems) % servicesTotalItems;
            }
            updateServicesCarousel();
        }
    });
    
    function handleServicesResize() {
        const width = window.innerWidth;
        if (width < 768) {
            servicesItemsPerView = 1;
        } else if (width < 1200) {
            servicesItemsPerView = 2;
        } else {
            servicesItemsPerView = 3;
        }
        updateServicesCarousel();
    }
    
    window.addEventListener('resize', handleServicesResize);
    
    updateServicesCarousel();
    
    // Auto-play for services
    let servicesAutoPlayInterval;
    function startServicesAutoPlay() {
        servicesAutoPlayInterval = setInterval(() => {
            servicesCurrentIndex++;
            updateServicesCarousel();
        }, 5000);
    }
    
    function stopServicesAutoPlay() {
        clearInterval(servicesAutoPlayInterval);
    }
    
    const servicesCarousel = document.querySelector('.services-carousel');
    servicesCarousel.addEventListener('mouseenter', stopServicesAutoPlay);
    servicesCarousel.addEventListener('mouseleave', startServicesAutoPlay);
    
    setTimeout(startServicesAutoPlay, 2000);
    
    console.log('Services carousel initialized - INFINITE LOOP: ' + servicesTotalItems + ' items continuous sliding');

    // Clients Carousel Logic - True Infinite Loop
    const clientsTrack = document.getElementById('clientsTrack');
    const clientsPrevBtn = document.getElementById('clientsPrev');
    const clientsNextBtn = document.getElementById('clientsNext');
    const clientItems = document.querySelectorAll('.client-item');
    
    let clientsCurrentIndex = 0;
    let clientsItemsPerView = 4;
    const clientsTotalItems = clientItems.length;
    
    // Clone items for seamless infinite loop
    const clientsClonesNeeded = clientsItemsPerView * 2;
    for (let i = 0; i < clientsClonesNeeded; i++) {
        clientsTrack.appendChild(clientItems[i % clientsTotalItems].cloneNode(true));
    }
    
    for (let i = 0; i < clientsItemsPerView; i++) {
        clientsTrack.insertBefore(clientItems[clientsTotalItems - 1 - i].cloneNode(true), clientsTrack.firstChild);
    }
    
    function updateClientsCarousel() {
        const itemWidth = clientItems[0].offsetWidth + 30;
        const offset = -clientsCurrentIndex * itemWidth;
        clientsTrack.style.transform = `translateX(${offset}px)`;
        
        clientsPrevBtn.disabled = false;
        clientsNextBtn.disabled = false;
        clientsPrevBtn.style.opacity = '1';
        clientsNextBtn.style.opacity = '1';
    }
    
    clientsNextBtn.addEventListener('click', function() {
        clientsCurrentIndex = (clientsCurrentIndex + 1) % clientsTotalItems;
        updateClientsCarousel();
    });
    
    clientsPrevBtn.addEventListener('click', function() {
        clientsCurrentIndex = (clientsCurrentIndex - 1 + clientsTotalItems) % clientsTotalItems;
        updateClientsCarousel();
    });
    
    // Touch/swipe support for mobile
    let clientsStartX = 0;
    let clientsCurrentX = 0;
    
    clientsTrack.addEventListener('touchstart', function(e) {
        clientsStartX = e.touches[0].clientX;
    });
    
    clientsTrack.addEventListener('touchmove', function(e) {
        clientsCurrentX = e.touches[0].clientX;
    });
    
    clientsTrack.addEventListener('touchend', function() {
        const diffX = clientsStartX - clientsCurrentX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                clientsCurrentIndex = (clientsCurrentIndex + 1) % clientsTotalItems;
            } else if (diffX < 0) {
                clientsCurrentIndex = (clientsCurrentIndex - 1 + clientsTotalItems) % clientsTotalItems;
            }
            updateClientsCarousel();
        }
    });
    
    function handleClientsResize() {
        const width = window.innerWidth;
        if (width < 768) {
            clientsItemsPerView = 1;
        } else if (width < 1200) {
            clientsItemsPerView = 2;
        } else if (width < 1400) {
            clientsItemsPerView = 3;
        } else {
            clientsItemsPerView = 4;
        }
        updateClientsCarousel();
    }
    
    window.addEventListener('resize', handleClientsResize);
    
    updateClientsCarousel();
    
    // Auto-play for clients
    let clientsAutoPlayInterval;
    function startClientsAutoPlay() {
        clientsAutoPlayInterval = setInterval(() => {
            clientsCurrentIndex++;
            updateClientsCarousel();
        }, 4000);
    }
    
    function stopClientsAutoPlay() {
        clearInterval(clientsAutoPlayInterval);
    }
    
    const clientsCarousel = document.querySelector('.clients-carousel');
    clientsCarousel.addEventListener('mouseenter', stopClientsAutoPlay);
    clientsCarousel.addEventListener('mouseleave', startClientsAutoPlay);
    
    setTimeout(startClientsAutoPlay, 2000);
    
    console.log('Clients carousel initialized - INFINITE LOOP: ' + clientsTotalItems + ' items continuous sliding');

    // Testimonials Carousel Logic - True Infinite Loop
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialsPrevBtn = document.getElementById('testimonialsPrev');
    const testimonialsNextBtn = document.getElementById('testimonialsNext');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    let testimonialsCurrentIndex = 0;
    let testimonialsItemsPerView = 3;
    const testimonialsTotalItems = testimonialCards.length;
    
    // Clone items for seamless infinite loop
    const testimonialsClonesNeeded = testimonialsItemsPerView * 2;
    for (let i = 0; i < testimonialsClonesNeeded; i++) {
        testimonialsTrack.appendChild(testimonialCards[i % testimonialsTotalItems].cloneNode(true));
    }
    
    for (let i = 0; i < testimonialsItemsPerView; i++) {
        testimonialsTrack.insertBefore(testimonialCards[testimonialsTotalItems - 1 - i].cloneNode(true), testimonialsTrack.firstChild);
    }
    
    function updateTestimonialsCarousel() {
        const itemWidth = testimonialCards[0].offsetWidth + 30;
        const offset = -testimonialsCurrentIndex * itemWidth;
        testimonialsTrack.style.transform = `translateX(${offset}px)`;
        
        testimonialsPrevBtn.disabled = false;
        testimonialsNextBtn.disabled = false;
        testimonialsPrevBtn.style.opacity = '1';
        testimonialsNextBtn.style.opacity = '1';
        
        // Update dots
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === testimonialsCurrentIndex % testimonialsTotalItems);
        });
    }
    
    testimonialsNextBtn.addEventListener('click', function() {
        testimonialsCurrentIndex = (testimonialsCurrentIndex + 1) % testimonialsTotalItems;
        updateTestimonialsCarousel();
    });
    
    testimonialsPrevBtn.addEventListener('click', function() {
        testimonialsCurrentIndex = (testimonialsCurrentIndex - 1 + testimonialsTotalItems) % testimonialsTotalItems;
        updateTestimonialsCarousel();
    });
    
    // Touch/swipe support for mobile
    let testimonialsStartX = 0;
    let testimonialsCurrentX = 0;
    
    testimonialsTrack.addEventListener('touchstart', function(e) {
        testimonialsStartX = e.touches[0].clientX;
    });
    
    testimonialsTrack.addEventListener('touchmove', function(e) {
        testimonialsCurrentX = e.touches[0].clientX;
    });
    
    testimonialsTrack.addEventListener('touchend', function() {
        const diffX = testimonialsStartX - testimonialsCurrentX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                testimonialsCurrentIndex = (testimonialsCurrentIndex + 1) % testimonialsTotalItems;
            } else if (diffX < 0) {
                testimonialsCurrentIndex = (testimonialsCurrentIndex - 1 + testimonialsTotalItems) % testimonialsTotalItems;
            }
            updateTestimonialsCarousel();
        }
    });
    
    // Generate dots
    const dotsContainer = document.getElementById('testimonialDots');
    for (let i = 0; i < testimonialsTotalItems; i++) {
        const dot = document.createElement('div');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', function() {
            testimonialsCurrentIndex = i;
            updateTestimonialsCarousel();
        });
        dotsContainer.appendChild(dot);
    }
    
    function handleTestimonialsResize() {
        const width = window.innerWidth;
        if (width < 768) {
            testimonialsItemsPerView = 1;
        } else if (width < 1200) {
            testimonialsItemsPerView = 2;
        } else {
            testimonialsItemsPerView = 3;
        }
        updateTestimonialsCarousel();
    }
    
    window.addEventListener('resize', handleTestimonialsResize);
    
    updateTestimonialsCarousel();
    
    // Auto-play for testimonials
    let testimonialsAutoPlayInterval;
    function startTestimonialsAutoPlay() {
        testimonialsAutoPlayInterval = setInterval(() => {
            testimonialsCurrentIndex++;
            updateTestimonialsCarousel();
        }, 5000);
    }
    
    function stopTestimonialsAutoPlay() {
        clearInterval(testimonialsAutoPlayInterval);
    }
    
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    testimonialsCarousel.addEventListener('mouseenter', stopTestimonialsAutoPlay);
    testimonialsCarousel.addEventListener('mouseleave', startTestimonialsAutoPlay);
    
    setTimeout(startTestimonialsAutoPlay, 2000);
    
    console.log('Testimonials carousel initialized - INFINITE LOOP: ' + testimonialsTotalItems + ' items continuous sliding');
});

