const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')
// Similar to controller
const usersRoute = require('./routes/users');

// Connect to MongoDB database
// Config.database is the localhost url
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});

// Connection Success
mongoose.connection.on('conneection', () => {
    console.log(`Successfully connected to database: ${config.database}`);
});

// Connection Failure
mongoose.connection.on('err', (err) => {
    console.log(`Failed to connect to database: ${config.database}`);
    console.log(`Error: ${err}`)
});

// Initialize express
const app = express();

// Port number
const PORT = process.env.PORT || 5000;

// Express cors can also be used
app.use(cors());

// Set static folder. You can also call folder public
app.use(express.static(path.join(__dirname, 'client' )))

// Body Parser Middleware
app.use(express.json());

// Route middleware for users API
app.use('/users', usersRoute)

// Index route
app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
});

// Start server
app.listen(PORT, () => console.log("Server started on port: " + PORT));
