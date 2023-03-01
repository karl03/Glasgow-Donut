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
    while(document.getElementById("lightbox").childElementCount > 0){
      document.getElementById("lightbox").removeChild(document.getElementById("lightbox").lastChild)
    }
    
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
        for(let i=0;i<adjacencyList.length;i++){
          if(adjacencyList[i][0] == "social"){
            const inner_dimensions = document.getElementById(adjacencyList[i][2]+"_inner_img").getBoundingClientRect()
            
            console.log(adjacencyList)
            console.log(data[adjacencyList[i][0]][adjacencyList[i][1]][adjacencyList[i][2]]["symbol_id"])
            console.log(inner_dimensions);

            const container = document.createElement('svg');
            const image = document.createElement('img')
            image.setAttribute("src","/api/get-icon/"+data[adjacencyList[i][0]][adjacencyList[i][1]][adjacencyList[i][2]]["symbol_id"])
            image.setAttribute("height",inner_dimensions["height"])
            image.setAttribute("width",inner_dimensions["width"])
            
            container.appendChild(image)
            document.getElementById("lightbox").appendChild(container)
            
          }else{
            const outer_dimensions = document.getElementById(adjacencyList[i][2]+"_outer_img").getBoundingClientRect()
            console.log(document.getElementById(adjacencyList[i][2]+"_outer_img").getBoundingClientRect());
            const container = document.createElement('svg');
            const image = document.createElement('img')
            image.setAttribute("src","/api/get-icon/"+data[adjacencyList[i][0]][adjacencyList[i][1]][adjacencyList[i][2]]["symbol_id"])
            image.setAttribute("height",outer_dimensions["height"])
            image.setAttribute("width",outer_dimensions["width"])
            container.appendChild(image)
            document.getElementById("lightbox").appendChild(container)
          }

        }
        
        

        
      }
    } else {
      document.getElementById("Connections").innerText = 'CONNECTIONS';
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
    <span  id="bottom_circle" div="center_column" className={`circle ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={changeConnections}>
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
