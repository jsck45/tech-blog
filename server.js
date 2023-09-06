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

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main', // Assuming 'main' is the layout in 'views/layouts'
    layoutsDir: path.join(__dirname, 'views/layouts'), // Specify the correct path
    partialsDir: path.join(__dirname, 'views/partials'), // If you have partials
  })
);
app.set('view engine', 'handlebars');

// Set up the session middleware to use the SequelizeStore.
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use('/', router);

// Add this line to log incoming requests
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

// Start the server
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  })
  .catch((error) => {
    console.error('Database synchronization error:', error);
  });
