import React from "react";
import { Link } from "@reach/router";
import moment from 'moment';
import './SingleEvent.css';
import './NewEvent.css';
import {get, post} from "../../utilities.js";

/**
 * Event is a component that renders creator and content of an event
 * 
 * Proptypes
 * @param {string} userId
 * @param {string} creatorId
 * @param {string} eventId of the event
 * @param {string} address
 * @param {string} breed
 * @param {Date} time
 * @param {number} noParticipants
 * @param {string} dogId 
 * @param {string} intro
 */

 const SingleEvent = (props) => {

  const HandleDelete = () => {
    post("/api/deleteEvent", {eventId: props.eventId}).then((event) => {
      console.log(event)
    });
    window.location.reload();
  };

  if (props.userId == props.creatorId) {
    return (
      <div className="SingleEvent-container">
        <div className='SingleEvent-event'>
          <div>Role: Host</div>
          <li>Date: {moment(props.time).format('MMM Do YYYY')} </li>
          <li>Location: {props.address}</li>
          <li>Breed: {props.breed}</li>
          <li>Number of Participants Allowed: {props.noParticipants}</li>
          <li>Note: {props.intro}</li>
          <hr className="SingleEvent-line"/>
        </div>
        <button
          type="delete"
          value="Delete"
          className="SingleEvent-button"
          onClick={HandleDelete}
        > 
          Delete 
        </button>
      </div>
    );
  } else {
    return (
      <div className="SingleEvent-container">
        <span className='SingleEvent-event'>
          <div>Role: Participant</div>
          <li>Date: {moment(props.time).format('MMM Do YYYY')} </li>
          <li>Location: {props.address}</li>
          <li>Breed: {props.breed}</li>
          <li>Number of Participants Allowed: {props.noParticipants}</li>
          <li>Note: {props.intro}</li>
          <hr className="SingleEvent-line"/>
        </span>
      </div>
    );
  }
  
};

export default SingleEvent;