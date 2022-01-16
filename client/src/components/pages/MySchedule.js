import React, { useState, useEffect } from "react";
import {NewEvent} from "../modules/NewEvent.js";
import {get, post} from "../../utilities.js";
import SingleEvent from "../modules/SingleEvent.js";
import './MySchedule.css';
import '../modules/NewEvent.css';

const MySchedule = () => {
    const [event, setEvent] = useState([]);

    useEffect(() => {
        document.title = "My Schedule";
        get("/api/event").then((eventObjs) => {
            setEvent(eventObjs);
    });
    }, []); // Need to query based on userId; also need to take into account events both as organizer and participant

    const addNewEvent = (eventObj) => {
        setEvent([eventObj].concat(event));
    };

    const HandleDelete = (eventId) => {
        console.log('handle delete');
        post("/api/deleteEvent", {eventId:eventId});
    };

    let eventList = null;
    const hasEvent = event.length !== 0;
    if (hasEvent) {
    eventList = event.map((eventObj) => (
        <div key={eventObj.eventId}>
            <SingleEvent
                eventId={eventObj.eventId}
                location={eventObj.location}
                breed={eventObj.breed}
                time={eventObj.time}
                noParticipants={eventObj.noParticipants}
                dogId={eventObj.dogId}
                intro={eventObj.intro}
            />
            <button
                type="delete"
                value="Delete"
                className="NewEvent-button"
                onClick={HandleDelete(eventObj.eventId)}
            > 
                Delete 
            </button>
        </div>
    ));
    } else {
        eventList = <div>No event!</div>;
    }

    return (
        <div>
            <NewEvent />
            <div className='MySchedule-event'>
                {eventList}
            </div>
        </div>
    );
};

export default MySchedule