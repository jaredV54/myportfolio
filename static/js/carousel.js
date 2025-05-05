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
    
    for (let i = 0; i < totalItems - visibleItems + 1; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.dot');
    
    function updateVisibleItems() {
        if (window.innerWidth < 768) {
            visibleItems = 1;
        } else if (window.innerWidth < 992) {
            visibleItems = 2;
        } else {
            visibleItems = 3;
        }
        
        itemWidth = carousel.clientWidth / visibleItems;
        
        items.forEach(item => {
            item.style.minWidth = `${itemWidth - 20}px`;
            item.style.flex = `0 0 ${itemWidth - 20}px`;
        });
        
        while (dotsContainer.firstChild) {
            dotsContainer.removeChild(dotsContainer.firstChild);
        }
        
        for (let i = 0; i < totalItems - visibleItems + 1; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        goToSlide(Math.min(currentIndex, totalItems - visibleItems));
    }
    
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index > totalItems - visibleItems) index = totalItems - visibleItems;
        
        currentIndex = index;
        const translateX = -index * (itemWidth);
        carousel.style.transform = `translateX(${translateX}px)`;
        
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
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
            goToSlide(currentIndex - 1); 
        } else if (diff < -50) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(currentIndex);
        }
        
        moveX = null;
    });
    
    updateVisibleItems();
    
    window.addEventListener('resize', updateVisibleItems);
    
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
});