const isLoggedIn = false; 

  const loginButton = document.getElementById('login-button');
  const signupButton = document.getElementById('signup-button');
  const logoutButton = document.getElementById('logout-button');

  if (isLoggedIn) {
      loginButton.style.display = 'none';
      signupButton.style.display = 'none';
      logoutButton.style.display = 'block';
  } else {
      loginButton.style.display = 'block';
      signupButton.style.display = 'block';
      logoutButton.style.display = 'none';
  }