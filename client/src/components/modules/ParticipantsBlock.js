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

const ParticipantsBlock =  (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        document.title = "My Schedule";
        if (props.userId) {
            get("/api/user").then((user) => {
                console.log("the user")
                console.log(user)
                setUser(user.name)
            });
        };
    }, []);
    
    console.log(props.participants);
    const [event, setEvent] = useState([]);

    useEffect(() => {
        document.title = "My Schedule";
        get("/api/singleevent", {eventId: props.eventId}).then((eventObjs) => {
            setEvent(eventObjs);
            // console.log("event objects:")
            // console.log(eventObjs);
    });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(user);
        const body = {
            participant_name: user,
            participantId: props.userId,
            eventId: props.eventId,
        };
        post("/api/participant", body).then(() => {
            get("/api/participant", {participantId: props.userId}).then((newParticipant) => {
                props.addNewParticipant(newParticipant);
            });
        }).then(
            window.confirm('Thank you for signing up!')
            ).then(
                window.location.reload()
            );
        
        
      };
      
    //   console.log(props.participants.length);      
      
      if (event.length > 0 && props.participants.length >= event[0].noParticipants){
          return (
            <div>
                The participants are: {props.participants.map((participant) => 
                participant.participant_name
                )}
                    Slots have run out!
            </div>
        );
      }else{
        if (props.userId){
            console.log(props.participants)
            return (
          <div>
            The participants are: {props.participants.map((participant) => 
            participant.participant_name
            )}
            <button
            type="submit"
            value="Submit"
            onClick={handleSubmit}
            >
                Sign Up!
            </button>  
            
        </div>
      )
        }else{
            return (
                <div>
                    <p>
                    The participants are: {props.participants.map((participant) => 
            participant.participant_name
            )}
                    </p>
                    <p>Log in to sign up!</p>
                </div>
            )
        }
          
      };
        

};

export default ParticipantsBlock;