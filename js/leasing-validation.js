// This selects the form element so we can control submission
const form = document.querySelector('.leasing-form');

// This selects the error message paragraph at the bottom of the form
const errorMsg = document.getElementById('error-msg');

// These are the validation rules for each input field
const validators = {
    name:   (val) => /^[a-zA-Z\s'-]+$/.test(val.trim()),
    // Only allows letters, spaces, apostrophes, and hyphens

    email:  (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
    // Basic email format check

    phone:  (val) => /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(val.trim()),
    // Matches common phone formats like (123)-456-7890

    car:    (val) => /^[a-zA-Z0-9\s\-]+$/.test(val.trim()),
    // Allows letters, numbers, spaces, and hyphens for car names

    term: (val) => /^\d+\s*months?$/i.test(val.trim()),
    // Example: "24 months"

    budget: (val) => /^\$?\d+(\.\d{1,2})?$/.test(val.trim()),
    // Example: "$1000" or "1000"

    down: (val) => /^\$?\d+(\.\d{1,2})?$/.test(val.trim()),
    // Same format as budget

    credit: (val) => {
        const n = parseInt(val);
        return /^\d+$/.test(val.trim()) && n >= 300 && n <= 850;
    }
    // Must be a number between 300 and 850
};

// This function checks a single field and adds/removes red border
function validateField(id) {
    const input = document.getElementById(id);
    const isValid = validators[id](input.value);

    // Adds 'error' class if invalid and not empty
    input.classList.toggle('error', !isValid && input.value !== '');

    return isValid || input.value === '';
}

// This runs validation live as the user types
Object.keys(validators).forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
        validateField(id);
        updateErrorMsg();
    });
});

// This shows or hides the error message at the bottom
function updateErrorMsg() {
    const anyError = Object.keys(validators).some(id =>
        document.getElementById(id).classList.contains('error')
    );

    errorMsg.style.display = anyError ? 'block' : 'none';
}

// This runs when the user clicks "Submit Application"
form.addEventListener('submit', (e) => {

    let allValid = true;

    // Validate every field before submission
    Object.keys(validators).forEach(id => {
        const input = document.getElementById(id);
        const isValid = validators[id](input.value);

        input.classList.toggle('error', !isValid);

        if (!isValid) allValid = false;
    });

    updateErrorMsg();

    // If ANY field is invalid, stop submission
    if (!allValid) {
        e.preventDefault();
    } else {
        //Save data before redirecting

        localStorage.setItem("name", document.getElementById("name").value);
        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("phone", document.getElementById("phone").value);
        localStorage.setItem("car", document.getElementById("car").value);
        localStorage.setItem("term", document.getElementById("term").value);
        localStorage.setItem("budget", document.getElementById("budget").value);
        localStorage.setItem("down", document.getElementById("down").value);
        localStorage.setItem("credit", document.getElementById("credit").value);

        
    }
});