const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5692',
  database: 'airbnb_db'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

// Define a route to fetch users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// Define the root route
app.get('/', (req, res) => {
    res.send('Welcome to the Airbnb app API!');
  });
  // Route to create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  connection.query(query, [name, email], (err, results) => {
    if (err) {
      return res.status(500).send('Error creating user');
    }
    res.status(201).json({ id: results.insertId, name, email });
  });
});
// Route to get all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching users');
    }
    res.json(results);
  });
});
// Route to update a user's details
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  connection.query(query, [name, email, userId], (err, results) => {
    if (err) {
      return res.status(500).send('Error updating user');
    }
    res.json({ message: 'User updated successfully' });
  });
});
// Route to delete a user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Error deleting user');
    }
    res.json({ message: 'User deleted successfully' });
  });
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Route to login a user
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Error logging in');
    if (results.length === 0) return res.status(400).send('User not found');

    const user = results[0];

    // Compare password with hashed password in the database
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Error comparing passwords');
      if (!isMatch) return res.status(400).send('Incorrect password');

      // Generate a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    });
  });
});
const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(400).send('Invalid token');
    req.user = decoded;
    next();
  });
};

// Protect a route, for example, to get user data
app.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Welcome to your profile!', user: req.user });
});

    