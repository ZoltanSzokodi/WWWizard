const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');

// Load env variables from the config.env file
dotenv.config({ path: './config/config.env' });

// Initialize express application
const app = express();

// Connect to DB
connectDB();

// Use morgan middleware for logging requests in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Cookie parser middleware
app.use(cookieParser());

// Instead of body-parser we use now the express built in module for parsing bodies
app.use(express.json());

// Define routes
const profile = require('./routes/profile');
const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/posts');

app.use('/api/v1/profile', profile);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/posts', posts);

// Add custom error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(`DB ERROR: ${error.message}`.red.bold);
  // Close server and exit process
  server.close(() => process.exit(1));
});
