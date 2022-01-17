import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "237465931636-o4q19fum61608nv3mh3r299u8d4hq5qp.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <nav className="NavBar-container">
      <div class="logo"></div>
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
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        {/* {userId && (
          <Link to={`/profile/${userId}`} className="NavBar-link">
            Profile
          </Link>
        )} */}

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
  );
};

export default NavBar;
