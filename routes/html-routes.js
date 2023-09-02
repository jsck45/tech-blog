const express = require('express');
const router = express.Router();
const { User } = require('../models'); 


router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/profile', async (req, res) => {
  const isAuthenticated = req.session.logged_in;

  if (isAuthenticated) {
    try {
      const userId = req.session.user.id;
      const user = await User.findByPk(userId);

      if (user) {
        res.render('profile', { user });
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.redirect('/login');
  }
});


router.get('/login', (req, res) => {
    res.render('login'); 
  });
  
router.get('/signup', (req, res) => {
  res.render('signup'); 
});

module.exports = router;