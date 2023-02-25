import React, { useEffect } from 'react'
import "./Lightbox.css";
import * as d3 from "d3";


export default function LightBox ({trigger, setTrigger, DataProperty, data}){
  
  // const xScale = d3.scaleBand()
  //   .range(Half === "global" ? [-Math.PI / 2., Math.PI / 2.] : [Math.PI / 2., Math.PI * 1.5])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
  //   .align(0)                  // This does nothing
  //   .domain(Object.keys(Properties));

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
    }
  }

  function changeTarget(){
    if(document.getElementById("Target").innerText === 'TARGET'){
      document.getElementById("Target").innerText = DataProperty[1]?.target ?? "why are you here go away";
    } else {
      document.getElementById("Target").innerText = 'TARGET';
    }
  }

  function changeIndicator() {
    if(document.getElementById("Indicator").innerText === 'INDICATOR'){
      document.getElementById("Indicator").innerText = DataProperty[1]?.indicator ?? "why are you here go away";
    } else {
      document.getElementById("Indicator").innerText = 'INDICATOR';
    }
  }

  function changeConnections() {
    if(document.getElementById("Connections").innerText === 'CONNECTIONS'){
      setShowAdditional(false);
      let adjacencyList = DataProperty[1]?.adjacent ?? "No adjacencies";
      // ****Continue here for connections feature!!!***

      if (adjacencyList != "No adjacencies") {
        
      }
    } else {
      document.getElementById("Connections").innerText = 'CONNECTIONS';
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
        <span  id="right_circle" className={`circle ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={changeTarget}>
          <h1 id="Target" className="lightbox_title">{"TARGET"}</h1>
        </span>
        <span  id="left_circle" className={`circle  ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={changeIndicator}>
          <h1 id="Indicator" className="lightbox_title">{"INDICATOR"}</h1>
        </span>
        <span  id="bottom_circle" className={`circle  ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={changeConnections}>
          <h1 id="Connections" className="lightbox_title">{"CONNECTIONS"}</h1>
        </span>
      </div>
  </>
    );
  };