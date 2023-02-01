import React, { useEffect } from 'react'
import "./Lightbox.css";


export default function LightBox ({trigger, setTrigger, DataProperty, EventProperty}){
  
  const [Name,setName] = React.useState(DataProperty[0]);

  useEffect(() => {
    if(trigger==="active"){
      setName(DataProperty[0].split('_').join(' '));
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
      <div id="lightbox_wrapper">
        <img id="lightbox_img" src={EventProperty?.target?.href?.baseVal ?? 4} alt={DataProperty.Name}/>
        <h1 id="lightbox_title">{Name}</h1>
      </div>
    </span>
  </div>
    );
  };