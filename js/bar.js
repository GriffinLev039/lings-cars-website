// ============================================================
// HAMBURGER MENU TOGGLE
// ============================================================
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('open', isOpen);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('#bar') && !e.target.closest('#mobile-menu')) {
        mobileMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
    }
});

// Close menu when a link is clicked
mobileMenu.querySelectorAll('.bar-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
    });
});


// ============================================================
// DARK MODE TOGGLE
// ============================================================
const darkmodeToggle = document.getElementById('mode-toggle');
darkmodeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    !document.body.classList.contains('dark-mode') ? darkmodeToggle.textContent = "☾": darkmodeToggle.textContent = "☀" ;
});



// ============================================================
// DATA FETCH & SEARCH
// ============================================================
(async () => {
    const givenJSON = await fetch('./data/cars.json').then(res => res.json());
    console.log(givenJSON);

    // Populate thumbnail carousel
    thumbnailContainer.innerHTML = '';
    for (const item of givenJSON['Brands']) {
        const car = item['cars'][0];
        const thumbnail = document.createElement('img');
        thumbnail.src = car.src;
        thumbnailContainer.appendChild(thumbnail);
        dataArr.push({
            make: car.make,
            model: car.model,
            year: car.year,
            monthlyCost: car.leaseMonthlyCost,
        });
    }
    thumbnailContainer.children[0].classList.add('selected');

    for (const img of thumbnailContainer.children) {
        img.addEventListener('click', () => {
            const pos = Array.from(thumbnailContainer.children).indexOf(img);
            removeActive();
            mainImage.style.backgroundImage = `src(${img.src})`;
            img.classList.add('selected');
            carTitleElement.textContent = `${dataArr[pos].year} ${dataArr[pos].make} ${dataArr[pos].model}`;
            carPriceElement.textContent = dataArr[pos].monthlyCost;
        });
    }

    goNext();

    // View details button
    document.getElementById('car-details-btn').addEventListener('click', () => {
        const selected = document.querySelector('#car-scrollbar .selected');
        const pos = Array.from(thumbnailContainer.children).indexOf(selected);
        window.location.href = `./pages/car-details.html?make=${dataArr[pos].make}`;
    });

    // Search / autocomplete
    const carData = givenJSON['Brands'].flatMap(brand =>
        brand.cars.map(car => ({ year: car.year, make: car.make, model: car.model }))
    );

    const searchInput = document.querySelector('#searchbar');
    const suggestionList = document.getElementById('search-suggestions');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        suggestionList.innerHTML = '';

        if (!query) {
            suggestionList.style.display = 'none';
            return;
        }

        const matches = carData.filter(car =>
            `${car.year} ${car.make} ${car.model}`.toLowerCase().includes(query) ||
            car.make.toLowerCase().startsWith(query) ||
            car.model.toLowerCase().startsWith(query)
        ).slice(0, 8);

        if (matches.length === 0) {
            suggestionList.innerHTML = '<li>No Results Found.</li>';
            return;
        }

        for (const car of matches) {
            const li = document.createElement('li');
            li.textContent = `${car.year} ${car.make} ${car.model}`;
            li.addEventListener('click', () => {
                searchInput.value = li.textContent;
                suggestionList.style.display = 'none';
            });
            suggestionList.appendChild(li);
        }

        suggestionList.style.display = 'block';
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('#searchContainer')) {
            suggestionList.style.display = 'none';
        }
    });
})();
// 