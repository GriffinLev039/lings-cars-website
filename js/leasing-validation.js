const form = document.querySelector('.leasing-form');
const errorMsg = document.getElementById('error-msg');

// Validation rules for each field
const validators = {
    name:   (val) => /^[a-zA-Z\s'-]+$/.test(val.trim()),
    email:  (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
    phone:  (val) => /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(val.trim()),
    car:    (val) => /^[a-zA-Z0-9\s\-]+$/.test(val.trim()),
    term: (val) => /^\d+\s*months?$/i.test(val.trim()),       // e.g. "24 months"
    budget: (val) => /^\$?\d+(\.\d{1,2})?$/.test(val.trim()), // e.g. "$1000" or "1000"
    down: (val) => /^\$?\d+(\.\d{1,2})?$/.test(val.trim()),   // e.g. "$2000"
    credit: (val) => {                                          // 300–850
        const n = parseInt(val);
        return /^\d+$/.test(val.trim()) && n >= 300 && n <= 850;
    }
};

// Validate a single field and toggle the error class
function validateField(id) {
    const input = document.getElementById(id);
    const isValid = validators[id](input.value);
    input.classList.toggle('error', !isValid && input.value !== '');
    return isValid || input.value === ''; // empty = not invalid yet
}

// Live validation as user types
Object.keys(validators).forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
        validateField(id);
        updateErrorMsg();
    });
});

function updateErrorMsg() {
    const anyError = Object.keys(validators).some(id =>
        document.getElementById(id).classList.contains('error')
    );
    errorMsg.style.display = anyError ? 'block' : 'none';
}

// On submit, force-validate all fields
form.addEventListener('submit', (e) => {
    let allValid = true;

    Object.keys(validators).forEach(id => {
        const input = document.getElementById(id);
        const isValid = validators[id](input.value);
        input.classList.toggle('error', !isValid);
        if (!isValid) allValid = false;
    });

    updateErrorMsg();

    if (!allValid) e.preventDefault(); // Stop form submission if invalid
});