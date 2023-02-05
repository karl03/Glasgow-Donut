import React, { useEffect } from 'react'
import "./Lightbox.css";


export default function LightBox ({trigger, setTrigger, DataProperty, EventProperty}){
  
  const [Name,setName] = React.useState(DataProperty[0]);
  const [Hide, setHidden] = React.useState("circle_hidden");
  const [HideIndicator,setIndicator] = React.useState("hidden");

  useEffect(() => {
    if(trigger==="active"){
      setName(DataProperty[0].split('_').join(' '));
      setTrigger("active")
    }
  });

  function changeState() {
    console.log("LightBox ChangeState function called!");
    if(trigger ==="active"){
      setHidden("circle_hidden");
      setTrigger("hidden")
      document.body.id="show_scroll"
    }
  }

  function additionalCircles() {
    if(Hide=="circle_hidden"){
      setHidden("circle_active");
    }
  }
  
  function showIndicator() {
    if(HideIndicator == "hidden"){
      setIndicator("shown");
    }else{
      setIndicator("hidden");
    }
  }

  return (
    <>
  <div className={trigger} id="lightbox" onClick={changeState}>
  </div>
  <div id="lightbox_wrapper">
    <span className={"circle " + trigger} onClick={additionalCircles}>
      <img id="lightbox_img" onClick={additionalCircles} src={EventProperty?.target?.href?.baseVal ?? 4} alt={DataProperty.Name}/>
      <h1 id="lightbox_title" onClick={additionalCircles}>{Name}</h1>
    </span>
    <span className="circle" id={Hide} onClick={showIndicator}>
      <h1 id="lightbox_title">{DataProperty[1]?.target ?? "why are you here go away"}</h1>
    </span>
  </div>
  </>
    );
  };