import React, { useState, useEffect } from "react";
import Filter from "../modules/Filter.js";
import moment from 'moment';


const FindDog = (props) => {
    const [breed, setBreed] = useState(null);
    const [selectedDate, setDate] = useState(null);
    const [location, setLocation] = useState(null);
  
    const changeBreed = (event) => {
      setBreed(event.target.value);
    };
  
    const changeDate = (date) => {
      setDate(moment(date).format("MMMM Do YYYY"));
    }

    const changeLocation = (event) => {
        setLocation(event.target.value);
    }
  
    return (
      <>
        <Filter changeBreed={changeBreed} changeDate={changeDate} changeLocation={changeLocation}/>
        <p>The selected breed is {breed}.</p>
        <p>The selected time is {selectedDate}</p>
        <p>The selected location is {location}.</p>
      </>
    );
  };
  
  export default FindDog;