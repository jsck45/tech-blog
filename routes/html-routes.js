const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/profile', (req, res) => {
  const isAuthenticated = req.session.logged_in;

  if (isAuthenticated) {
    res.render('dashboard');
  } else {
    res.redirect('login');
  }
});

router.get('/login', (req, res) => {
    res.render('login'); 
  });
  
router.get('/signup', (req, res) => {
  res.render('signup'); 
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        const errorMessage = 'Failed to log out';
        const confirmation = window.confirm(errorMessage);
  
        if (confirmation) {
          res.redirect('/');
        }
      } else {
        res.redirect('/');
      }
    });
  });

module.exports = router;