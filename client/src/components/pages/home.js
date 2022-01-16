import React, { useState, useEffect } from "react";
import {get} from "../../utilities.js";
import "./home.css";

const Home = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        document.title = "Home Page";
        console.log(props.userId);
        get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    }, []);

    if (!user) {
        return (
            <text className="home-intro">
                <p className="home-welcome">Welcome!</p> 
                <p>Pawfect is the website that allows people to share their dogs and meet more dog lovers!</p>
                <p>You will be able to upload your dog-walking schedule or view dog-walking event and join them.</p>
                <p>Please sign-in using Google account to view more.</p>
            </text>
        );
    };

    return (
        <text className="home-intro">
            <p className="home-welcome">Welcome, {user.name}!</p>
            <p>Pawfect is the website that allows people to share their dogs and meet more dog lovers!</p>
            <p>You will be able to upload your dog-walking schedule or view dog-walking event and join them.</p>
            <p>Please navigate to FindDog page to view events or MySchedule page to upload your own event.</p>
        </text>
    );
};

export default Home;