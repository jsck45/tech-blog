const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/profile', (req, res) => {
  const isAuthenticated = req.session.logged_in;

  if (isAuthenticated) {
    res.render('profile');
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

module.exports = router;