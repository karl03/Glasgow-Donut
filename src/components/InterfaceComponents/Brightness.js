import React, { useState } from 'react'
import './brightness.css'

export default function Brightness() {

    const [brightness, setBrightness] = useState(100);

    function handleSlider(e, setBrightness)
    {
    var container = document.getElementById('container');
    setBrightness(e.value);
    container.setAttribute("style", "filter: brightness("+brightness+"%);");
}
  return (

    <div id="container">
    <div class="main">
        <input type="range" id="brightness-range" min="10" max="100" onchange={(e) => handleSlider(e, setBrightness)}>
        </input>
    </div>
    </div>  
  )
}
