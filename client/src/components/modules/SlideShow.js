import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import "./SlideShow.css";
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';

const SlideShow = (props) => {
    const [dogs, setDogs] = useState([]);
    const [dogList, setDogList] = useState([]);
    useEffect(() => {
        document.title = "Slide show";
        get("/api/dog").then((dogObjs) => {
            setDogs(dogObjs);
            // setDogs(dogObjs);
          });
    }, []);

    useEffect(() => {
        console.log(dogs);
        let url = "https://drive.google.com/uc?id=";
    
        // let dogList = null;
        if (dogs.length !== 0){
            setDogList(dogs.map((dog) => (
                <div className="each-slide">
                    <div className="box">
                        <img src={url+dog.dogPic} alt={dog.name} className="slide-image"></img>
                        <div className="name">{dog.name}</div>
                    </div>
                    
                {/* //     <div style={{'backgroundImage': `url(${url+dog})`}}></div> */}
                    
                </div>
            )))
        };
    }, [dogs]);
    

    const onRender = () =>{ 
        console.log(`doglist: ${dogList}`);
        console.log(`dogs length" ${dogs.length}`);
        if (dogList) {
            let url = "https://drive.google.com/uc?id=";
            return (
                // <div>

                
                // <img src={url+dogs[0]}></img>
                // <div style={{'backgroundImage': `url(${url+dogs[0]})`}}></div>
                <Slide easing="ease" className="slideshow-container">
                  {dogList}
              </Slide>
            //     dogs.map((dog) => (
                /* <div className="each-slide">
                    <div style={{'backgroundImage': `url(${url+dog})`}}></div>
                </div> */

                
            // ))

            /* </div> */
            )

        } else {
            return (<></>)
        }
    }

    return (
        <div>
          {onRender()}
        </div>
      )
}


export default SlideShow