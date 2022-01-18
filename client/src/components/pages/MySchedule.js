import React, { useState, useEffect } from "react";
import {NewEvent} from "../modules/NewEvent.js";
import {get, post} from "../../utilities.js";
import SingleEvent from "../modules/SingleEvent.js";
import './MySchedule.css';
import '../modules/NewEvent.css';

/**
 * My schedule is a page for a user's schedule
 *
 * Proptypes
 * @param {string} userId
 */

const MySchedule = (props) => {
    const [event, setEvent] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        document.title = "User";
        get("/api/user").then((user) => {
            setUserId(user._id);
        });
    }, []);

    useEffect(() => {
        document.title = "My Schedule";
        get("/api/event").then((eventObjs) => {

            let display = [];
            
            for (let i=0; i<eventObjs.length; i++) {
                if (eventObjs[i].userId == userId) {
                    display.push(eventObjs[i]);
                };
            }
            setEvent(display);
    });
    }, [props.userId]); // Need to query based on userId; also need to take into account events both as organizer and participant

    let eventList = null;
    const hasEvent = event.length !== 0;
    if (hasEvent) {
    eventList = event.map((eventObj) => (
        <div key={eventObj.eventId}>
            <SingleEvent
                userId={eventObj.userId}
                eventId={eventObj.eventId}
                location={eventObj.location}
                breed={eventObj.breed}
                time={eventObj.time}
                noParticipants={eventObj.noParticipants}
                dogId={eventObj.dogId}
                intro={eventObj.intro}
            />
        </div>
    ));
    } else {
        eventList = <div>No event!</div>;
    }

    return (
        <div>
            <NewEvent userId={props.userId}/>
            <div className='MySchedule-event'>
                {eventList}
            </div>
        </div>
    );
};

export default MySchedule