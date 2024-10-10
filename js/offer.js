document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.offer-cards');
    const cards = document.querySelectorAll('.offer-card');
    const dotsContainer = document.querySelector('.dots-container');
    let currentIndex = 0;
    let autoSlideInterval;

    // Create dots for navigation
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            moveToCard(index);
        });
        dotsContainer.appendChild(dot);
    });

    // Set the first dot as active
    dotsContainer.children[currentIndex].classList.add('active');

    function moveToCard(index) {
        currentIndex = index;
        const offset = -currentIndex * 100;
        cardsContainer.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    function updateDots() {
        Array.from(dotsContainer.children).forEach(dot => dot.classList.remove('active'));
        dotsContainer.children[currentIndex].classList.add('active');
    }

    function showNextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        moveToCard(currentIndex);
    }

    // Auto-slide every 3 seconds
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(showNextCard, 3000);
    };

    startAutoSlide();

    // Handle touch events for mobile
    let startX;

    cardsContainer.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        clearInterval(autoSlideInterval); // Stop auto sliding
    });

    cardsContainer.addEventListener('touchmove', (event) => {
        const moveX = event.touches[0].clientX - startX;
        // Only allow swipe if the movement is significant
        if (Math.abs(moveX) > 50) { 
            if (moveX > 0) {
                // Swipe right: move to previous card
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            } else {
                // Swipe left: move to next card
                currentIndex = (currentIndex + 1) % cards.length;
            }
            moveToCard(currentIndex);
            startX = null; // Reset startX to avoid multiple triggers
        }
    });

    cardsContainer.addEventListener('touchend', () => {
        startAutoSlide(); // Restart auto sliding
    });

    // Allow tap on card to move to the next card
    cardsContainer.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        moveToCard(currentIndex);
    });

    // Handle mouse wheel events for desktop
    cardsContainer.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            // Scroll down: move to next card
            currentIndex = (currentIndex + 1) % cards.length;
        } else {
            // Scroll up: move to previous card
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        }
        moveToCard(currentIndex);
        event.preventDefault(); // Prevent scrolling the page
    });
});
