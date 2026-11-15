const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['lost', 'found'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    description: {
      type: String,
    },
    secret: {
      type: String, // Secret verification feature (hidden from public view)
    },
    prn: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Base64 or Image URL
    },
    status: {
      type: String,
      enum: ['active', 'claimed', 'resolved'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);