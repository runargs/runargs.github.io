// Add animations
document.addEventListener("DOMContentLoaded", function () {
    animateCard();
});

function animateCard() {
    const card = document.querySelector('.card');
    card.style.transform = 'scale(1)';
    card.style.opacity = '1';
}
