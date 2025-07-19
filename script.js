// User data storage
let users = [];
let currentUser = null;

// DOM elements
const forms = {
    welcomeScreen: document.getElementById('welcomeScreen'),
    signupForm: document.getElementById('signupForm'),
    loginForm: document.getElementById('loginForm'),
    forgotPasswordForm: document.getElementById('forgotPasswordForm'),
    landingPage: document.getElementById('landingPage')
};

const messages = {
    signup: document.getElementById('signupMessage'),
    login: document.getElementById('loginMessage'),
    forgot: document.getElementById('forgotMessage')
};

const showForm = id => {
    Object.values(forms).forEach(f => f.classList.add('hidden'));
    forms[id].classList.remove('hidden');
    clearMessages();
};

const clearMessages = () => Object.values(messages).forEach(m => m.innerHTML = '');

const showMessage = (el, msg, type = 'error') => {
    const cls = type === 'error' ? 'error-message' : 'success-message';
    el.innerHTML = `<div class="${cls}">${msg}</div>`;
    const form = el.closest('.form-container');
    if (form) {
        form.classList.add(type === 'error' ? 'shake' : 'pulse');
        setTimeout(() => form.classList.remove(type === 'error' ? 'shake' : 'pulse'), type === 'error' ? 500 : 300);
    }
};

// Show authentication forms with 3-second delay
function showAuthForms() {
    const btn = document.querySelector('.get-started-btn');
    btn.classList.add('loading');
    btn.innerHTML = 'Loading...';
    setTimeout(() => {
        showForm('signupForm');
    }, 3000);
}

window.showAuthForms = showAuthForms;
window.showSignupForm = () => showForm('signupForm');
window.showLoginForm = () => showForm('loginForm');
window.showForgotPassword = () => showForm('forgotPasswordForm');
window.logout = () => {
    currentUser = null;
    showForm('welcomeScreen');
    const btn = document.querySelector('.get-started-btn');
    btn.classList.remove('loading');
    btn.innerHTML = 'Get Started';
};

// Form submissions
const formHandlers = {
    signupFormElement: e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const { name, email, regNo, password, confirmPassword } = Object.fromEntries(fd);
        if (password !== confirmPassword)
            return showMessage(messages.signup, 'Passwords do not match!');
        if (users.some(u => u.regNo === regNo))
            return showMessage(messages.signup, 'Registration number already exists!');
        users.push({ name, email, regNo, password });
        showMessage(messages.signup, 'Account created successfully! Please login.', 'success');
        setTimeout(() => showForm('loginForm'), 2000);
    },
    loginFormElement: e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const { regNo, password } = Object.fromEntries(fd);
        const user = users.find(u => u.regNo === regNo && u.password === password);
        if (user) {
            currentUser = user;
            showMessage(messages.login, 'Login successful!', 'success');
            setTimeout(() => {
                showForm('landingPage');
                document.getElementById('welcomeMessage').textContent = `Hello ${user.name}! You have successfully logged in to your account.`;
            }, 1500);
        } else {
            showMessage(messages.login, 'Invalid credentials!');
        }
    },
    forgotPasswordFormElement: e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const { email } = Object.fromEntries(fd);
        const user = users.find(u => u.email === email);
        showMessage(messages.forgot, user ? 'Password reset link sent to your email!' : 'Email not found!', user ? 'success' : 'error');
    }
};

['signupFormElement', 'loginFormElement', 'forgotPasswordFormElement'].forEach(id => {
    document.getElementById(id).addEventListener('submit', formHandlers[id]);
});

// Input feedback
Array.from(document.querySelectorAll('input')).forEach(input => {
    input.addEventListener('focus', function() { this.classList.add('pulse'); });
    input.addEventListener('blur', function() { this.classList.remove('pulse'); });
});

// Keyboard shortcut
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') clearMessages();
});