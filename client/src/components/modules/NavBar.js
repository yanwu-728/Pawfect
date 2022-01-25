import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";
import small_paw from "../../public/small_paw.png";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "237465931636-l7hrgp68jl53ge364vo9h4qjq1ptasm6.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div>
      <a href="/">
        <div className="logo"></div>
        </a>
        <div className="paw"></div>

        <nav className="NavBar-container">
      {/* 
      <div className="NavBar-title u-inlineBlock">Pawfect</div> */}
      <div className="NavBar-linkContainer u-inlineBlock">
        {userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
        
        {/* <Link to="/" className="NavBar-link">
          Home
        </Link> */}
        {/* {userId && (
          <Link to={`/profile/${userId}`} className="NavBar-link">
            Profile
          </Link>
        )} */}
        {/* <div class="paw"></div> */}
        
        <Link to="/finddog/" className="NavBar-link">
          <img src= {small_paw} />
          Find a Dog!
        </Link>
        <Link to="/MySchedule/" className="NavBar-link">
          <img src= {small_paw} />
          My Schedule
        </Link>
        <Link to="/profile/" className="NavBar-link">
          <img src= {small_paw} />
          Profile
        </Link>
      </div>
    </nav>
    </div>
    
  );
};

export default NavBar;
