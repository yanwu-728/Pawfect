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
    const [eventIds, setEventIds] = useState([]);

    useEffect(() => {
        document.title = "My Schedule";
        let events = [];
        get("/api/participant", {participantId: props.userId}).then((participant) => {
        
            for (let i=0; i<participant.length; i++) {
                events.push(participant[i].eventId);
            }

        });

        setEventIds(events);
        console.log(eventIds);
    }, [props.userId]);


    useEffect(() => {
        document.title = "My Schedule";
        console.log(eventIds);
        get("/api/event").then((eventObjs) => {
            let display = [];
            
            for (let i=0; i<eventObjs.length; i++) {
                console.log(eventIds, eventObjs[i].eventId);
                if ((eventObjs[i].userId == props.userId || eventIds.includes(eventObjs[i]._id)) && Date.parse(eventObjs[i].time) > Date.now()) {
                    display.push(eventObjs[i]);
                };
            }
            setEvent(display);
        }
        );
    }, [props.userId, eventIds]); // Need to query based on userId; also need to take into account events both as organizer and participant


    let eventList = null;
    const hasEvent = event.length !== 0;
    if (hasEvent) {
    eventList = event.map((eventObj) => (
        <div key={eventObj.eventId}>
            <SingleEvent
                userId={props.userId}
                creatorId={eventObj.userId}
                eventId={eventObj.eventId}
                address={eventObj.address}
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

    if (props.userId) {
        return (
            <div>
                <NewEvent userId={props.userId}/>
                <div className='MySchedule-event'>
                    {eventList}
                </div>
            </div>
        );
    }else{
        return (
            <div className="MySchedule-notloggedin">
                Please log in to continue!
            </div>
        )
    }
    
};

export default MySchedule