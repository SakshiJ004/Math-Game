const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.src = '/assets/hide.png';
    } else {
        passwordInput.type = 'password';
        this.src = '/assets/open-eye.png';
    }
});

const signForm = document.getElementById("signForm");
const signupMessage = document.getElementById("signupMessage");

function isValidEmail(email) {
    const emailPattern = /^[a-z0-9]+@gmail\.com$/;
    return emailPattern.test(email);
}


signForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signupMessage.innerText = "";

    if (!isValidEmail(email)) {
        signupMessage.innerText = "Invalid email format";
        signupMessage.style.color = 'red';
        return;
    }

    const existingUser = JSON.parse(localStorage.getItem('userData'));

    if (existingUser && existingUser.email === email) {
        signupMessage.innerText = "User already exists. Please log in.";
        signupMessage.style.color = 'red';
        setTimeout(() => {
            window.location.href = '/html/login.html';
        }, 2000);
    } else {
        localStorage.setItem('userData', JSON.stringify({ username, email, password }));
        signupMessage.innerText = "Sign-up successful!";
        signupMessage.style.color = 'green';

        // Clear the form inputs
        document.getElementById('username').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";

        setTimeout(() => {
            window.location.href = '/html/level.html';
        }, 2000);
    }
});
