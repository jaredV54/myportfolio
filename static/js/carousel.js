document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!carousel || items.length === 0) return;
    
    let currentIndex = 0;
    let itemWidth;
    let visibleItems = 3;
    let totalItems = items.length;
    
    // Create dots
    for (let i = 0; i < totalItems - visibleItems + 1; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.dot');
    
    // Update visible items based on screen width
    function updateVisibleItems() {
        if (window.innerWidth < 768) {
            visibleItems = 1;
        } else if (window.innerWidth < 992) {
            visibleItems = 2;
        } else {
            visibleItems = 3;
        }
        
        itemWidth = carousel.clientWidth / visibleItems;
        
        // Update items width
        items.forEach(item => {
            item.style.minWidth = `${itemWidth - 20}px`;
            item.style.flex = `0 0 ${itemWidth - 20}px`;
        });
        
        // Remove all dots
        while (dotsContainer.firstChild) {
            dotsContainer.removeChild(dotsContainer.firstChild);
        }
        
        // Create new dots based on visible items
        for (let i = 0; i < totalItems - visibleItems + 1; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        // Update carousel position
        goToSlide(Math.min(currentIndex, totalItems - visibleItems));
    }
    
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index > totalItems - visibleItems) index = totalItems - visibleItems;
        
        currentIndex = index;
        const translateX = -index * (itemWidth);
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Update active dot
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // Touch events for mobile swiping
    let startX, moveX;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveX = e.touches[0].clientX;
        const diff = moveX - startX;
        const currentTranslate = -currentIndex * itemWidth;
        const newTranslate = currentTranslate + diff;
        carousel.style.transform = `translateX(${newTranslate}px)`;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', (e) => {
        isDragging = false;
        if (!moveX) return;
        
        const diff = moveX - startX;
        if (diff > 50) {
            goToSlide(currentIndex - 1); // Swipe right
        } else if (diff < -50) {
            goToSlide(currentIndex + 1); // Swipe left
        } else {
            goToSlide(currentIndex); // Return to current
        }
        
        moveX = null;
    });
    
    // Initialize
    updateVisibleItems();
    
    // Update on window resize
    window.addEventListener('resize', updateVisibleItems);
    
    // Auto slide
    const autoSlideInterval = 5000; // 5 seconds
    let autoSlideTimer;
    
    function startAutoSlide() {
        autoSlideTimer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % (totalItems - visibleItems + 1);
            goToSlide(nextIndex);
        }, autoSlideInterval);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }
    
    startAutoSlide();
    
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
});