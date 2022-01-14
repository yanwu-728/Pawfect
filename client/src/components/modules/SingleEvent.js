import React from "react";
import { Link } from "@reach/router";

/**
 * Event is a component that renders creator and content of an event
 * 
 * Proptypes
 * @param {string} eventId of the event
 * @param {string} location
 * @param {string} breed
 * @param {Date} selectedDate 
 * @param {number} noParticipants
 * @param {string} dogId 
 * @param {string} intro
 */

 const SingleEvent = (props) => {
    return (
      <div>
        <p>There is an event on {props.selectedDate} at {props.location} with a {props.breed} of id {props.dogId}. Currently, you have {props.noParticipants} participant(s). </p>
        <p>Description: {props.intro}</p>
      </div>
    );
  };
  
  export default SingleEvent;