import React, { Component, useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";
import Filter from "../modules/Filter.js";
import moment from 'moment';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../../utilities.css";
import "./Skeleton.css";
import { Date } from "core-js";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "237465931636-o4q19fum61608nv3mh3r299u8d4hq5qp.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  const [breed, setBreed] = useState(null);
  const [selectedDate, setDate] = useState(null);

  const changeBreed = (event) => {
    setBreed(event.target.value);
  };

  const changeDate = (date) => {
    setDate(moment(date).format('MMMM Do YYYY, h:mm:ss a'));
  }

  return (
    <>
      {userId ? (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
          onFailure={(err) => console.log(err)}
        />
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
        />
      )}
      <Link to="/filter/" className="NavBar-link">
          Filter Test
      </Link>
      <h1>Good luck on your project :)</h1>
      <h2> What you need to change in this skeleton</h2>
      <ul>
        <li>
          Change the Frontend CLIENT_ID (Skeleton.js) to your team's CLIENT_ID (obtain this at
          http://weblab.to/clientid)
        </li>
        <li>Change the Server CLIENT_ID to the same CLIENT_ID (auth.js)</li>
        <li>
          Change the Database SRV (mongoConnectionURL) for Atlas (server.js). You got this in the
          MongoDB setup.
        </li>
        <li>Change the Database Name for MongoDB to whatever you put in the SRV (server.js)</li>
      </ul>
      <h2>How to go from this skeleton to our actual app</h2>
      <a href="http://weblab.to/get-started">Check out this getting started guide</a>

      <Filter changeBreed={changeBreed} changeDate={changeDate}/>
      <p>The selected breed is {breed}.</p>

      <p>The selected time is {selectedDate}</p>
    </>
  );
};

export default Skeleton;
