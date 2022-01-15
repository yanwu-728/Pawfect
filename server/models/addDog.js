import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";

const editUser = (props) => {
  const [newName, setName] = useState("");
  const [newBio, setBio] = useState("");
  const [newContact, setContact] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = () => {
    setName(document.getElementById("username").value);
    setBio(document.getElementById("bio").value);
    setContact(document.getElementById("contact").value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    post("/editUser", {
      userid: props.userId,
      newName: newName,
      newBio: newBio,
      newContact: newContact,
    });
  };

  return (
    <div>
      <h1>Edit User Profile</h1>
      <label for="cars">Enter username: </label>
      <input type="text" id="username" name="username" value={newName} onChange={handleChange} />
      <div />
      <label for="text">Enter Bio: </label>
      <input type="text" id="bio" name="bio" value={newBio} onChange={handleChange} />
      <div />
      <label for="contact">Enter contact info: </label>
      <input type="text" id="contact" name="contact" value={newContact} onChange={handleChange} />
      <div />
      <button type="submit" value="Submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default editUser;