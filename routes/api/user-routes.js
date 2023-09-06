const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const { withAuth, comparePasswords } = require('../../middleware/authMiddleware');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    console.log('All users:', users); // Add this console log

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});
router.post('/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log('Hashed password:', hashedPassword);
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    console.log('New user created:', newUser);

    // Set session variables to indicate that the user is logged in
    req.session.logged_in = true;
    req.session.user = { id: newUser.id, username: newUser.username };

    // Redirect the user to the profile page
    res.redirect('/profile');
  } catch (err) {
    console.error('Error during user creation:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Login route
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
      res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log in' });
  }
});


// Update a user
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedUser[0] === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: { id: req.params.id },
    });
    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
