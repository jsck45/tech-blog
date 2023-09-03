const express = require('express');
const router = express.Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
  try {
      const posts = await Post.findAll(); 

      res.render('homepage', { posts });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/profile', async (req, res) => {
  const isAuthenticated = req.session.logged_in;

  if (isAuthenticated) {
    try {
      const userId = req.session.user.id;
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Post,
            order: [['createdAt', 'DESC']], // Order posts by creation date (latest first)
          },
        ],
      });
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