const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

// Initialize users from localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let errors = [];

  if (firstname_input) {
    // Signup form
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);
    if (errors.length === 0) {
      // Save user data
      const newUser = {
        firstname: firstname_input.value,
        email: email_input.value,
        password: password_input.value
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Signup successful! Please login.');
      window.location.href = 'login.html';
    }
  } else {
    // Login form
    errors = getLoginFormErrors(email_input.value, password_input.value);
    if (errors.length === 0) {
      // On successful login, you can redirect to a new page
      alert('Login successful!');
      // For demonstration, you could redirect to a welcome page:
      // window.location.href = 'welcome.html';
    }
  }

  if (errors.length > 0) {
    error_message.innerText = errors.join('. ');
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (firstname === '' || firstname == null) {
    errors.push('Firstname is required');
    firstname_input.parentElement.classList.add('incorrect');
  }
  if (email === '' || email == null) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  } else if (users.find(user => user.email === email)) {
    errors.push('Email is already in use');
    email_input.parentElement.classList.add('incorrect');
  }
  if (password === '' || password == null) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters');
    password_input.parentElement.classList.add('incorrect');
  }
  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password');
    password_input.parentElement.classList.add('incorrect');
    repeat_password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === '' || email == null) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if (password === '' || password == null) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }

  if (errors.length === 0) {
    const user = users.find(user => user.email === email);
    if (!user || user.password !== password) {
      errors.push('Invalid email or password');
      email_input.parentElement.classList.add('incorrect');
      password_input.parentElement.classList.add('incorrect');
    }
  }

  return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  });
});