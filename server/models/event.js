const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventId: Number,
  location: String,
  breed: String,
  time: Date,
  noParticipants: Number,
  dogId: String,
  intro: String,
});

// compile model from schema
module.exports = mongoose.model("event", EventSchema);