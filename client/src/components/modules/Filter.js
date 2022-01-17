import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Filter.css";

const Filter = (props) => {

    return (
        <div className="filter">
            <label htmlFor="dog-breeds">Breed:</label>
            <select value={props.defaultText} selected name="dog-breeds" id="dog-breeds" onChange={props.changeBreed}>
                <option value="none" selected disabled hidden>Please Select</option>
                <option value="No Preference">No Preference</option>
                <option value="Golden Retriever">Golden Retriever</option>
                <option value="Labrador">Labrador</option>
                <option value="Shiba Inu">Shiba Inu</option>
                <option value="Corgi">Corgi</option>
            </select>
            
            <DatePicker 
            selected={null}
            onChange={props.changeDate} 
            />
            
            <label htmlFor="locations">Location:</label>
            <select value={props.defaultText} selected name="locations" id="locations" onChange={props.changeLocation}>
                <option value="none" selected disabled hidden>Please Select</option>
                <option value="No Preference">No Preference</option>
                <option value="MIT">MIT</option>
                <option value="Harvard">Harvard</option>
                <option value="Central Squre">Central Square</option>
                <option value="Back Bay">Back Bay</option>
            </select>
        </div>
    )
}

export default Filter;