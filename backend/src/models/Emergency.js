const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  userName: {
    type: String,
    default: 'Anonymous'
  },
  userEmail: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true,
    default: '🚨 EMERGENCY ALERT: Immediate assistance required.'
  },
  description: {
    type: String,
    required: false
  },
  type: {
    type: String,
    default: 'Extortion / SOS Panic Alert'
  },
  location: {
    type: mongoose.Schema.Types.Mixed,
    default: () => ({
      latitude: null,
      longitude: null,
      address: 'Location unavailable'
    })
  },
  status: {
    type: String,
    enum: ['active', 'acknowledged', 'resolved'],
    default: 'active'
  },
  acknowledgedBy: {
    type: String,
    default: null
  },
  reportedAt: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Emergency', emergencySchema);
