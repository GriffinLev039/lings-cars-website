// Get the toggle button
const toggleBtn = document.getElementById("dark-toggle");

// When clicked, switch themes
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});