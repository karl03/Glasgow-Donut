import React, { useEffect } from 'react'
import "./Lightbox.css";


export default function LightBox ({trigger, setTrigger, DataProperty, EventProperty}){
  
  const [Name,setName] = React.useState(DataProperty[0]);
  const [Hide, setHidden] = React.useState("circle_hidden");

  useEffect(() => {
    if(trigger==="active"){
      console.log(DataProperty);
      console.log(EventProperty);
      setName(DataProperty[0].split('_').join(' '));
      setTrigger("active")
    }
  },[trigger, DataProperty, setTrigger]);

  function changeState() {
    console.log("LightBox ChangeState function called!");
    if(trigger ==="active"){
      setHidden("circle_hidden");
      setTrigger("hidden")
      document.getElementById("primary_circle").style.cursor = 'pointer';
      document.getElementById("Indicator").innerText = 'Indicator';
      document.getElementById("Target").innerText = 'Target';
      document.body.id="show_scroll"
    }
  }

  function additionalCircles() {
    if(Hide==="circle_hidden"){
      document.getElementById("primary_circle").style.cursor = 'default';
      setHidden("circle_active");
    }
  }

  function changeIndicator() {
    if(document.getElementById("Indicator").innerText === 'Indicator'){
      document.getElementById("Indicator").innerText = DataProperty[1]?.indicator ?? "why are you here go away";
    }else{
      document.getElementById("Indicator").innerText = 'Indicator';
    }
  }

  function changeTarget(){
    if(document.getElementById("Target").innerText === 'Target'){
      document.getElementById("Target").innerText = DataProperty[1]?.target ?? "why are you here go away";
    }else{
      document.getElementById("Target").innerText = 'Target';
    }
  }



  return (
    <>
  <div className={trigger} id="lightbox" onClick={changeState}>
  </div>

    <span id="primary_circle" className={"circle " + trigger} onClick={additionalCircles}>
      <img id="lightbox_img" onClick={additionalCircles} src={"/api/get-icon/" + DataProperty[1]?.symbol_id ?? 4} alt={DataProperty.Name}/>
      <h1 className="lightbox_title" onClick={additionalCircles}>{Name}</h1>
    </span>
    <span  id="right_circle" className={"circle " + Hide} onClick={changeTarget}>
      <p id="Target" className="lightbox_title">{"Target"}</p>
    </span>
    <span  id="left_circle" className={"circle " + Hide} onClick={changeIndicator}>
      <p id="Indicator" className="lightbox_title">{"Indicator"}</p>
    </span>
  </>
    );
  };