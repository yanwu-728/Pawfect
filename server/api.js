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
  // console.log(req.user._id);
  User.findById(req.user._id).then((user) => {
    // console.log(`user ${user}`);
    res.send(user);
  });
});

router.post("/event", (req, res) => {
  Event.find({}).then((events) => {
    if (events.length !== 0) {
      eventsLength = events[events.length - 1].eventId + 1;
    } else {
      eventsLength = 0;
    }

    const NewEvent = new Event({
      userId: req.body.userId,
      eventId: eventsLength,
      address: req.body.address,
      lat: req.body.lat,
      lng: req.body.lng,
      breed: req.body.breed,
      time: req.body.time,
      noParticipants: req.body.noParticipants,
      dogId: req.body.dogId,
      intro: req.body.intro,
    });

    NewEvent.save().then((event) => res.send(event));
  });
});

router.post("/deleteEvent", auth.ensureLoggedIn, async (req, res) => {
  await Event.deleteOne(req.body);
});

router.get("/event", (req, res) => {
  Event.find({}).then((event) => res.send(event));
});

router.get("/singleevent", (req, res) => {
  Event.find({ _id: req.query.eventId }).then((event) => res.send(event));
});

router.get("/filteredevents", (req, res) => {
  const body = {};
  if (req.query.breed !== "null") {
    body.breed = req.query.breed;
  }
  // if (req.query.time !== "null") {
  //   body.time = req.query.time;
  // }
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
    { participantId: req.query.participantId, eventId: req.query.eventId },
    function (error, result) {
      console.log("called");
      if (!error) {
        if (result) {
          console.log("user already signed up");
          res.send(result);
        } else {
          console.log("not signed up");
          res.send({});
        }
      } else {
        console.log("error");
      }
    }
  );
});

router.post("/deleteparticipant", auth.ensureLoggedIn, async (req, res) => {
  await Participant.deleteOne(req.body);
});

// router.post("/dog", (req, res) => {
//   const NewDog = new Dog({
//     dogId: dogsLength,
//     breed: req.breed,
//     dogPic: req.dogPic,
//     ownerId: req.ownerId,
//     bio: req.bio,
//   });

//   NewDog.save().then((dog) => res.send(dog));
// });

router.get("/dog", (req, res) => {
  if (req.query.ownerId){
    Dog.find({ ownerId: req.query.ownerId }).then((dogs) => res.send(dogs));
  }else{
    Dog.find({}).then((dogs) => res.send(dogs));
  }
});
router.get("/allDogs", (req, res) => {
  Dog.find({}).then((dogs) => res.send(dogs));
});

router.post("/editUser", (req, res) => {
  console.log(req);
  User.findById(req.body.userid).then((user) => {
    console.log(user);
    user.name = req.body.newName;
    user.bio = req.body.newBio;
    user.contact = req.body.newContact;
    user.profilePic = req.body.newImage;
    // edit user
    user.save();
  });
  res.send({});
});

router.post("/dog", (req, res) => {
  Dog.find({}).then((dogs) => {
    if (dogs.length !== 0) {
      dogsLength = dogs[dogs.length - 1].dogId + 1;
    } else {
      dogsLength = 0;
    }
    const NewDog = new Dog({
      name: req.body.dogname,
      dogId: dogsLength,
      breed: req.body.breed,
      ownerId: req.body.ownerid,
      bio: req.body.dogbio,
      dogPic: req.body.dogPic,
    });

    NewDog.save().then((dog) => res.send(dog));
  });
});

router.post("/deleteDog", auth.ensureLoggedIn, async (req, res) => {
  await Dog.deleteOne(req.body);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
