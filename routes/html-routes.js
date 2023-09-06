const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

router.get('/', postController.getAllPosts);
router.get('/profile', postController.getProfile);
router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/signup', (req, res) => {
  res.render('signup');
});
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
