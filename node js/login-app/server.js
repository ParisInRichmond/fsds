const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3333;

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Connect to the SQLite database
const db = new sqlite3.Database('userdata.db');

// Handle the form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Retrieve the user from the database
    db.get('SELECT * FROM userdata WHERE username = ?', [username], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (row) {
            // Compare the hashed password
            bcrypt.compare(password, row.password, (err, result) => {
                if (result) {
                    res.send('Login Successfully!');
                } else {
                    res.send('Login Failed!');
                }
            });
        } else {
            res.send('Login Failed!');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
