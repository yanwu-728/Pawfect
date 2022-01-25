import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Filter.css";
import {GoogleMap, LoadScript, Autocomplete, Marker} from '@react-google-maps/api';
import MyGoogleMap from "./map_components/MyGoogleMap.js";

const containerStyle = {
    width: '300px',
    height: '300px'
  };


const Filter = (props) => {
    const [selectedDate, setDate] = useState(null);

    const [center, setCenter] = useState({
        lat: 42.35405430000001,
        lng: -71.1026228,
    });

    const libraries = ["places"];

    let options = require('./breed_options.json');

    // console.log(props.coords);

    return (
        <div className="filter">
            <div className="filter-breed">
                {/* <label htmlFor="dog-breeds" >Breed: </label> */}
                <datalist id="dog-breed" defaultValue="No Preference">
                    <option value="No Preference">No Preference</option>
                    {options.map(item => {
                        return (<option key={item} value={item}>{item}</option>);
                    })}
                </datalist>
                <input type="text" list="dog-breed" onChange={props.changeBreed} className="filter-bar" placeholder="Select Breed"/>
            </div>
            
            <DatePicker 
            selected={null}
            onChange={props.changeDate}
            className="filter-bar" 
            placeholderText="Select Date"
            />
            

            <LoadScript
      googleMapsApiKey="AIzaSyAy7KnLyLW1vieNitfWQyHKvoquq2eN1tY" libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
          <Autocomplete
            onLoad={props.onLoad}
            onPlaceChanged={props.onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Select Location"
              className="filter-bar"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
          </Autocomplete>
            
          <Marker
            icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
            position={props.coords}
            />
        <></>
      </GoogleMap>
    </LoadScript>

        </div>
    )
}


export default Filter;