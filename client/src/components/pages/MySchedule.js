import React, { useState, useEffect } from "react";
import {NewEvent} from "../modules/NewEvent.js";
import {get} from "../../utilities.js";
import SingleEvent from "../modules/SingleEvent.js";

const MySchedule = () => {
    const [event, setEvent] = useState([]);

    useEffect(() => {
        document.title = "My Schedule";
        get("/api/event").then((eventObjs) => {
            setEvent(eventObjs);
    });
    }, []);

    const addNewEvent = (eventObj) => {
        setEvent([eventObj].concat(event));
    };

    let eventList = null;
    const hasEvent = event.length !== 0;
    if (hasEvent) {
    eventList = event.map((eventObj) => (
        <SingleEvent
        eventId={eventObj.eventId}
        location={eventObj.location}
        breed={eventObj.breed}
        time={eventObj.time}
        noParticipants={eventObj.noParticipants}
        dogId={eventObj.dogId}
        intro={eventObj.intro}
        />
    ));
    } else {
        eventList = <div>No event!</div>;
    }

    return (
        <>
            <NewEvent />
            {eventList}
        </>
    );
};

export default MySchedule