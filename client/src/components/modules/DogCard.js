import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
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
 * @param {string} dogPic
 */
const DogCard = (props) => {
  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  //   const addNewComment = (commentObj) => {
  //     setComments(comments.concat([commentObj]));
  //   };

  const HandleDeleteDog = () => {
    post("/api/deleteDog", { dogId: props.dogId }).then((dog) => {
      console.log(dog);
    });
    window.location.reload();
  };

  let url = "https://drive.google.com/uc?id=" + props.dogPic;

  return (
    <div className="subContainer ">
      <div className="SingleDog">
        <div className="subContainer u-textCenter">
          <img src={url} alt="image" className="dogImage" />
        </div>
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
        <div className="subContainer u-textCenter">
          <h4 className="Profile-subTitle">Dog Id:</h4>
          <div id="profile-description">{props.dogId}</div>
        </div>
        <button type="delete" value="Delete" className="deleteButton" onClick={HandleDeleteDog}>
          Delete Dog
        </button>
      </div>
    </div>
  );
};

export default DogCard;
