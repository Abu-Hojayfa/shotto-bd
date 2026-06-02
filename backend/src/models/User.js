const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['citizen', 'official'],
    default: 'citizen'
  },
  // Citizen-specific fields
  nidNumber: {
    type: String,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  // Official-specific fields
  department: {
    type: String,
    trim: true
  },
  governmentId: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
