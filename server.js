const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path');

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

// Instead of body-parser we use now the express built in module for parsing bodies
app.use(express.json());

app.get('/', (req, res) => {
 res.send('Hello There');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
 console.log(
  `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
   .yellow.bold
 )
);
