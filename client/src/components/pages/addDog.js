import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";

import "../../utilities.css";

const addDog = (props) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [bio, setBio] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = () => {
    setName(document.getElementById("dogname").value);
    setBio(document.getElementById("bio").value);
    setBreed(document.getElementById("breed").value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    post("/api/addDog", {
      ownerid: props.userId,
      dogname: name,
      breed: breed,
      dogbio: bio,
    });
  };

  return (
    <div>
      <h1>New Dog Profile:</h1>
      <label>Enter dog name: </label>
      <input type="text" id="dogname" name="dogname" value={name} onChange={handleChange} />
      <div />

      <label>Select dog breed: </label>

      <select name="breed" id="breed">
        <option value="Golden Retriever">Golden Retriever</option>
        <option value="Labrador">Labrador</option>
        <option value="Shiba Inu">Shiba Inu</option>
        <option value="Corgi">Corgi</option>
        <option value="Other">Other</option>
      </select>

      <div />

      <label>Enter Bio: </label>
      <input type="text" id="bio" name="bio" value={bio} onChange={handleChange} />
      <div />

      <button type="submit" value="Submit" onClick={handleSubmit}>
        Submit
      </button>

      <button>
        <Link to="/profile/">Back to Profile</Link>
      </button>
    </div>
  );
};

export default addDog;
