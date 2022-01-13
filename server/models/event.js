const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventId: String,
  location: String,
  breed: String,
  time: Date,
  noParticipants: Integer,
  dogId: String,
  intro: String,
});

// compile model from schema
module.exports = mongoose.model("event", EventSchema);