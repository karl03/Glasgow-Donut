import React from 'react'
import "./Lightbox.css";

export default function LightBox ({DataProperty, EventProperty}){
  const [style, SetActive] = React.useState("active");

  function changeState() {
    console.log("LightBox ChangeState function called!");
    if(style=="lightbox.hidden"){
      style="lightbox.active"
    }else{
      style="lightbox.hidden"
    }
  }
  return (

  <div className='active' onClick={changeState}>
    <h1>{DataProperty.Name}</h1>
    <img src={EventProperty?.target?.href?.baseVal ?? 4}/>
  </div>

    );
  };