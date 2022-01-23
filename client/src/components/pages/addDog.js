import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./profile.css";

const addDog = (props) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [bio, setBio] = useState("");
  const [dogPic, setImage] = useState("");
  const keyword = "file/d/";
  const viewkey = "/view";

  // called whenever the user types in the new post input box

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changeBreed = (event) => {
    setBreed(event.target.value);
  };

  const changeBio = (event) => {
    setBio(event.target.value);
  };

  const changeImage = () => {
    const url = document.getElementById("image").value;
    const secondhalf = url.slice(url.indexOf(keyword) + keyword.length);
    const imageid = secondhalf.substr(0, secondhalf.indexOf(viewkey));
    setImage(imageid);
  };

  // const handleChange = () => {
  //   setName(document.getElementById("dogname").value);
  //   setBio(document.getElementById("bio").value);
  //   setBreed(document.getElementById("breed").value);
  // };

  // called when the user hits "Submit" for a new post
  const handleSubmit = () => {
    post("/api/dog", {
      ownerid: props.userId,
      dogname: name,
      breed: breed,
      dogbio: bio,
      dogPic: dogPic,
    }).then(submit);
  };

  // useEffect(()=>{
  //   console.log(name, breed, bio);
  // }, [name, breed, bio]);

  let options = require("../modules/breed_options.json");

  return (
    <div className="change">
      <h1>New Dog Profile:</h1>
      <label>Enter dog name: </label>
      <input type="text" id="dogname" name="dogname" value={name} onChange={changeName} />
      <div />

      <label>Select dog breed: </label>

      <label htmlFor="dog-breeds">Breed:</label>
      <datalist id="dog-breed" defaultValue="No Preference">
        {options.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </datalist>
      <input type="text" list="dog-breed" onChange={changeBreed} />

      <div />

      <label>Enter Bio: </label>
      <input type="text" id="bio" name="bio" value={bio} onChange={changeBio} />
      <div />

      <label>Enter dog image google drive link: </label>
      <input type="text" id="image" name="image" value={dogPic} onChange={changeImage} />
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

export default addDog;
