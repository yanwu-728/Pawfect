const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  dogId: Number,
  name: String,
  breed: String,
  dogPic: String,
  ownerId: String,
  bio: String,
});

// compile model from schema
module.exports = mongoose.model("dog", DogSchema);
