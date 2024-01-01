// Import necessary modules
var createError = require('http-errors'); // Used for creating HTTP error objects
var express = require('express'); // The Express.js framework
var path = require('path'); // For working with file and directory paths
var cookieParser = require('cookie-parser'); // For parsing cookies in HTTP requests
var logger = require('morgan'); // Used for logging HTTP requests and responses

// Import route handlers (assuming they are defined in separate files)
var indexRouter = require('./routes/index'); // Handles requests at the root path
var usersRouter = require('./routes/users'); // Handles requests at the '/users' path
var formulasRouter = require('./routes/formulas');
var circlesRouter = require('./routes/circles');
var formulasRouter = require('./routes/formulas');
var squaresRouter = require('./routes/squares');

// Create an instance of the Express application
var app = express();

// Configure the view engine for rendering HTML templates
app.set('views', path.join(__dirname, 'views')); // Set the 'views' directory
app.set('view engine', 'ejs'); // Set the view engine to 'ejs' for rendering dynamic content

// Set up various middleware to process incoming requests
app.use(logger('dev')); // Set up request logger middleware in 'dev' format
app.use(express.json()); // Middleware for parsing JSON data in requests
app.use(express.urlencoded({ extended: false })); // Middleware for parsing URL-encoded data
app.use(cookieParser()); // Middleware for parsing cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Define routes and associate them with route handlers
app.use('/', indexRouter); // Use the 'indexRouter' for requests to the root path ('/')
app.use('/users', usersRouter); // Use the 'usersRouter' for requests to the '/users' path
app.use('/formulas', formulasRouter);
app.use('/circles', circlesRouter);
app.use('/squares', squaresRouter);

// Middleware to handle 404 errors (requests for routes that don't exist)
app.use(function(req, res, next) {
  // Forward a 404 error to the error handling middleware
  next(createError(404));
});

// Error handling middleware for handling all errors
app.use(function(err, req, res, next) {
  // Set locals for rendering the error page
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Set the response status code based on the error status or default to 500 (Internal Server Error)
  res.status(err.status || 500);

  // Render an error page (specified by 'error' in 'views' directory)
  res.render('error');
});

// Export the Express application for use in other parts of the application
module.exports = app;