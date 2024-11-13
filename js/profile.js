document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const highScore = document.getElementById('highScore');
    const profileImage = document.getElementById('profileImage');
    const profileUpload = document.getElementById('profileUpload');

    loadUserData();

    profileImage.addEventListener('click', () => profileUpload.click());

    profileUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;
                profileImage.src = imageData; 
                saveUserData({ profileImage: imageData });
            };
            reader.readAsDataURL(file);
        }
    });
    

    function loadUserData() {
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        profileName.innerText = userData.username || 'Your Name';
        profileEmail.innerText = userData.email || 'your.email@example.com';
        highScore.innerText = userData.highScore || '0';
        profileImage.src = userData.profileImage || '/assets/pr.jpg';
    }

    function saveUserData(newData) {
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        const updatedData = { ...userData, ...newData };
        localStorage.setItem('userData', JSON.stringify(updatedData));
    }
});



