const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import the router from the routes folder
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

// Set up Handlebars as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up the session middleware to use the SequelizeStore.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false, // Change to true for production with HTTPS
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Use the router object
console.log('Defining routes...');

app.use('/', router);

console.log('Routes defined.');


// Add this line to log incoming requests
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});