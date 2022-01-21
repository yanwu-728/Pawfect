import React, { useState, useEffect } from "react";
import Filter from "../modules/Filter.js";
import moment from 'moment';
import {get} from "../../utilities.js";
import Card from "../modules/Card.js";
import ParticipantsBlock from "../modules/ParticipantsBlock.js";
import SingleEvent from "../modules/SingleEvent.js";
import './FindDog.css';
import "../modules/Filter.css";

const FindDog = (props) => {
  const [event, setEvent] = useState([]);

    const [breed, setBreed] = useState(null);
    const [selectedDate, setDate] = useState(null);
    const [address, setAddress] = useState(null);
    const [defaultText, setDefault] = useState(null);

    const [coords, setCoords] = useState({
        lat: 42.35405430000001,
        lng: -71.1026228,
    });
  
    const changeBreed = (event) => {
      if (event.target.value === "No Preference"){
        setBreed(null);
      }else{
        setBreed(event.target.value);
      }
      
    };
  
    const changeDate = (date) => {
      setDate(moment(date).format("MMM Do YY"));
      // setDate(moment(date).toDate());
    }

    useEffect(() => {
      document.title = "Find Dog";
      get("/api/event").then((eventObjs) => {
          // setEvent(eventObjs);
          let display = [];
            
          for (let i=0; i<eventObjs.length; i++) {
              if (Date.parse(eventObjs[i].time) > Date.now()) {
                  display.push(eventObjs[i]);
              };
          }
          setEvent(display);
  });
  }, []);

    const handleSubmit = () => {
      // useEffect(() => {
      //   document.title = "Filter";
      //   get("/api/filteredevents", {location: location, time: selectedDate, breed: breed}).then((eventObjs) => {
      //     setEvent(eventObjs);
      //   });
      // }, []);
      get("/api/filteredevents", {location: location, time: selectedDate, breed: breed}).then((eventObjs) => {
        setEvent(eventObjs);
      });
    };

    const handleReset = () => {
      setBreed(null);
      setLocation(null);
      setDate(null);
      setDefault("none");
    }

    let eventList = null;
    const hasEvent = event.length !== 0;
    if (hasEvent) {
    eventList = event.map((eventObj) => (
        <Card
        eventId={eventObj._id}
        location={eventObj.location}
        breed={eventObj.breed}
        time={eventObj.time}
        noParticipants={eventObj.noParticipants}
        dogId={eventObj.dogId}
        intro={eventObj.intro}
        userId={props.userId}
        />
    ));
    } else {
        eventList = <div>No event!</div>;
    };

    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autocomplete) => {
        console.log('autocomplete');
        setAutocomplete(autocomplete);
    };

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

  //   useEffect(() => {
  //     console.log(coords)
  // }, [coords]);

    return (
      <>
      <div className="FindDog-selector">
        <Filter changeBreed={changeBreed} changeDate={changeDate} onPlaceChanged={onPlaceChanged} onLoad={onLoad} coords={coords} defaultText={defaultText}/>
        <div className="filter">
        <p>The selected breed is {breed}.</p>
        <p>The selected time is {selectedDate}</p>
        <p>The selected location is {address}.</p>
        </div>
        
        <p>

          <button
        type="submit"
        value="Submit"
        className="FindDog-button"
        onClick={handleSubmit}
        >
          Find Dog
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
        
        
        <>
        <div className='FindDog-event'>
          {eventList}
        </div>
        
        </>
      </>
    );
  };
  
  export default FindDog;