// bar.js

// ============================================================
// GLOBAL NAVIGATION LOGIC
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Hamburger Menu ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            hamburgerBtn.classList.toggle('open', isOpen);
        });
    }

    // --- Dark Mode ---
    const darkmodeToggle = document.getElementById('mode-toggle');
    if (darkmodeToggle) {
        darkmodeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkmodeToggle.textContent = isDark ? "☀" : "☾";
        });
    }

    // --- Global Search Logic ---
    initGlobalSearch();
});

async function initGlobalSearch() {
    const searchInput = document.querySelector('#searchbar');
    const suggestionList = document.getElementById('search-suggestions');
    const searchForm = document.getElementById('searchbar-container');

    if (!searchInput || !suggestionList) return;

    try {
        const response = await fetch('../data/cars.json'); 
        const data = await response.json();
        
        const carData = data['Brands'].flatMap(brand =>
            brand.cars.map(car => ({ year: car.year, make: car.make, model: car.model }))
        );

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();
            suggestionList.innerHTML = '';

            if (!query) {
                suggestionList.style.display = 'none';
                return;
            }

            const matches = carData.filter(car =>
                `${car.year} ${car.make} ${car.model}`.toLowerCase().includes(query)
            ).slice(0, 8);

            if (matches.length === 0) {
                suggestionList.innerHTML = '<li>No Results Found.</li>';
            } else {
                matches.forEach(car => {
                    const li = document.createElement('li');
                    li.textContent = `${car.year} ${car.make} ${car.model}`;
                    li.addEventListener('click', () => {
                        searchInput.value = li.textContent;
                        suggestionList.style.display = 'none';
                        searchForm.submit();
                    });
                    suggestionList.appendChild(li);
                });
            }
            suggestionList.style.display = 'block';
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#searchbar-container')) {
                suggestionList.style.display = 'none';
            }
        });

    } catch (err) {
        console.warn("Search data could not be loaded:", err);
    }
}