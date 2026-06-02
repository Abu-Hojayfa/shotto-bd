const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_shottobd_2026';

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role, nidNumber, isVerified, department, governmentId } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Additional validations for official
    if (role === 'official') {
      if (!department || !governmentId) {
        return res.status(400).json({ message: 'Department and Government ID are required for officials' });
      }
      // Check if governmentId is already taken
      const existingOfficial = await User.findOne({ governmentId, role: 'official' });
      if (existingOfficial) {
        return res.status(400).json({ message: 'Government ID already registered' });
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      nidNumber: role === 'citizen' ? nidNumber : undefined,
      isVerified: role === 'citizen' ? isVerified : true,
      department: role === 'official' ? department : undefined,
      governmentId: role === 'official' ? governmentId : undefined
    });

    await newUser.save();

    // Create token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isVerified: newUser.isVerified
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    try {
      require('fs').appendFileSync('error.log', `${new Date().toISOString()} - Registration error: ${error.message}\n${error.stack}\n\n`);
    } catch (e) {
      console.error('Failed to write to error.log:', e);
    }
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If role is specified and does not match, reject
    if (role && user.role !== role) {
      return res.status(403).json({ message: `Access denied. Not registered as ${role}.` });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        nidNumber: user.nidNumber,
        department: user.department,
        governmentId: user.governmentId
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    try {
      require('fs').appendFileSync('error.log', `${new Date().toISOString()} - Login error: ${error.message}\n${error.stack}\n\n`);
    } catch (e) {
      console.error('Failed to write to error.log:', e);
    }
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
