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
    const [location, setLocation] = useState(null);
  
    const changeBreed = (event) => {
      setBreed(event.target.value);
    };
  
    const changeDate = (date) => {
      setDate(moment(date).format("MMM Do YY"));
      // setDate(moment(date).toDate());
    }

    const changeLocation = (event) => {
        setLocation(event.target.value);
    }
    
    useEffect(() => {
      document.title = "Find Dog";
      get("/api/event").then((eventObjs) => {
          setEvent(eventObjs);
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
    }

    return (
      <>
      <div className="FindDog-selector">
        <Filter changeBreed={changeBreed} changeDate={changeDate} changeLocation={changeLocation}/>
        <div className="filter">
        <p>The selected breed is {breed}.</p>
        <p>The selected time is {selectedDate}</p>
        <p>The selected location is {location}.</p>
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