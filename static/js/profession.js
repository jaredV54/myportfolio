// Initialize progress bars
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill progress bars
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to animate progress bars when they come into view
    function animateProgressBars() {
        skillItems.forEach(item => {
            if (isElementInViewport(item)) {
                const progressBar = item.querySelector('.progress');
                const progressValue = item.getAttribute('data-progress') + '%';
                
                // Set the width after a small delay for animation effect
                setTimeout(() => {
                    progressBar.style.width = progressValue;
                }, 200);
            }
        });
    }
    
    // Initial check
    animateProgressBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateProgressBars);
    
    // Add hover effect to industry cards
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});