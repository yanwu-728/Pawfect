import React, { useState } from "react";
import Filter from "./Filter.js";
import "./NewEvent.css";
import moment from 'moment';
import {get, post} from "../../utilities.js";
import "react-datepicker/dist/react-datepicker.css";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {(location, breed, selectedDate, noParticipants, dogId, intro) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewEventInput = (props) => {
    // const [eventId, setEventId] = useState(null);
    const [location, setLocation] = useState("[location]");
    const [breed, setBreed] = useState("[breed]");
    const [selectedDate, setDate] = useState("[date]");
    const [noParticipants, setNoParticipants] = useState(0);
    const [dogId, setDogId] = useState("0");
    const [intro, setIntro] = useState("");

    // const changeEventId = (value) => {
    //     setEventId(value);
    // }

    const changeLocation = (event) => {
        setLocation(event.target.value);
    }

    const changeBreed = (event) => {
        setBreed(event.target.value);
    }
  
    const changeDate = (date) => {
        setDate(moment(date).format());
    }

    const changeNoParticipant = (event) => {
        setNoParticipants(event.target.value);
    }

    const changeDogId = (event) => {
        setDogId(event.target.value);
    }

    const changeIntro = (event) => {
        setIntro(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(location, breed, selectedDate, noParticipants, dogId, intro);
        setLocation("[location]");
        setBreed("[breed]");
        setDate("[date]");
        setNoParticipants(0);
        setDogId("[dog id]");
        setIntro("");
    };

    return (
        <div>
            <Filter changeBreed={changeBreed} changeDate={changeDate} changeLocation={changeLocation}/>
            <p>Please enter the number of participants: </p>
            <input 
                type="number"
                min="1"
                value={noParticipants}
                onChange={changeNoParticipant}
            />
            <p>Please enter the id of your dog: </p>
            <input 
                type="text"
                value={dogId}
                onChange={changeDogId}
            />
            <p>Please enter description:</p>
            <input
                type="text"
                placeholder= {props.defaultText}
                value={intro}
                onChange={changeIntro}
            />
            <p>The event is on {selectedDate} at {location} with a {breed} of id {dogId}. Currently, you have {noParticipants} participant(s). </p>
            <p>Description: {intro}</p>
            <button
                type="submit"
                value="Submit"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};

/**
 * New Event is a New Event Input component for events
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */

const NewEvent = (props) => {
    const addEvent = (location, breed, selectedDate, noParticipants, dogId, intro) => {
        const body = { 
            location: location,
            breed: breed,
            time: selectedDate,
            noParticipants: noParticipants,
            dogId: dogId,
            intro: intro
        };
        
        post("/api/event", body);
    };
    
    return <NewEventInput defaultText="Enter Text Here" onSubmit={addEvent} />;
};

export { NewEventInput, NewEvent }