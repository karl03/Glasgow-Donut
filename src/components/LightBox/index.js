import React, { useEffect } from 'react'
import "./Lightbox.css";


export default function LightBox ({trigger, setTrigger, DataProperty, EventProperty}){
  useEffect(() => {
    if(trigger==="active"){
      setTrigger("active")
    }
  });

  function changeState() {
    console.log("LightBox ChangeState function called!");
    if(trigger ==="active"){
      setTrigger("hidden")
      document.body.id="show_scroll"
    }
  }

  return (
  <div className={trigger} onClick={changeState}>
    <span id="circle">
      <img id="lightbox_img" src={EventProperty?.target?.href?.baseVal ?? 4} alt={DataProperty.Name}/>
      <h1 id="lightbox_title">{DataProperty.Name}</h1>
      </span>
  </div>
    );
  };