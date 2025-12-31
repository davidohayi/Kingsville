const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const lastname_input = document.getElementById('lastname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const errors_message = document.getElementById('error-message');
const social_btn = document.querySelectorAll('.social-btn');
const toggleButtons = document.querySelectorAll('.toggle-password');

function getSignupFormErrors(firstname, lastname, email, password, repeatPassword){
    let errors = [];

    if(!firstname) {
        errors.push('Firstname is required');
        firstname_input.parentElement.classList.add('incorrect');
    }
    if(!lastname) {
        errors.push('Lastname is required');
        lastname_input.parentElement.classList.add('incorrect');
    }
    if(!email) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if(!password) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    else if(!/(?=.*\d).{8,}/.test(password)) {
    errors.push('Password must be at least 8 characters and include a number');
    password_input.parentElement.classList.add('incorrect');
    }
    if(password !== repeatPassword) {
        errors.push('Password do not match');
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = [];

    if(!email) {
        errors.push('Email is requied');
        email_input.parentElement.classList.add('incorrect');
    }
    if(!password) {
        errors.push('Password is requied');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}
const allInputs = [firstname_input, lastname_input, email_input, password_input, repeat_password_input].filter(Boolean);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            errors_message.innerText = '';
        }
    });
});

toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (!input) return;

    if (input.type === 'password') {
      input.type = 'text';
      btn.setAttribute('aria-label', 'Hide password');
      btn.textContent = '🙈'; // swap the icon or text
    } else {
      input.type = 'password';
      btn.setAttribute('aria-label', 'Show password');
      btn.textContent = '👁️';
    }
  });
});