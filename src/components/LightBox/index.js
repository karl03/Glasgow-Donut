import React, { useEffect } from 'react'
import "./Lightbox.css";

// currently can only be clicked once before refreshing

var click = true;

export default function LightBox ({trigger,DataProperty, EventProperty}){
  const [style, SetActive] = React.useState("hidden");

  console.log(style)
  console.log(trigger)
  console.log(click)

  useEffect(() => {
    if(trigger==="active" && style==="hidden" && click === true){
      SetActive("active")
      click = true;
    }
  }); //this will be replaced

  if(click===false && style==="active"){
    click = true;
  }

  function changeState() {
    console.log("LightBox ChangeState function called!");
    if(style ==="active"){
      console.log("am i here?")
      SetActive("hidden")
      trigger="hidden";
      click = false;
    }
  }

  return (

  <div className={style} onClick={changeState}>
    <h1 id="lightbox_title">{DataProperty.Name}</h1>
    <img id="lightbox_img" src={EventProperty?.target?.href?.baseVal ?? 4}/>
  </div>

    );
  };

  export const clicked = {click};
