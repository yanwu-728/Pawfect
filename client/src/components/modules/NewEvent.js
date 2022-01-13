import React, { useState } from "react";

import "./NewEvent.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {({location, breed, time, intro}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewEventInput = (props) => {
    // const [location, setLocation] = useState(""); waiting for Google map API integration
    const [breed, setBreed] = useState("");
    const [time, setTime] = useState(Date.now);
    const [intro, setIntro] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(value);
        setValue("");
    };

    return (
        <div>
            {/* some HTML code */}
        </div>
    );
};

export default NewEventInput