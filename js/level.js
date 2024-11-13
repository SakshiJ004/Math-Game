document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('startGameBtn');
    const questionSection = document.getElementById('question-section');
    const answerSection = document.getElementById('answer-section');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');
    const timeDisplay = document.getElementById('time');
    const hearts = [
        document.getElementById('live1'),
        document.getElementById('live2'),
        document.getElementById('live3'),
    ];
    const profileImage = document.getElementById('profileImage');
    const profileName = document.getElementById('profileName');

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        profileName.innerText = userData.username || 'Your Name';
        profileImage.src = userData.profileImage || '/assets/pr.jpg';
    }

    let score = 0;
    let level = 1;
    let lives = 3;
    let timer;
    let timeLeft = 30;

    startGameBtn.addEventListener('click', startGame);

    function startGame() {
        score = 0;
        level = 1;
        lives = 3;
        timeLeft = 30;
        updateDisplay();
        clearSections();
        startTimer();
        generateQuestion();
    }

    function updateDisplay() {
        scoreDisplay.innerText = score;
        levelDisplay.innerText = level;
        timeDisplay.innerText = timeLeft;

        hearts.forEach((heart, index) => {
            heart.style.display = index < lives ? 'block' : 'none';
        });
    }

    function clearSections() {
        questionSection.innerHTML = '';
        answerSection.innerHTML = '';
    }

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function generateQuestion() {
        let maxNumber = 5 + level * 3;
        let correctAnswer;
        let question;

        if (level === 1) {  // Addition only
            const num1 = Math.floor(Math.random() * maxNumber);
            const num2 = Math.floor(Math.random() * maxNumber);
            correctAnswer = num1 + num2;
            question = `${num1} + ${num2}`;
        } else if (level === 2) {  // Subtraction only
            const num1 = Math.floor(Math.random() * maxNumber);
            const num2 = Math.floor(Math.random() * maxNumber);
            correctAnswer = num1 - num2;
            question = `${num1} - ${num2}`;
        } else if (level === 3) {  // Multiplication only
            const num1 = Math.floor(Math.random() * maxNumber);
            const num2 = Math.floor(Math.random() * maxNumber);
            correctAnswer = num1 * num2;
            question = `${num1} x ${num2}`;
        } else if (level === 4) {  // Division only
            const num1 = Math.floor(Math.random() * maxNumber);
            const num2 = Math.floor(Math.random() * (maxNumber / 2)) + 1;
            correctAnswer = Math.floor(num1 / num2);
            question = `${num1} / ${num2}`;
        } else if (level === 5) {  // All operations
            const num1 = Math.floor(Math.random() * maxNumber);
            const num2 = Math.floor(Math.random() * maxNumber);
            const operation = ['+', '-', 'x', '/'][Math.floor(Math.random() * 4)];

            if (operation === '+') {
                correctAnswer = num1 + num2;
                question = `${num1} + ${num2}`;
            } else if (operation === '-') {
                correctAnswer = num1 - num2;
                question = `${num1} - ${num2}`;
            } else if (operation === 'x') {
                correctAnswer = num1 * num2;
                question = `${num1} x ${num2}`;
            } else {
                const num3 = Math.floor(Math.random() * (maxNumber / 2)) + 1;
                correctAnswer = Math.floor(num1 / num3);
                question = `${num1} / ${num3}`;
            }
        }

        questionSection.innerHTML = `<div class="sum">${question}</div>`;
        const options = generateOptions(correctAnswer);
        options.forEach((option) => {
            const box = document.createElement('div');
            box.className = 'box';
            box.innerText = option;
            box.addEventListener('click', () => checkAnswer(option, correctAnswer));
            answerSection.appendChild(box);
        });
    }

    function generateOptions(correctAnswer) {
        const options = [correctAnswer];
        while (options.length < 4) {
            const randomOption = Math.floor(Math.random() * (correctAnswer + 10));
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }
        return options.sort(() => Math.random() - 0.5);
    }

    function checkAnswer(selected, correct) {
        if (parseInt(selected) === correct) {
            score += 1;
            if (score % 3 === 0 && level < 5) {
                level++;
            }
            updateDisplay();
            clearSections();
            generateQuestion();
        } else {
            lives--;
            updateDisplay();
            if (lives === 0) {
                endGame();
            } else {
                clearSections();
                generateQuestion();
            }
        }
    }

    function endGame() {
        if (timer) clearInterval(timer);
        questionSection.innerHTML = `<div class="sum">Game Over! Your score is ${score}</div>`;
        answerSection.innerHTML = '';

        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        if (score > (userData.highScore || 0)) {
            userData.highScore = score;
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        setTimeout(() => {
            window.location.href = '/html/profile.html';
        }, 1000);
    }
});
