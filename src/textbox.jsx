import React from 'react';
const TextBox = (props) => {
 
    return ( 
        <div>
        <input  type="text" id='myInput' placeholder="Longitude/Latitude" />
        <button id='myButton' onClick={props.getCoordinates} >Go</button>
        
        </div>
     );
}
 
export default TextBox;