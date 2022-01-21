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

    const [address, setAddress] = useState("");

    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autocomplete) => {
        console.log('autocomplete');
        setAutocomplete(autocomplete);
    };
    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            console.log(autocomplete.getPlace().formatted_address);
            console.log(autocomplete.getPlace());
            setCoords({
                lat: autocomplete.getPlace().geometry.location.toJSON().lat,
                lng: autocomplete.getPlace().geometry.location.toJSON().lng,
            });
            
            setAddress(autocomplete.getPlace().formatted_address);
            console.log(address);
            props.changeLocation(address);
        }else{
            console.log('Autocomplete is not loaded yet!')
        }
    };

    const libraries = ["places"];

    let options = require('./breed_options.json');

    return (
        <div className="filter">
            <div className="filter-breed">
                <label htmlFor="dog-breeds">Breed:</label>
                <datalist id="dog-breed" defaultValue="No Preference">
                    <option>No Preference</option>
                    {options.map(item => {
                        return (<option value={item}>{item}</option>);
                    })}
                </datalist>
                <input type="text" list="dog-breed" onChange={props.changeBreed}/>
            </div>
            
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

        </div>
    )
}


export default Filter;