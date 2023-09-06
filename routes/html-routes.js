const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'content', 'userId'],
    });

    const posts = postData.map((project) => project.get({ plain:true })
    );
    
    res.render('homepage', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});


// In your /profile route
router.get('/profile', async (req, res) => {

  const isAuthenticated = req.session.logged_in;

  if (isAuthenticated) {
    try {
      const userId = req.session.user.id;
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Post,
            order: [['createdAt', 'DESC']], 
          },
        ],
      });
      if (user) {
        const userPosts = user.posts.map((post) => post.get({ plain: true }));
        const authenticatedUser = req.session.user;

        console.log('User:', user.toJSON()); // Log the user data
        console.log('User posts:', user.posts);
        
        res.render('profile', { user: authenticatedUser, posts: userPosts });
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } 
  else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
    res.render('login'); 
  });
  
router.get('/signup', (req, res) => {
  res.render('signup'); 
});

// Handle user signup
router.post('/signup', async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      username,
      password: hashedPassword, // Store the hashed password
    });

    // Set session variables to indicate that the user is logged in
    req.session.logged_in = true;
    req.session.user = { id: newUser.id, username: newUser.username };


    console.log('User created:', newUser);
    console.log('Session after signup:', req.session); // Add this line

    // Redirect to the user's profile or another page
    res.redirect('/profile');

  } catch (err) {
    console.error('Error during user creation:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Handle user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // If the user is not found, respond with an error
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Use a function to compare the entered password with the hashed password in the database
    const isPasswordValid = await comparePasswords(password, user.password);

    // If the passwords do not match, respond with an error
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Set session variables to indicate that the user is logged in
    req.session.logged_in = true;
    req.session.user = { id: user.id, username: user.username };

    // Respond with a success message or redirect to the profile page
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log in' });
  }
});


module.exports = router;