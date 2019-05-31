const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// - status
// - 1 = open
// - 2 = closed

const TicketsSchema = new Schema({
  email: { type: String, required: true, unique: false, lowercase: true },
  name: { type: String, required: true, unique: false, lowercase: true },
  problem_description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: Number, default: 1 }
});

module.exports = mongoose.model('Tickets', TicketsSchema);