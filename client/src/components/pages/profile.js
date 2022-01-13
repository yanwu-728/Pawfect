import React, { useState, useEffect } from "react";
//import CatHappiness from "../modules/CatHappiness.js";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
    return <div> Loading! </div>;
  }
  return (
    <>
      <div className="Profile-avatarContainer">
        <div className="Profile-avatar" />
      </div>
      <h1 className="Profile-name u-textCenter">{user.name}</h1>
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
    </>
  );
};

export default Profile;
