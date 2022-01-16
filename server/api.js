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
    name: req.body.name,
    googleid: req.body.googleid,
    profilePic: req.body.profilePic,
    bio: req.body.bio,
    contact: req.body.contact,
  });

  NewUser.save().then((user) => res.send(user));
});

router.get("/user", (req, res) => {
  // User.find({_id: req.query.userId}).then((user) => {
  //   res.send(user);
  // });
  console.log(req.user._id);
  User.findById(req.user._id).then((user) => {
    console.log(`user ${user}`);
    res.send(user);
  });
});

router.post("/event", (req, res) => {
  Event.find({}).then((events) => {
    if (events.length !== 0) {
      eventsLength = events[events.length-1].eventId + 1;
    } else {
      eventsLength = 0;
    };
    
    const NewEvent = new Event({
      userId: req.body.userId,
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

router.post("/deleteEvent", (req, res) => {
  Event.deleteOne({eventId: req.body.eventId});
});

router.get("/event", (req, res) => {
  Event.find({}).then((event) => res.send(event));
});

router.get("/singleevent", (req, res) => {
  Event.find({ _id: req.query.eventId }).then((event) => res.send(event));
});

router.get("/filteredevents", (req, res) => {
  const body = {};
  if (req.query.location !== "null"){
    body.location = req.query.location;
  };
  if (req.query.breed !== "null"){
    body.breed = req.query.breed;
  };
  if (req.query.time !== "null"){
    body.time = req.query.time;
  };
  Event.find(body).then((event) => res.send(event));
});

router.post("/participant", (req, res) => {
  Participant.findOne(
    { participantId: req.body.participantId, eventId: req.body.eventId },
    function (error, result) {
      console.log("called");
      if (!error) {
        if (result) {
          console.log("user already exists");
          res.send({});
        } else {
          const NewParticipant = new Participant({
            participantId: req.body.participantId,
            eventId: req.body.eventId,
            participant_name: req.body.participant_name,
          });
          NewParticipant.save().then((participant) => res.send(participant));
        }
      } else {
        console.log("error");
      }
    }
  );
});

router.get("/participant", (req, res) => {
  Participant.find({ participantId: req.query.participantId }).then((participant) =>
    res.send(participant)
  );
});

router.get("/participants", (req, res) => {
  Participant.find({ eventId: req.query.eventId }).then((participant) => {
    res.send(participant);
  });
});

router.get("/participating", (req, res) => {
  Participant.findOne(
    { participantId: req.query.userId, eventId: req.query.eventId },
    function (error, result) {
      console.log("called");
      if (!error) {
        if (result) {
          console.log("user already signed up");
          res.send(result);
        } else {
          console.log("not signed up")
          res.send({});
        }
      } else {
        console.log("error");
      }
    }
  );
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
  Dog.find({ ownerId: req.query.ownerId }).then((dogs) => res.send(dogs));
});

router.post("/editUser", (req, res) => {
  console.log(req);
  User.findById(req.body.userid).then((user) => {
    console.log(user);
    user.name = req.body.newName;
    user.bio = req.body.newBio;
    user.contact = req.body.newContact;
    // edit user
    user.save();
  });
  res.send({});
});

router.post("/addDog", (req, res) => {
  const NewDog = new Dog({
    name: req.body.dogname,
    dogId: "0",
    breed: req.body.breed,
    ownerId: req.body.ownerid,
    bio: req.body.dogbio,
  });

  NewDog.save().then((dog) => res.send(dog));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
