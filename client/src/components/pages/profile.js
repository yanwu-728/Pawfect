import React, { useState, useEffect } from "react";
//import CatHappiness from "../modules/CatHappiness.js";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import DogCard from "../modules/DogCard.js";

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState();
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    document.title = "Profile Page";
    console.log(props.userId);
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));

    get("/api/dog", { ownerId: props.userId }).then((dogs) => {
      setDogs(dogs);
    });
  }, []);

  let dogsList = null;
  console.log(dogs.length);
  const hasDogs = dogs.length !== 0;

  if (!user) {
    return <div> Loading! </div>;
  }
  if (hasDogs) {
    dogsList = dogs.map((dogObj) => (
      <DogCard
        // key={`Card_${dogObj._id}`}
        dogId={dogObj.dogId}
        dogName={dogObj.name}
        breed={dogObj.breed}
        ownerId={dogObj.ownerId}
        dogBio={dogObj.bio}
      />
    ));
  } else {
    dogsList = <div>No dogs!</div>;
  }
  return (
    <>
      {/* <div className="Profile-avatarContainer">
        <div className="Profile-avatar" />
      </div> */}
      <h1 className="Profile-name u-textCenter">{user.name}</h1>
      <Link className="u-editUser" to="/editUser/">
        Edit User Profile
      </Link>
      <hr className="Profile-linejj" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About me:</h4>

          <div id="profile-description">{user.bio}</div>
        </div>

        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">Contact:</h4>
          <div id="contact">{user.contact}</div>
        </div>
      </div>
      <hr className="Profile-line" />
      <div className="u-flex">
        <h4 className="Profile-subTitle">Your Dogs:</h4>
        {dogsList}
        <Link className="u-editUser" to="/addDog/">
          Click to add your dogs!
        </Link>
      </div>
    </>
  );
};

export default Profile;
