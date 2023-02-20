import React, { useEffect } from 'react'
import "./Lightbox.css";


export default function LightBox ({trigger, setTrigger, DataProperty, EventProperty}){
  
  const [Name,setName] = React.useState(DataProperty[0]);
  const [additionalCirclesIsShow, setShowAdditional] = React.useState(false);

  useEffect(() => {
    if(trigger===true){
      setName(DataProperty[0].split('_').join(' '));
      setTrigger(true)
    }
  },[trigger, DataProperty, setTrigger]);

  function changeState() {
    console.log("LightBox ChangeState function called!");
    if(trigger ===true){
      setShowAdditional(false);
      setTrigger(false)
      document.getElementById("primary_circle").style.cursor = 'pointer';
      document.getElementById("Indicator").innerText = 'Indicator';
      document.getElementById("Target").innerText = 'Target';
      document.body.id="show_scroll"
    }
  }

  function additionalCircles() {
    if(additionalCirclesIsShow===false){
      //document.getElementById("primary_circle").style.cursor = 'default';
      setShowAdditional(true);
      console.log("yeah");
    }
  }

  function changeIndicator() {
    if(document.getElementById("Indicator").innerText === 'Indicator'){
      document.getElementById("Indicator").innerText = DataProperty[1]?.indicator ?? "why are you here go away";
      document.getElementById("Indicator").onClick=changeIndicator;
    }else{
      document.getElementById("Indicator").innerText = 'Indicator';
      document.getElementById("Indicator").onClick=changeIndicator;
    }
  }

  function changeTarget(){
    if(document.getElementById("Target").innerText === 'Target'){
      document.getElementById("Target").innerText = DataProperty[1]?.target ?? "why are you here go away";
      document.getElementById("Target").onClick=changeTarget;
    }else{
      document.getElementById("Target").innerText = 'Target';
      document.getElementById("Target").onClick=changeTarget;
    }
  }



  return (
    <>
  <div className={`${trigger ? 'isShow' : 'hidden'}`} id="lightbox" onClick={changeState}>
  </div>

    <span id="primary_circle" className={`circle  ${trigger ? 'isShow' : ''}`} onClick={additionalCircles}>
      <img id="lightbox_img" onClick={additionalCircles} src={EventProperty?.target?.href?.baseVal ?? 4} alt={DataProperty.Name}/>
      <h1 className="lightbox_title" onClick={additionalCircles}>{Name}</h1>
    </span>
    <span  id="right_circle" className={`circle ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={changeTarget}>
      <p id="Target" className="lightbox_title">{"Target"}</p>
    </span>
    <span  id="left_circle" className={`circle  ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={changeIndicator}>
      <p id="Indicator" className="lightbox_title">{"Indicator"}</p>
    </span>
  </>
    );
  };