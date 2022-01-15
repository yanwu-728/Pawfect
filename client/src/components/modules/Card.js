import React, { useState, useEffect } from "react";
import SingleEvent from "./SingleEvent.js";
import ParticipantsBlock from "./ParticipantsBlock.js";
import {get} from "../../utilities.js";

/**
 * Card is a component for displaying content like events and participants
 *
 * Proptypes
 * @param {string} eventId of the event
 * @param {string} creator_name
 * @param {string} creator_id
 */

const Card = (props) => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        get("/api/participants", { eventId: props.eventId }).then((participants) => {
            console.log("PARTICIPANTS:");
            console.log(participants)
            setParticipants(participants);
        });
    }, []);

    const addNewParticipant = (participantObj) => {
        console.log("STEP 1")
        if(participants.find((participant) => {return (participant.participantId === participantObj.participantId)})){
            console.log("repeat signup")
                window.confirm('You have already signed up!').then(
                    window.location.reload()
                )
        }else{
            setParticipants(participants.concat([participantObj]));
        }
        //setParticipants(participants.concat([participantObj]));
        // console.log(participants);
      };
    
    return (
    <div className="Card-container">
        <SingleEvent
        _id={props.eventId}
        location={props.location}
        breed={props.breed}
        time={props.selectedDate}
        noParticipants={props.noParticipants}
        dogId={props.dogId}
        intro={props.intro}
        />
        <ParticipantsBlock
        eventId={props.eventId}
        participants={participants}
        userId={props.userId}
        addNewParticipant={addNewParticipant}
        />
    </div>
    );
};

export default Card;