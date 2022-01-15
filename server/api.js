/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Dog = require("./models/dog");
const Participant = require("./models/participant");
const Event = require("./models/event");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/user", (req, res) => {
  const NewUser = new User({
    name: req.name,
    googleid: req.googleid,
    profilePic: req.profilePic,
    bio: req.bio,
    contact: req.contact,
  });

  NewUser.save().then((user) => res.send(user));
});

router.get("/user", (req, res) => {
<<<<<<< HEAD
  User.findById(req.user._id).then((user) => {
=======
  console.log(req.query.userid);
  User.find({'googleid': req.query.userid}).then((user) => {
>>>>>>> 30ff66b0e4d3685352bcd2f2c8259609ca8bbca1
    res.send(user);
  });
});

router.delete("/deleteUser", (req, res) => {
  User.deleteOne({'googleid': req.query.googleid});
});

router.post("/event", (req, res) => {
  Event.find({}).then((events) => {
    eventsLength = events.length;
    const NewEvent = new Event({
      eventId: eventsLength,
      location: req.body.location,
      breed: req.body.breed,
      time: req.body.time,
      noParticipants: req.body.noParticipants,
      dogId: req.body.dogId,
      intro: req.body.intro,
    });

    NewEvent.save().then((event) => res.send(event));
  });
});

router.get("/event", (req, res) => {
  Event.find({}).then((event) => res.send(event));
});

router.post("/deleteEvent", (req, res) => {
  Event.deleteOne({eventId: req.body.eventId});
});

router.get("/singleevent", (req, res) => {
  Event.find({_id: req.query.eventId}).then((event) => res.send(event));
});

router.post("/participant", (req, res) => {
  const NewParticipant = new Participant({
    participantId: req.body.participantId,
    eventId: req.body.eventId,
    participant_name: req.body.participant_name,
  });

  NewParticipant.save().then((participant) => res.send(participant));
});

router.get("/participant", (req, res) => {
  Participant.find({participantId: req.query.participantId}).then((participant) => res.send(participant));
});

router.post("/deleteParticipant", (req, res) => {
  Participant.find({participantId: req.query.participantId});
});

router.get("/participants", (req, res) => {
  Participant.find({eventId: req.query.eventId}).then((participant) => {
    res.send(participant);
  });
});

router.post("/dog", (req, res) => {
  const NewDog = new Dog({
    dogId: req.dogId,
    breed: req.breed,
    dogPic: req.dogPic,
    ownerId: req.ownerId,
    bio: req.bio,
  });

  NewDog.save().then((dog) => res.send(dog));
});

router.get("/dog", (req, res) => {
  Dog.find({}).then((dog) => res.send(dog));
});

router.post("/deleteDog", (req, res) => {
  Dog.find({dogId: req.query.dogId});
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
