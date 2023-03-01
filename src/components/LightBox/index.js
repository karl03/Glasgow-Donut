import React, { useEffect } from 'react'
import "./Lightbox.css";


export default function LightBox ({trigger, setTrigger, DataProperty}){
  
  const [Name,setName] = React.useState(DataProperty[0]);
  const [additionalCirclesIsShow, setShowAdditional] = React.useState(false);

  useEffect(() => {
    if(trigger===true){
      setName(DataProperty[0].split('_').join(' '));
      setTrigger(true)
    }
  },[trigger, DataProperty, setTrigger]);

  function changeState() {
    if(trigger ===true){
      setShowAdditional(false);
      setTrigger(false)
      document.getElementById("primary_circle").style.cursor = 'pointer';
      document.getElementById("Indicator").innerText = 'Indicator';
      document.getElementById("Target").innerText = 'Target';
      document.getElementById("Thriving").innerText = 'Thriving';
      document.getElementById("top_circle").style.borderRadius = '90px';
      document.getElementById("top_circle").style.width = '180px';
      document.body.id="show_scroll"
    }
  }

  function additionalCircles() {
    if(additionalCirclesIsShow===false){
      document.getElementById("primary_circle").style.cursor = 'default';
      setShowAdditional(true);
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

  function changeThriving(){
    const circle = document.getElementById("top_circle");
    const text = document.getElementById("Thriving");
    if(text.innerText === 'Thriving'){
      text.innerText = DataProperty[1]?.description ?? "why are you here go away";
      circle.style.borderRadius = '25px';
      circle.style.width = '500px';
    }else{
      text.innerText = 'Thriving';
      circle.style.borderRadius = '90px';
      circle.style.width = '180px';
    }
  }


  return (
    <>
  <div className={`${trigger ? 'isShow' : 'hidden'}`} id="lightbox" onClick={changeState}>
  </div>

  <div className={`grid-container  ${trigger ? 'isShow' : ''}`}>
    <span id="primary_circle" className={`circle  ${trigger ? 'isShow' : ''}`} onClick={additionalCircles}>
      <img id="lightbox_img" onClick={additionalCircles} src={"/api/get-icon/" + DataProperty[1]?.symbol_id ?? 4} alt={DataProperty.Name}/>
      <h1 className="lightbox_title" onClick={additionalCircles}>{Name}</h1>
    </span>
    <span  id="top_circle" className={`circle ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={changeThriving}>
      <p id="Thriving" className="lightbox_title">{"Thriving"}</p>
    </span>
    {/* Just here as a placeholder so the layout is correct */}
    <span  id="bottom_circle" div="center_column" className={`circle ${additionalCirclesIsShow ? 'isShow' : ''}`} /*onClick={showConnections}*/>
      <p id="Connections" className="lightbox_title">{"Connections"}</p>
    </span>
    <span  id="right_circle" className={`circle ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={changeTarget}>
      <p id="Target" className="lightbox_title">{"Target"}</p>
    </span>
    <span  id="left_circle" className={`circle  ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={changeIndicator}>
      <p id="Indicator" className="lightbox_title">{"Indicator"}</p>
    </span>
  </div>
  </>
    );
  };
