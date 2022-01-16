import React, { useState, useEffect } from "react";
import SingleEvent2 from "./SingleEvent2.js";
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
        setParticipants(participants.concat([participantObj]));
      };
    
      const deleteParticipant = (participantObj) => {
          console.log("deleting participant from front end");
        setParticipants(participants.filter(function(item){
            return item.participantId !== participantObj.participantId
        }));
      };

    return (
    <div className="Card-container">
        <SingleEvent2
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
        deleteParticipant={deleteParticipant}
        />
    </div>
    );
};

export default Card;