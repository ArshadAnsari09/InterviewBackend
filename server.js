const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./src/config/dbConfig');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});