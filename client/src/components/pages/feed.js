import React, { useState, useEffect, useRef } from "react";
// import Card from "../modules/Card.js";
// import { NewStory } from "../modules/NewPostInput.js";
import DogCard from "../modules/DogCard.js";
import { get } from "../../utilities";
import "./feed.css";
import SlideShow from "../modules/SlideShow.js";

const Feed = (props) => {
  const [user, setUser] = useState();
  const [allDogs, setAllDogs] = useState([]);

  useEffect(() => {
    document.title = "Feed";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));

    get("/api/allDogs", {}).then((allDogs) => {
      setAllDogs(allDogs);
    });
  }, []);

  let allDogsList = null;

  allDogsList = allDogs.map((dogObj) => (
    // <div style={{ display: "block" }}>
    //   <DogCard
    //     dogId={dogObj.dogId}
    //     dogName={dogObj.name}
    //     breed={dogObj.breed}
    //     ownerId={dogObj.ownerId}
    //     dogBio={dogObj.bio}
    //     dogPic={dogObj.dogPic}
    //   />
    // </div>

    <div className="dogSlides" style={{ display: "block" }}>
      <div className="subContainer u-textCenter">
        <img
          src={"https://drive.google.com/uc?id=" + dogObj.dogPic}
          alt="image"
          className="dogImage"
        />
      </div>
      <div className="subContainer u-textCenter">
        <h4 className="Profile-subTitle">Dog name:</h4>
        <div id="profile-description">{dogObj.name}</div>
      </div>
      <div className="subContainer u-textCenter">
        <h4 className="Profile-subTitle">Dog breed:</h4>
        <div id="profile-description">{dogObj.breed}</div>
      </div>
      <div className="subContainer u-textCenter">
        <h4 className="Profile-subTitle">Dog bio:</h4>
        <div id="profile-description">{dogObj.bio}</div>
      </div>
    </div>
  ));

  var slideIndex = 1;
  console.log(allDogsList);

  const slideShow = () => {
    var i;
    var x = document.getElementsByClassName("dogSlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {
      slideIndex = 1;
    }
    x[slideIndex - 1].style.display = "block";
  };

  setInterval(function () {
    slideShow();
  }, 5000);

  if (!user) {
    return (
      <>
        
        {/* <div class="dogs" />; */}
        <p>
          <SlideShow userId={user}></SlideShow>
        </p>
        <p>
          <div class="welcome">
          <h2>Hi! Welcome to PAWFECT! </h2>
          <h4>Please log in first.</h4>
        </div>
        </p>
        
      </>
    );
  }
  return (
    <>
    <p>
      <SlideShow></SlideShow>
    </p>
      <p>
        <div class="welcome">
          <h2>Hi {user.name}! </h2>
          <h3>Welcome to PAWFECT!</h3>
          <h4>
            Please go to "Find a Dog!" page to see posted events or add your own on "My Schedule"
            page!
          </h4>
        </div>
        
      </p>
      {/* <div class="dogs" />; */}
      

    </>
  );
};

export default Feed;
