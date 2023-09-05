const { User } = require('../models');
const bcrypt = require('bcrypt'); 

module.exports = {
  // getAllUsers: async (req, res) => {
  //   try {
  //     const users = await User.findAll();
  //     res.json(users);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ error: 'Failed to retrieve user' });
  //   }
  // },

  getUserById: async (req, res) => {
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
  },

  createUser: async (req, res) => {
    try {
      console.log('Received signup request:', req.body); // Log the request body
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      console.log('Hashed password:', hashedPassword); // Log the hashed password
  
      const newUser = await User.create({
        username: req.body.username,
        password: hashedPassword,
      });
  
      console.log('New user created:', newUser); // Log the new user object
  
      res.status(201).json(newUser);
    } catch (err) {
      console.error('Error during user creation:', err); // Log any errors
      res.status(500).json({ error: 'Failed to create user' });
    }
  },
  

  // updateUser: async (req, res) => {
  //   try {
  //     const updatedUser = await User.update(req.body, {
  //       where: { id: req.params.id },
  //     });
  //     if (updatedUser[0] === 0) {
  //       res.status(404).json({ error: 'User not found' });
  //     } else {
  //       res.status(200).json({ message: 'User updated successfully' });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ error: 'Failed to update user' });
  //   }
  // },

  // deleteUser: async (req, res) => {
  //   try {
  //     const deletedUser = await User.destroy({
  //       where: { id: req.params.id },
  //     });
  //     if (!deletedUser) {
  //       res.status(404).json({ error: 'User not found' });
  //     } else {
  //       res.status(204).end();
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ error: 'Failed to delete user' });
  //   }
  // },

  loginUser: async (req, res) => {
    console.log('Received login request:', req.body);
  
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        req.session.user = user;
        // Redirect to the profile page after successful login
        return res.redirect('/profile');
      } else {
        return res.status(401).json({ error: 'Invalid password' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
    }
  },
  

  logoutUser: (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Logout failed' });
    }
  },
};