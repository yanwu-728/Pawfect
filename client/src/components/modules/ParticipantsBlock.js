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
                setUser(user.name)
            });
        };
    }, []);
    
    const [event, setEvent] = useState([]);

    useEffect(() => {
        document.title = "My Schedule";
        get("/api/singleevent", {eventId: props.eventId}).then((eventObjs) => {
            setEvent(eventObjs);
    });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            participant_name: user,
            participantId: props.userId,
            eventId: props.eventId,
        };
        console.log("onsubmit");
        post("/api/participant", body).then((newParticipant) => {
            console.log(newParticipant);
            if(newParticipant){
                props.addNewParticipant(newParticipant).then(
                    window.confirm('Thank you for signing up!')
                )
            }else{
                window.confirm('You have already signed up!')
                };
        })
        
        
      };
      
      
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