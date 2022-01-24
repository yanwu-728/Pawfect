import React, { useState, useEffect } from "react";
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
    const [breed, setBreed] = useState("[breed]");
    const [selectedDate, setDate] = useState("[date]");
    const [noParticipants, setNoParticipants] = useState(0);
    const [dogId, setDogId] = useState("0");
    const [intro, setIntro] = useState("");

    const [address, setAddress] = useState("[location]");
    
    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete);
    };

    const [coords, setCoords] = useState({
        lat: 42.35405430000001,
        lng: -71.1026228,
    });

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            console.log(autocomplete.getPlace().formatted_address);
            setCoords({
                lat: autocomplete.getPlace().geometry.location.toJSON().lat,
                lng: autocomplete.getPlace().geometry.location.toJSON().lng,
            });
            const loc = autocomplete.getPlace().formatted_address;
            setAddress(loc);
        }else{
            console.log('Autocomplete is not loaded yet!')
        }
    };

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
        setBreed(null);
        setAddress(null);
        setDate(null);
        setNoParticipants(0);
        setDogId("0");
        setIntro("");
        window.location.reload();
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        try{
            if (address !== "[location]" && breed !== "[breed]" && selectedDate !== "[date]" && noParticipants > 0) {
                props.onSubmit && props.onSubmit(address, coords['lat'], coords['lng'], breed, selectedDate, noParticipants, dogId, intro);
            } else {
                window.alert("Input Event Invalid! Please enter address, breed, date and have a number of participant greater than 0");
            }
            
        } catch (error) {
            window.alert("Input invalid");
            window.location.reload();
        }
        handleReset;
    };

    // let options = props.dogIds.map(item => item);
    console.log(props.dogIds);
    let options = props.dogIds.map((item) => {
		console.log(`BEFORE: ${item}`)
	    const result = (<option value={item}>{item}</option>)
		console.log(`AFTER: ${result}`) 
		return result;
});
    // let options = props.dogIds.map(item => <option value={item}>{item}</option>);
    
    // console.log('option');
    // console.log(options);
    
    
    return (
        <div>
            <div className="NewEvent-selector">
            <Filter  changeBreed={changeBreed} changeDate={changeDate} onPlaceChanged={onPlaceChanged} onLoad={onLoad} coords={coords}/>
            <div className="criteria">
                <div>Allowed number of participants (at least 1): </div>
                <input 
                    type="number"
                    min="1"
                    value={noParticipants}
                    onChange={changeNoParticipant}
                />
                <p></p>
                <label htmlFor="dog-id">ID of your dog: </label>
                <select id="dog-id" defaultValue="0">
                    {options}
                </select>

                <p></p>
                <input
                    type="text"
                    placeholder= "Description"
                    value={intro}
                    onChange={changeIntro}
                />
                <p>The event is on {moment(selectedDate).format("MMM Do YY")} at {address} with a {breed} of id {dogId}. </p>
                <p> {noParticipants} participant(s) is/are allowed to sign up. </p>
                <p>Description: {intro}</p>
            </div>
            <p>
                <button
                    type="submit"
                    value="Submit"
                    className="Submit-button"
                    onClick={handleSubmit}
                >
                    Submit
                </button>

                <button
                    type="submit"
                    value="Submit"
                    className="Reset-button"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </p>
                
                
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
    const addEvent = (location, lat, lng, breed, selectedDate, noParticipants, dogId, intro) => {
        const body = { 
            userId: props.userId,
            address: location,
            lat:lat,
            lng:lng,
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

    const dogIds = [];
    get("/api/dog", { ownerId: props.userId }).then((dogs) => {
        for (let i=0;i<dogs.length;i++) {
            dogIds.push(dogs[i].dogId);
        };
    });

    return <NewEventInput defaultText="Enter Text Here" onSubmit={addEvent} dogIds={dogIds} />;
    
};

export { NewEventInput, NewEvent }