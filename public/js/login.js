// public/js/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          // Redirect to a new page or display a success message
          window.location.href = '/profile'; // Replace with the URL you want to redirect to on successful login
        } else {
          const data = await response.json();
          // Display an error message to the user
          alert(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
  