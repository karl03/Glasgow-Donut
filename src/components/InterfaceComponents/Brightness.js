import React, { useState } from 'react'
import './brightness.css'

export default function Brightness() {

    const [brightness, setBrightness] = useState(100);

    function handleSlider(e, setBrightness)
    {
    var container = document.getElementById('container');
    setBrightness(e.target.value);
    console.log(e);
    //document.body.style.filter = "brightness("+brightness+"%)";
}
  return (

    <div style={{top: "0", left: "0", width: "100vw", height: "100vh", zIndex: "1000", position: "fixed", backgroundColor:"rgba(0, 0, 0, " + (brightness / 100) + ")"}}>
    <div class="main">
        <input type="range" id="brightness-range" min="10" max="100" onInput={(e) => {handleSlider(e, setBrightness);}}>
        </input>
    </div>
    </div>  
  )
}
