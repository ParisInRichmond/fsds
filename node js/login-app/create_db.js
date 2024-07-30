const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('userdata.db');

const username = 'testuser';
const password = 'testpassword';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error(err.message);
        return;
    }

    db.run('INSERT INTO userdata (username, password) VALUES (?, ?)', [username, hash], (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('User created successfully');
        db.close();
    });
});
