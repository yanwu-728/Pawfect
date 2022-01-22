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
        console.log('autocomplete');
        setAutocomplete(autocomplete);
    };

    const [coords, setCoords] = useState({
        lat: 42.35405430000001,
        lng: -71.1026228,
    });

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            console.log(autocomplete.getPlace().formatted_address);
            console.log(autocomplete.getPlace());
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

    useEffect(() => {
        console.log(address)
    }, [address]);

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

    console.log(props.dogIds);
    
    return (
        <div>
            <div className="NewEvent-selector">
            <Filter  changeBreed={changeBreed} changeDate={changeDate} onPlaceChanged={onPlaceChanged} onLoad={onLoad} coords={coords}/>
            <div className="criteria">
                <p>Number of participants allowed to join your event (at least 1): </p>
                <input 
                    type="number"
                    min="1"
                    value={noParticipants}
                    onChange={changeNoParticipant}
                />
                <label for="dog-id">ID of your dog:</label>
                <select id="dog-id" defaultValue="0">
                    {props.dogIds.map(item => {
                        return (<option value={item}>{item}</option>);
                    })}
                </select>

                <p>Description:</p>
                <input
                    type="text"
                    placeholder= {props.defaultText}
                    value={intro}
                    onChange={changeIntro}
                />
                <p>The event is on {moment(selectedDate).format("MMM Do YY")} at {address} with a {breed} of id {dogId}. ={noParticipants} participant(s) is/are allowed to sign up. </p>
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

    // useEffect(() => {
    //     let dogIds = [];
    //     get("/api/dog", { ownerId: props.userId }).then((dogs) => {
    //         console.log(dogs);
    //         for (let i=0;i<dogs.length;i++) {
    //             console.log(dogs[i]);
    //             dogIds.append(dogs[i].dogId);
    //         };
    //     });
    // }, [props.userId]);

    let dogIds = [];
    get("/api/dog", { ownerId: props.userId }).then((dogs) => {
        for (let i=0;i<dogs.length;i++) {
            dogIds.push(dogs[i].dogId);
        };
    });

    return <NewEventInput defaultText="Enter Text Here" onSubmit={addEvent} dogIds={dogIds} />;
    
};

export { NewEventInput, NewEvent }