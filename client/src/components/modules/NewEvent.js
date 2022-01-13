import React, { useState } from "react";
import Filter from "./Filter.js";
import "./NewEvent.css";
import moment from 'moment';
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {({location, breed, time, intro}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewEventInput = (props) => {
    // const [location, setLocation] = useState(""); waiting for Google map API integration
    const [breed, setBreed] = useState(null);
    const [selectedDate, setDate] = useState(null);
    const [location, setLocation] = useState(null);
  
    const changeBreed = (event) => {
      setBreed(event.target.value);
    };
  
    const changeDate = (date) => {
      setDate(moment(date).format("MMMM Do YYYY"));
    }

    const changeLocation = (event) => {
        setLocation(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(value);
        setValue("");
    };

    return (
        <div>
            <Filter changeBreed={changeBreed} changeDate={changeDate} changeLocation={changeLocation}/>
            <p>The event is on {selectedDate} at {location} with a {breed}.</p>
        </div>
    );
};

export default NewEventInput