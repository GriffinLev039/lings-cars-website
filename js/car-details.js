// This is the list of car photos used in the carousel
const images = [
    '../img/car-brands/imgs_zip/imgs/Nissan/nissanc1.avif',
    '../img/car-brands/imgs_zip/imgs/Nissan/nissanc2.avif',
    '../img/car-brands/imgs_zip/imgs/Nissan/nissanc3.avif',
];

// This keeps track of which photo is currently being shown (0 = first, 1 = second, etc.)
let current = 0;

// This grabs the main photo element and all the dot indicators from the page
const img = document.querySelector('.carousel-img');
const dots = document.querySelectorAll('.dot');

// This function switches the carousel to a specific photo by its index number.
// The modulo (%) makes it wrap around so going past the last photo loops back to the first.
function goTo(index) {
    current = (index + images.length) % images.length;

    // Swap out the displayed photo
    img.src = images[current];

    // Update the dots so only the one matching the current photo is highlighted
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}

// When the left arrow is clicked, go back one photo
document.querySelector('.carousel-btn.prev').addEventListener('click', () => goTo(current - 1));

// When the right arrow is clicked, go forward one photo
document.querySelector('.carousel-btn.next').addEventListener('click', () => goTo(current + 1));

// When a dot is clicked, jump directly to the photo that dot represents
dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
