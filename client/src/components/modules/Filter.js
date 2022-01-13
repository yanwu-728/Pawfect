import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filter = (props) => {

    return (
        <div class="filter">
            <label for="dog-breeds">Breed:</label>
            <select name="dog-breeds" id="dog-breeds" onChange={props.changeBreed}>
                <option value="noPreference">No Preference</option>
                <option value="goldenRetriever">Golden Retriever</option>
                <option value="labrador">Labrador</option>
                <option value="shibaInu">Shiba Inu</option>
                <option value="corgi">Corgi</option>
            </select>
            
            <DatePicker 
            selected={null}
            onChange={props.changeDate} 
            />
            
            <label for="locations">Location:</label>
            <select name="locations" id="locations" onChange={props.changeLocation}>
                <option value="noPreference">No Preference</option>
                <option value="MIT">MIT</option>
                <option value="Harvard">Harvard</option>
                <option value="Central Squre">Central Square</option>
                <option value="Back Bay">Back Bay</option>
            </select>
        </div>
    )
}

export default Filter;