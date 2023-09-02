const express = require('express');
const router = express.Router();

// Define a route to render the main.handlebars template
router.get('/', (req, res) => {
    res.render('main');
});

module.exports = router;
