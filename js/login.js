const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.src = '/assets/hide.png';
    } else {
        passwordInput.type = 'password';
        this.src = '/assets/view.png';
    }
});

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const storedUser = JSON.parse(localStorage.getItem('userData'));

    if (!storedUser) {
        loginMessage.innerText = "Please sign up first.";
        loginMessage.style.color = 'red';

        setTimeout(() => {
            window.location.href = '/index.html';
        }, 2000);
    } else {
        if (storedUser.username === username) {
            if (storedUser.password === password) {
                loginMessage.innerText = "Login successful!";
                loginMessage.style.color = 'green';

                setTimeout(() => {
                    window.location.href = '/html/level.html';
                }, 2000);
            } else {
                loginMessage.innerText = "Incorrect password. Please try again.";
                loginMessage.style.color = 'red';
                document.getElementById('password').value = ""; 
            }
        } else {
            loginMessage.innerText = "Username does not exist. Please sign up first.";
            loginMessage.style.color = 'red';

            setTimeout(() => {
                window.location.href = '/index.html';
            }, 2000);

            document.getElementById('username').value = "";
            document.getElementById('password').value = ""; 
        }
    }
});

