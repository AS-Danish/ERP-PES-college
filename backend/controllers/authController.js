const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../database/databaseConfig');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// POST /api/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const rows = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0)
      return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '9d' }
    );

    res.json({ message: 'Login successful', token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// POST /api/register
exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, role } = req.body;

    if (!first_name || !last_name || !email || !password)
      return res.status(400).json({ message: 'First name, last name, email and password required' });

    // check duplicate email
    const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0)
      return res.status(400).json({ message: 'Email already registered' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user
    const result = await query(
      `INSERT INTO users (first_name, last_name, email, password, phone, role) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, hashedPassword, phone || null, role || 'student']
    );

    const userId = result.insertId;

    // sign token
    const token = jwt.sign(
      { id: userId, email, role: role || 'student' },
      JWT_SECRET,
      { expiresIn: '9d' }
    );

    res.status(201).json({ message: 'Registration successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};