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
    const [center, setCenter] = useState({
        lat: 42.35405430000001,
        lng: -71.1026228,
    });

    const [coords, setCoords] = useState({
        lat: 42.35405430000001,
        lng: -71.1026228,
    })

    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autocomplete) => {
        console.log('autocomplete');
        setAutocomplete(autocomplete);
    };
    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            console.log(autocomplete.getPlace().geometry.location.toJSON().lat)
            console.log(autocomplete.getPlace().geometry)
            setCoords({
                lat: autocomplete.getPlace().geometry.location.toJSON().lat,
                lng: autocomplete.getPlace().geometry.location.toJSON().lng,
            })
        }else{
            console.log('Autocomplete is not loaded yet!')
        }
    };
    const libraries = ["places"];

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

            <LoadScript
      googleMapsApiKey="AIzaSyAy7KnLyLW1vieNitfWQyHKvoquq2eN1tY" libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
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
            position={coords}
            />
        <></>
      </GoogleMap>
    </LoadScript>

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