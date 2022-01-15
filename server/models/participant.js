const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  participantId: String,
  eventId: String,
  participant_name: String,
});

// compile model from schema
module.exports = mongoose.model("participant", ParticipantSchema);