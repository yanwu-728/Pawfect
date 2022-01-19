import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Filter.css";

const Filter = (props) => {
    let options = ['Retrievers (Labrador)', 'French Bulldogs', 'German Shepherd Dogs', 'Retrievers (Golden) ', 'Bulldogs', 'Poodles ', 'Beagles', 'Rottweilers', 'Pointers (German Shorthaired)', 'Dachshunds', 'Pembroke Welsh Corgis', 'Australian Shepherds', 'Yorkshire Terriers', 'Boxers', 'Great Danes', 'Siberian Huskies', 'Cavalier King Charles Spaniels', 'Doberman Pinschers', 'Miniature Schnauzers', 'Shih Tzu', 'Boston Terriers', 'Bernese Mountain Dogs', 'Pomeranians', 'Havanese', 'Cane Corso', 'Spaniels (English Springer)', 'Shetland Sheepdogs', 'Brittanys', 'Pugs', 'Spaniels (Cocker)', 'Miniature American Shepherds', 'Border Collies', 'Mastiffs', 'Chihuahuas', 'Vizslas', 'Basset Hounds', 'Belgian Malinois', 'Maltese', 'Weimaraners', 'Collies', 'Newfoundlands', 'Rhodesian Ridgebacks', 'Shiba Inu', 'West Highland White Terriers', 'Bichons Frises', 'Bloodhounds', 'Spaniels (English Cocker)', 'Akitas', 'Portuguese Water Dogs', 'Retrievers (Chesapeake Bay)', 'Dalmatians', 'St. Bernards', 'Papillons', 'Australian Cattle Dogs', 'Bullmastiffs', 'Samoyeds', 'Scottish Terriers', 'Soft Coated Wheaten Terriers', 'Whippets', 'Pointers (German Wirehaired)', 'Chinese Shar-Pei', 'Airedale Terriers', 'Wirehaired Pointing Griffons', 'Bull Terriers', 'Alaskan Malamutes', 'Cardigan Welsh Corgis', 'Giant Schnauzers', 'Old English Sheepdogs', 'Italian Greyhounds', 'Great Pyrenees', 'Dogues de Bordeaux', 'Russell Terriers', 'Cairn Terriers', 'Irish Wolfhounds', 'Setters (Irish)', 'Greater Swiss Mountain Dogs', 'Miniature Pinschers', 'Lhasa Apsos', 'Chinese Crested', 'Coton de Tulear', 'Staffordshire Bull Terriers', 'American Staffordshire Terriers', 'Rat Terriers', 'Chow Chows', 'Anatolian Shepherd Dogs', 'Basenjis', 'Spaniels (Boykin)', 'Lagotti Romagnoli', 'Brussels Griffons', 'Retrievers (Nova Scotia Duck Tolling)', 'Norwegian Elkhounds', 'Standard Schnauzers', 'Dogo Argentinos', 'Bouviers des Flandres', 'Pekingese', 'Keeshonden', 'Border Terriers', 'Leonbergers', 'Tibetan Terriers', 'Neapolitan Mastiffs', 'Setters (English)', 'Retrievers (Flat-Coated)', 'Borzois', 'Fox Terriers (Wire)', 'Miniature Bull Terriers', 'Belgian Tervuren', 'Setters (Gordon)', 'Silky Terriers', 'Norwich Terriers', 'Spinoni Italiani', 'Japanese Chin', 'Welsh Terriers', 'Toy Fox Terriers', 'Schipperkes', 'Parson Russell Terriers', 'Pointers', 'Belgian Sheepdogs', 'Tibetan Spaniels', 'American Eskimo Dogs', 'Irish Terriers', 'Beaucerons', 'Afghan Hounds', 'Boerboels', 'Fox Terriers (Smooth)', 'Bearded Collies', 'Black Russian Terriers', 'Black and Tan Coonhounds', 'Spaniels (Welsh Springer)', 'American Hairless Terriers', 'Norfolk Terriers', 'Xoloitzcuintli', 'Manchester Terriers', 'Kerry Blue Terriers', 'Australian Terriers', 'Spaniels (Clumber)', 'Lakeland Terriers', 'Bluetick Coonhounds', 'English Toy Spaniels', 'German Pinschers', 'Tibetan Mastiffs', 'Bedlington Terriers', 'Greyhounds', 'Pulik', 'Salukis', 'Barbets', 'Redbone Coonhounds', 'Swedish Vallhunds', 'Sealyham Terriers', 'Spanish Water Dogs', 'Briards', 'Berger Picards', 'Entlebucher Mountain Dogs', 'Treeing Walker Coonhounds', 'Icelandic Sheepdogs', 'Wirehaired Vizslas', 'Pumik', 'Portuguese Podengo Pequenos', 'Spaniels (American Water)', 'Retrievers (Curly-Coated)', 'Spaniels (Field)', 'Lowchen', 'Nederlandse Kooikerhondjes', 'Affenpinschers', 'Petits Bassets Griffons Vendeens', 'Finnish Lapphunds', 'Scottish Deerhounds', 'Plott Hounds', 'Norwegian Buhunds', 'Glen of Imaal Terriers', 'Setters (Irish Red and White)', 'Ibizan Hounds', 'Spaniels (Sussex)', 'Bergamasco Sheepdogs', 'Spaniels (Irish Water)', 'Polish Lowland Sheepdogs', 'Otterhounds', 'Kuvaszok', 'Komondorok', 'Cirnechi dell Etna', 'Pharaoh Hounds', 'Dandie Dinmont Terriers', 'Pyrenean Shepherds', 'Skye Terriers', 'Canaan Dogs', 'American English Coonhounds', 'Chinooks', 'Finnish Spitz', 'Grand Basset Griffon Vendeens', 'Sloughis', 'Harriers', 'Cesky Terriers', 'American Foxhounds', 'Azawakhs', 'English Foxhounds', 'Norwegian Lundehunds'];
    return (
        <html>
            <body>
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
                    
                    <div className="filter-date">
                        <p>Date:</p>
                        <DatePicker defaultValue={null} onChange={props.changeDate} />
                    </div>
                    
                    <div className="filter-location">
                        <label htmlFor="locations">Location:</label>
                        <select defaultValue={props.defaultText} selected name="locations" id="locations" onChange={props.changeLocation}>
                            {/* <option value="none" selected disabled hidden>Please Select</option> */}
                            <option value="No Preference">No Preference</option>
                            <option value="MIT">MIT</option>
                            <option value="Harvard">Harvard</option>
                            <option value="Central Squre">Central Square</option>
                            <option value="Back Bay">Back Bay</option>
                        </select>
                    </div>
                </div>
            </body>
        </html>
        
    )
}

export default Filter;