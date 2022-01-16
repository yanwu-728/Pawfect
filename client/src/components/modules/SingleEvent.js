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
 * @param {string} eventId of the event
 * @param {string} location
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
  };

  return (
    <div className='SingleEvent-event'>
      <li>Date: {moment(props.time).format('MMMM Do YYYY')} </li>
      <li>Location: {props.location}</li>
      <li>Breed: {props.breed}</li>
      <li>Number of Participants Allowed: {props.noParticipants}</li>
      <li>Note: {props.intro}</li>
      <button
        type="delete"
        value="Delete"
        className="NewEvent-button"
        onClick={HandleDelete}
      > 
      Delete 
      </button>
    </div>
  );
};

export default SingleEvent;