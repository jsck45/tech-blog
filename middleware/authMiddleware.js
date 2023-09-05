const bcrypt = require('bcrypt');

// Compare user-entered password with stored hashed password
const comparePasswords = async (enteredPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    console.log('Password comparison result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

// Authentication middleware
const withAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = {
  bcrypt,
  comparePasswords, // Export the comparePasswords function
  withAuth,
};
