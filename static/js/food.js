document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const foodItems = document.querySelectorAll('.food-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            foodItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    foodItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    const recipeIngredients = document.querySelectorAll('.recipe-content li');
    
    recipeIngredients.forEach(ingredient => {
        ingredient.addEventListener('mouseenter', function() {
            this.style.color = 'var(--secondary-color)';
            this.style.transform = 'translateX(5px)';
        });
        
        ingredient.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = 'translateX(0)';
        });
    });
    
    recipeIngredients.forEach(ingredient => {
        ingredient.style.transition = 'color 0.3s ease, transform 0.3s ease';
    });
    
    foodItems.forEach(item => {
        const foodImage = item.querySelector('.food-image img');
        
        item.addEventListener('mouseenter', function() {
            if (foodImage) {
                foodImage.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (foodImage) {
                foodImage.style.transform = 'scale(1)';
            }
        });
    });
});