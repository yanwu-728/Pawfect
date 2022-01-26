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
  const Infty = 1000;
  const dayTime = 8.64*Math.pow(10, 7);
  const mit = {
    lat: 42.35405430000001,
    lng: -71.1026228,
};
  const [event, setEvent] = useState([]);

    const [breed, setBreed] = useState(null);
    const [selectedDate, setDate] = useState(null);
    const [address, setAddress] = useState(null);
    const [defaultText, setDefault] = useState(null);
    
    const [timeRange, setTimeRange] = useState(Infty);
    const [radius, setRadius] = useState(Infty);
    const [coords, setCoords] = useState(mit);
  
    const changeBreed = (event) => {
      if (event.target.value === "No Preference"){
        setBreed(null);
      }else{
        setBreed(event.target.value);
      }
      
    };
  
    const changeDate = (date) => {
      setDate(moment(date).format());
      // setDate(moment(date).toDate());
    }

    const changeRadius = (event) => {
      setRadius(event.target.value);
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

    const earthDistance = (lat1, lng1, lat2, lng2) => {
        const lat1rad = lat1 / (180/Math.PI);
        const lng1rad = lng1 / (180/Math.PI);
        const lat2rad = lat2 / (180/Math.PI);
        const lng2rad = lng2 / (180/Math.PI);
        return 3963 * Math.acos(Math.sin(lat1rad)*Math.sin(lat2rad) + Math.cos(lat1rad)*Math.cos(lat2rad)*Math.cos(lng2rad - lng1rad))
    };

    console.log("distance from US to SG");
    console.log(earthDistance(1.3521, 103.8198, 42.3601, -71.0589));
    
    const handleSubmit = () => {
      console.log("filtering events")
      console.log(Date.parse(selectedDate))
      get("/api/filteredevents", {time: selectedDate, breed: breed, lat: coords.lat, lng: coords.lng, radius: radius}).then((eventObjs) => {
        console.log("eventTime")
        console.log(Date.parse(eventObjs[0].time));
        if (selectedDate === null) {
          console.log(Date.now());
          setEvent(eventObjs.filter((event => (earthDistance(event.lat, event.lng, coords.lat, coords.lng) <= radius) && (Date.parse(event.time) > Date.now()))));
        }else{
          setEvent(eventObjs.filter((event => (earthDistance(event.lat, event.lng, coords.lat, coords.lng) <= radius) && (Date.parse(selectedDate) - dayTime <= Date.parse(event.time)) && (Date.parse(event.time) <= Date.parse(selectedDate) + dayTime) && (Date.parse(event.time) > Date.now()))));

        }
      });
      }

    const handleReset = () => {
      setBreed(null);
      setAddress(null);
      setDate(null);
      setDefault("none");
      setRadius(Infty);
      setCoords(mit);
    }

    let eventList = null;
    const hasEvent = event.length !== 0;
    if (hasEvent) {
    eventList = event.map((eventObj) => (
        <Card
        eventId={eventObj._id}
        location={eventObj.address}
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

    return (
      <>
      <div className="FindDog-selector">
      <Filter changeBreed={changeBreed} changeDate={changeDate} onPlaceChanged={onPlaceChanged} onLoad={onLoad} coords={coords} defaultText={defaultText}/>
        <p className="filter">See events in a radius of: 
        <input 
            type="number"
            min="1"
            value={radius}
            onChange={changeRadius}
            className="FindDog-bar"
        />
        miles.
        </p>
        <div className="filter">
        <p>The selected breed is {breed}.</p>
        <p>The selected time is {selectedDate}.</p>
        <p>The selected location is {address}.</p>
        <p>The selected radius is {radius} miles.</p>
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