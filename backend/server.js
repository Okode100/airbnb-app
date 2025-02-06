require('dotenv').config(); // Load environment variables
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

// **User Registration**
app.post('/register', (req, res) => {
  const { name, email, password, phone, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const sql = 'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, hashedPassword, phone, role], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  });
});

// **User Login**
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'User not found' });
    
    const user = results[0];
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  });
});

// **Get All Properties**
app.get('/properties', (req, res) => {
  const sql = 'SELECT * FROM properties';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// **Get Property by ID**
app.get('/properties/:id', (req, res) => {
  const sql = 'SELECT * FROM properties WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Property not found' });
    res.json(results[0]);
  });
});

// **Create a New Property**
app.post('/properties', (req, res) => {
  const { user_id, title, description, location, price_per_night, max_guests, image_url } = req.body;
  
  const sql = 'INSERT INTO properties (user_id, title, description, location, price_per_night, max_guests, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [user_id, title, description, location, price_per_night, max_guests, image_url], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Property added successfully', propertyId: result.insertId });
  });
});

// **Book a Property**
app.post('/bookings', (req, res) => {
  const { user_id, property_id, check_in, check_out, total_price } = req.body;
  
  const sql = 'INSERT INTO bookings (user_id, property_id, check_in, check_out, total_price, status) VALUES (?, ?, ?, ?, ?, "pending")';
  db.query(sql, [user_id, property_id, check_in, check_out, total_price], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Booking successful', bookingId: result.insertId });
  });
});

// **Process a Payment**
app.post('/payments', (req, res) => {
  const { booking_id, user_id, amount, payment_method, transaction_id } = req.body;
  
  const sql = 'INSERT INTO payments (booking_id, user_id, amount, payment_method, status, transaction_id) VALUES (?, ?, ?, ?, "completed", ?)';
  db.query(sql, [booking_id, user_id, amount, payment_method, transaction_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Payment successful', paymentId: result.insertId });
  });
});

// **Start Server**
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
