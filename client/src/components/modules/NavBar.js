import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

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
          Find a Dog!
        </Link>
        <Link to="/MySchedule/" className="NavBar-link">
          My Schedule
        </Link>
        <Link to="/profile/" className="NavBar-link">
          Profile
        </Link>
      </div>
    </nav>
    </div>
    
  );
};

export default NavBar;
