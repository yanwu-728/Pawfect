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

    const handleReset = () => {
        setBreed("[breed]");
        setLocation("[location]");
        setDate("[date]");
        setNoParticipants(0);
        setDogId("0");
        setIntro("");
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        try{
            if (location !== "[location]" && breed !== "[breed]" && selectedDate !== "[date]") {
                props.onSubmit && props.onSubmit(location, breed, selectedDate, noParticipants, dogId, intro);
            } else {
                window.alert("Input Event Invalid!");
            }
            
        } catch (error) {
            window.alert("Input invalid");
            window.location.reload();
        }
        setLocation("[location]");
        setBreed("[breed]");
        setDate("[date]");
        setNoParticipants(0);
        setDogId("0");
        setIntro("");
    };

    return (
        <div>
            <div className="NewEvent-selector">
            <Filter  changeBreed={changeBreed} changeDate={changeDate} changeLocation={changeLocation}/>
            <div className="criteria">
                <p>Number of participants allowed: </p>
                <input 
                    type="number"
                    min="1"
                    value={noParticipants}
                    onChange={changeNoParticipant}
                />
                <p>ID of your dog: </p>
                <input 
                    type="text"
                    value={dogId}
                    onChange={changeDogId}
                />
                <p>Description:</p>
                <input
                    type="text"
                    placeholder= {props.defaultText}
                    value={intro}
                    onChange={changeIntro}
                />
                <p>The event is on {moment(selectedDate).format("MMM Do YY")} at {location} with a {breed} of id {dogId}. Currently, you have {noParticipants} participant(s). </p>
                <p>Description: {intro}</p>
            </div>
                <button
                    type="submit"
                    value="Submit"
                    className="NewEvent-button"
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button
                    type="submit"
                    value="Submit"
                    className="NewEvent-button"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

/**
 * New Event is a New Event Input component for events
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} userId
 */

const NewEvent = (props) => {
    const addEvent = (location, breed, selectedDate, noParticipants, dogId, intro) => {
        const body = { 
            userId: props.userId,
            location: location,
            breed: breed,
            time: selectedDate,
            noParticipants: noParticipants,
            dogId: dogId,
            intro: intro
        };
        
        post("/api/event", body).then(
            window.confirm('Thank you for submitting the event!')
        ).then(
            window.location.reload()
        );
    };
    if (props.userId){
        return <NewEventInput defaultText="Enter Text Here" onSubmit={addEvent} />;
    }else{
        return(
            <div>Please log in to post event!</div>
        );
        
    }
    
};

export { NewEventInput, NewEvent }