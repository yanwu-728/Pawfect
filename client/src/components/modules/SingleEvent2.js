import React from "react";
import { Link } from "@reach/router";
import moment from 'moment';
import './SingleEvent2.css';
import './NewEvent.css';
import {get, post} from "../../utilities.js";

/**
 * Event is a component that renders creator and content of an event
 * 
 * Proptypes
 * @param {string} eventId of the event
 * @param {string} location
 * @param {string} breed
 * @param {String} time
 * @param {number} noParticipants
 * @param {string} dogId 
 * @param {string} intro
 */


 const SingleEvent2 = (props) => {

    return (
      <div class='SingleEvent-event'>
        <li>Date: {moment(props.time).format('MMM Do YYYY')} </li>
        <li>Location: {props.location}</li>
        <li>Breed: {props.breed}</li>
        <li>Number of Participants Allowed: {props.noParticipants}</li>
        <li>Note: {props.intro}</li>
      </div>
    );
  };
  
  export default SingleEvent2;