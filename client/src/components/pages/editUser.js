import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./profile.css";

const editUser = (props) => {
  const [newName, setName] = useState("");
  const [newBio, setBio] = useState("");
  const [newContact, setContact] = useState("");
  const [newImage, setImage] = useState("");
  const keyword = "file/d/";
  const viewkey = "/view";

  // called whenever the user types in the new post input box
  const handleChange = () => {
    setName(document.getElementById("username").value);
    setBio(document.getElementById("bio").value);
    setContact(document.getElementById("contact").value);
    const url = document.getElementById("image").value;
    const secondhalf = url.slice(url.indexOf(keyword) + keyword.length);
    const imageid = secondhalf.substr(0, secondhalf.indexOf(viewkey));
    setImage(imageid);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    post("/api/editUser", {
      userid: props.userId,
      newName: newName,
      newBio: newBio,
      newContact: newContact,
      newImage: newImage,
    });
  };

  return (
    <div class="change">
      <h1>Edit User Profile</h1>
      <label>Enter username: </label>
      <input type="text" id="username" name="username" value={newName} onChange={handleChange} />
      <div />
      <label>Enter Bio: </label>
      <input type="text" id="bio" name="bio" value={newBio} onChange={handleChange} />
      <div />
      <label>Enter contact info: </label>
      <input type="text" id="contact" name="contact" value={newContact} onChange={handleChange} />
      <div />

      <label>Enter profile image google drive link: </label>
      <input type="text" id="image" name="image" value={newImage} onChange={handleChange} />
      <div />

      <a href="/profile">
        <button className="Profile-Links" type="submit" value="Submit" onClick={handleSubmit}>
          Submit
        </button>
      </a>
      {/* 
      <button>
        <Link to="/profile/">Back to Profile</Link>
      </button> */}
    </div>
  );
};

export default editUser;
