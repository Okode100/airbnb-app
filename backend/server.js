const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv'); // Import dotenv for environment variables
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

dotenv.config(); // Load environment variables

// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Use environment variable for host
  user: process.env.DB_USER, // Use environment variable for user
  password: process.env.DB_PASSWORD, // Use environment variable for password
  database: process.env.DB_NAME // Use environment variable for database
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

// Middleware for parsing JSON requests
app.use(express.json());

// Define the root route
app.get('/', (req, res) => {
  res.send('Welcome to the Airbnb app API!');
});

// Route to fetch users
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
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    });
  });
});

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).send('Invalid token');
    req.user = decoded;
    next();
  });
};

// Protect a route, for example, to get user data
app.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Welcome to your profile!', user: req.user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
