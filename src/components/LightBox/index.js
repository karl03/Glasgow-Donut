import React from 'react'
import "./Lightbox.css";

export default function LightBox ({DataProperty, EventProperty}){
  const [style,SetActive] = React.useState("lightbox.active");
  console.log("hello")
  function changeState({}) {
    
    if(style=="lightbox.hidden"){
      style="lightbox.active"
    }else{
      style="lightbox.hidden"
    }
  }
  return (

      // lightbox.classList.add('active')
      // const heading = document.createElement('h1')
      // const img = document.createElement('img');
      // img.src = Event.target.href.baseVal;
      // heading.innerText = ElementProperties.Name;
      // lightbox.appendChild(heading)
      // lightbox.appendChild(img)
  //     });

  <div id={style}>
    <h1>{DataProperty.Name}</h1>
    <img src={EventProperty.target.href.baseVal}/>
  </div>

    );
  };