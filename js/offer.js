document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.offer-cards');
    const cards = document.querySelectorAll('.offer-card');
    const dotsContainer = document.querySelector('.dots-container');
    let currentIndex = 0;

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
    setInterval(showNextCard, 3000);
});
