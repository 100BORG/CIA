// Authentication management
function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const validEmail = 'user@example.com';
  const validPassword = 'password123';

  if (email === validEmail && password === validPassword) {
    localStorage.setItem('isLoggedIn', 'true'); // Save login state
    document.getElementById('loginScreen').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    document.body.classList.remove('login-active');
  } else {
    document.getElementById('errorMessage').style.display = 'block';
  }
}

function handleSignOut() {
  localStorage.removeItem('isLoggedIn'); // Clear login state
  document.querySelector('.container').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.body.classList.add('login-active');
}

function checkLoginState() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    document.getElementById('loginScreen').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    document.body.classList.remove('login-active');
  } else {
    document.getElementById('loginScreen').style.display = 'flex';
    document.querySelector('.container').style.display = 'none';
    document.body.classList.add('login-active');
  }
}
