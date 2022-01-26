import React, { useState, useEffect } from "react";
//import CatHappiness from "../modules/CatHappiness.js";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import DogCard from "../modules/DogCard.js";

import "../../utilities.css";
import "./profile.css";
import "../modules/SingleEvent.css";

const Profile = (props) => {
  const [user, setUser] = useState();
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));

    get("/api/dog", { ownerId: props.userId }).then((dogs) => {
      setDogs(dogs);
    });
  }, [props.userId]);

  let dogsList = null;
  const hasDogs = dogs.length !== 0;

  if (!user) {
    return <div className="Profile-subTitle"> Please log in to view profile! </div>;
  }
  let url = "https://drive.google.com/uc?id=" + user.profilePic;
  if (hasDogs) {
    // var slideIndex = 0;

    dogsList = dogs.map((dogObj) => (
      <DogCard
        className="mySlides"
        dogId={dogObj.dogId}
        dogName={dogObj.name}
        breed={dogObj.breed}
        ownerId={dogObj.ownerId}
        dogBio={dogObj.bio}
        dogPic={dogObj.dogPic}
      />
    ));
  } else {
    dogsList = <div className="Profile-subTitle">No dogs!</div>;
  }
  return (
    <>
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <div>
            <img src={url} alt="image" className="Profile-image" />
          </div>
          <h1 className="Profile-name u-textCenter">{user.name}</h1>
          <h4 className="Profile-subTitle">About me:</h4>

          <div id="profile-description">{user.bio}</div>
          <h4 className="Profile-subTitle">Contact:</h4>
          <div id="contact">{user.contact}</div>
          <div className="editContainer">
            <Link className="Profile-Links profile-button" to="/editUser/">
              Edit User Profile
            </Link>
          </div>
        </div>
        <div className="dogSection">
          <div className="u-flex">
            <div>
              <h4 className="Profile-subTitle">Your Dogs:</h4>
            </div>

            <div className="dogList">{dogsList}</div>

            <Link to="/addDog/" className="profile-button">
              Add Dog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
