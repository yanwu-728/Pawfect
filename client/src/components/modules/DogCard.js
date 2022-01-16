import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import "./DogCard.css";

// import "./Card.css";

/**
 * Card is a component for displaying a dog info
 *
 * Proptypes
 * @param {string} dogId of the dog
 * @param {string} dogName
 * @param {string} breed
 * @param {string} ownerId
 * @param {string} dogBio
 */
const DogCard = (props) => {
  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  //   const addNewComment = (commentObj) => {
  //     setComments(comments.concat([commentObj]));
  //   };

  return (
    <div className="subContainer">
      <div className="SingleDog">
        <div className="subContainer u-textCenter">
          <h4 className="Profile-subTitle">Dog name:</h4>
          <div id="profile-description">{props.dogName}</div>
        </div>
        <div className="subContainer u-textCenter">
          <h4 className="Profile-subTitle">Dog breed:</h4>
          <div id="profile-description">{props.breed}</div>
        </div>
        <div className="subContainer u-textCenter">
          <h4 className="Profile-subTitle">Dog bio:</h4>
          <div id="profile-description">{props.dogBio}</div>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
