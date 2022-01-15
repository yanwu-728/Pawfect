import React, { useState, useEffect } from "react";
import Filter from "../modules/Filter.js";
import moment from 'moment';
import {get} from "../../utilities.js";
import Card from "../modules/Card.js";
import ParticipantsBlock from "../modules/ParticipantsBlock.js";
import SingleEvent from "../modules/SingleEvent.js";


const FindDog = (props) => {
  const [event, setEvent] = useState([]);

    useEffect(() => {
        document.title = "Find Dog";
        get("/api/event").then((eventObjs) => {
            setEvent(eventObjs);
    });
    }, []);

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
        <Filter changeBreed={changeBreed} changeDate={changeDate} changeLocation={changeLocation}/>
        <p>The selected breed is {breed}.</p>
        <p>The selected time is {selectedDate}</p>
        <p>The selected location is {location}.</p>
        <>
        The current events are:
        {eventList}
        </>
      </>
    );
  };
  
  export default FindDog;