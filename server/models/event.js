const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  userId: String,
  eventId: Number,
  address: String,
  lat: Number,
  lng: Number,
  breed: String,
  time: String,
  noParticipants: Number,
  dogId: String,
  intro: String,
});

// compile model from schema
module.exports = mongoose.model("event", EventSchema);