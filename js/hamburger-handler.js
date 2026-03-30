const hburger = document.getElementById('hamburger-icon');
const navLinks = document.querySelector('ul').children;

hburger.addEventListener('click', () => {
    for (let i =0; i < navLinks.length; i++) {
        navLinks[i].classList.toggle('active');
    }
});