import React, { useState, useEffect } from "react";
// import Card from "../modules/Card.js";
// import { NewStory } from "../modules/NewPostInput.js";
import DogCard from "../modules/DogCard.js";
import { get } from "../../utilities";
import "./feed.css";

const Feed = (props) => {
  const [user, setUser] = useState();

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "Feed";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
    return (
      <>
<<<<<<< HEAD
        <div className="welcome">
          <h2>Hi Welcome to PAWFECT! </h2>
          <h4>Please log in first.</h4>
=======
        <div>
          <h2 class="welcome">Hi! Welcome to PAWFECT! </h2>
          <h4 class="welcome">Please log in first.</h4>
>>>>>>> d487c173a308b1f66ad8255174f3f94b1135ecaf
        </div>
        <div class="dogs" />;
      </>
    );
  }
  return (
    <>
<<<<<<< HEAD
      <div className="welcome"> 
        <h2>Hi {user.name}! </h2>
        <h3>Welcome to PAWFECT!</h3>
        <h4>
=======
      <div>
        <h2 class="welcome">Hi {user.name}! </h2>
        <h3 class="welcome">Welcome to PAWFECT!</h3>
        <h4 class="welcome">
>>>>>>> d487c173a308b1f66ad8255174f3f94b1135ecaf
          Please go to "Find a Dog!" page to see posted events or add your own on "My Schedule"
          page!
        </h4>
      </div>
      <div class="dogs" />;
    </>
  );
};

export default Feed;
