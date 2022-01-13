import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filter = (props) => {

    return (
        <div class="dropdown">
            <label for="dog-breeds">Breed:</label>
            <select name="dog-breeds" id="dog-breeds" onChange={props.changeBreed}>
                <option value="noPreference">No Preference</option>
                <option value="goldenRetriever">Golden Retriever</option>
                <option value="labrador">Labrador</option>
                <option value="shibaInu">Shiba Inu</option>
                <option value="corgi">Corgi</option>
            </select>
            
            <DatePicker 
            selected={new Date()}
            onChange={props.changeDate} 
            showTimeSelect
            dateFormat="Pp"
            />

        </div>
    )
}

export default Filter;