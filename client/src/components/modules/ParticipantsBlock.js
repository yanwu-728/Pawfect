import React, { useState, useEffect } from "react";
import {get, post} from "../../utilities.js";


/**
 * Component that holds all the participants for an event
 *
 * Proptypes
 * @param {ParticipantObjs[]} participants
 * @param String eventId
 * @param String userId
 * @param function addNewParticipant
 */

const ParticipantsBlock = (props) => {
    const currentUser = get("/api/user", {userid: props.userId})

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(currentUser);
        const body = {
            participant_name: currentUser.name,
            participantId: props.userId,
            eventId: props.eventId,
        };
        post("/api/participant", body);
        const newParticipant = new Participant(body);
        props.addNewParticipant(newParticipant);
      };

    return (
        <div>
            {props.participants.map((participant) => (
            participant.participant_name
          ))}
            <button
            type="submit"
            value="Submit"
            onClick={handleSubmit}
            >
                Sign Up!
            </button>
        </div>
        
    )
};

export default ParticipantsBlock;