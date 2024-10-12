document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.offer-cards');
    const cards = document.querySelectorAll('.offer-card');
    const dotsContainer = document.querySelector('.dots-container');
    let currentIndex = 0;
    let autoSlideInterval;
    let isMouseOver = false; // Track if the mouse is over the cardsContainer
    let touchStartX;

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

    // Card UI Functions
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

    // Auto-slide every 4 seconds
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(showNextCard, 4000);
    };

    startAutoSlide();

    // Handle touch events for mobile
    cardsContainer.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
        clearInterval(autoSlideInterval); // Stop auto sliding on touch
    });

    cardsContainer.addEventListener('touchmove', (event) => {
        const moveX = event.touches[0].clientX - touchStartX;
        // Only process swipe if the distance exceeds the threshold
        if (Math.abs(moveX) > 50) {
            if (moveX > 0) {
                // Swipe right: move to the previous card
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            } else {
                // Swipe left: move to the next card
                currentIndex = (currentIndex + 1) % cards.length;
            }
            moveToCard(currentIndex);
            touchStartX = null; // Reset touchStartX to prevent multiple triggers
        }
    });

    cardsContainer.addEventListener('touchend', () => {
        startAutoSlide(); // Restart auto sliding after touch
    });

    // Track mouse enter and leave events to determine when to allow scrolling
    cardsContainer.addEventListener('mouseenter', () => {
        isMouseOver = true;
        clearInterval(autoSlideInterval); // Stop auto sliding
    });

    cardsContainer.addEventListener('mouseleave', () => {
        isMouseOver = false;
        startAutoSlide(); // Restart auto sliding
    });

    // Handle mouse wheel events for desktop
    cardsContainer.addEventListener('wheel', (event) => {
        if (isMouseOver) {
            clearInterval(autoSlideInterval); // Stop auto sliding during scroll
            if (event.deltaY > 0) {
                // Scroll down: move to the next card
                currentIndex = (currentIndex + 1) % cards.length;
            } else {
                // Scroll up: move to the previous card
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            }
            moveToCard(currentIndex);
            event.preventDefault(); // Prevent scrolling the page

            // Restart auto slide after a short timeout to give time for scrolling
            setTimeout(startAutoSlide, 500); // Adjust the timeout as needed
        }
    });
});
