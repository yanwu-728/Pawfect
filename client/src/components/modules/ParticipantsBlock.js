import React, { useState, useEffect } from "react";
import {get, post} from "../../utilities.js";
import "../pages/FindDog.css";


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
            get("/api/user", {userId: props.userId}).then((res) => {
                console.log(res.name)
                setUser(res.name);
            });
        };
    }, [props.userId]);
    
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
            if(Object.keys(newParticipant).length !== 0){
                props.addNewParticipant(newParticipant);
                    window.confirm('Thank you for signing up!');
            }else{
                window.confirm('You have already signed up!')
                };
        })
        
        
      };
      
    const handleDelete = (event) => {
        event.preventDefault();
        console.log(user);
        console.log(props.userId);
        console.log(props.eventId);
        const body = {
            participantId: props.userId,
            eventId: props.eventId,
        };
        console.log("ondelete");
        get("/api/participating", body).then((participant) => {
            if(Object.keys(participant).length !== 0){
                props.deleteParticipant(participant);
                post("/api/deleteparticipant", body);
                window.confirm('Sorry to see you go :(');
            }else{
                window.confirm('You have not signed up!')
                };
        });

    }
      
      if (event.length > 0 && props.participants.length >= event[0].noParticipants){
          if (props.userId){
              return (
            <div className="Participant">
                The participants are: 
                {props.participants.map((participant) => 
            (<div className="Participant_">
                {participant.participant_name}
            </div>)
            )}
                <p>
                    Slots have run out!
                </p>
                 <button
            type="delete"
            value="delete"
            className="Withdraw-button"
            onClick={handleDelete}
            >
                Withdraw
            </button> 
            </div>
        )}else{
            return (
                <div className="Participant">
                    The participants are: 
                    {props.participants.map((participant) => 
                (<div className="Participant_">
                    {participant.participant_name}
                </div>)
                )}
                    <p>
                        Slots have run out!
                    </p>
                <p>Log in to withdraw.</p>
                </div>
        )}
          
      }else{
        if (props.userId){
            return (
          <div className="Participant">
            The participants are: {props.participants.map((participant) => 
            (<div className="Participant_">
                {participant.participant_name}
            </div>)
            )}
            <p>
                <button
            type="submit"
            value="Submit"
            className="SignUp-button"
            onClick={handleSubmit}
            >
                Sign Up!
            </button> 
                 <button
            type="delete"
            value="delete"
            className="Withdraw-button"
            onClick={handleDelete}
            >
                Withdraw
            </button> 
             </p>
             
            
        </div>
      )
        }else{
            return (
                <div className="Participant">
                    <p>
                    The participants are: {props.participants.map((participant) => 
            (<div className="Participant_">
            {participant.participant_name}
        </div>)
            )}
                    </p>
                    <p>Log in to sign up!</p>
                </div>
            )
        }
          
      };
        

};

export default ParticipantsBlock;