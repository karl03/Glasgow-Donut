import React, { useEffect } from 'react'
import "./Lightbox.css";

export default function LightBox ({trigger, setTrigger, DataProperty, data, setProperty}){
  const [name,SetName] = React.useState(DataProperty[0]);
  const [additionalCirclesIsShow, SetShowAdditional] = React.useState(false);
  const [contextCircleIsShow,SetContextCircle] = React.useState(false);
  const [isTop, SetTop] = React.useState(false);

  useEffect(() => {
    if(trigger===true){
      SetName(DataProperty[0].split('_').join(' '));

      setTrigger(true)
      const stringified = JSON.stringify(DataProperty);
      const top = new Set([...Object.entries(data.ecological.local), ...Object.entries(data.social.local)].map(x => JSON.stringify(x))).has(stringified);

      if(top){
        document.getElementById("lightboxTop").style.backgroundColor = 'rgba(0,0,0,0.6)';
        document.getElementById("lightboxBottom").style.backgroundColor = 'rgba(0,0,0,0.3)';
        document.getElementById("bottom_text").style.color = "white";
        document.getElementById("top_text").style.color = "black";
      }
      else {
        document.getElementById("lightboxBottom").style.backgroundColor = 'rgba(0,0,0,0.6)';
        document.getElementById("lightboxTop").style.backgroundColor = 'rgba(0,0,0,0.3)';
        document.getElementById("top_text").style.color = "white";
        document.getElementById("bottom_text").style.color = "black";
      }
      SetTop(top);

      const circle = document.getElementById("top_circle");
      const text = document.getElementById("Thriving");

      text.innerText = 'Thriving';
      circle.style.borderRadius = '90px';
      circle.style.width = '180px';
    }
  },[trigger, DataProperty, setTrigger, data.social.local, data.ecological.local]);

  function ChangeState() {
    console.log("LightBox ChangeState function called!");
    
    if(trigger ===true){
      SetShowAdditional(false);
      SetContextCircle(false);
      setTrigger(false);
      document.getElementById("primary_circle").style.filter = 'brightness(100%)';
      document.getElementById("lightboxTop").style.backgroundColor = 'rgba(0,0,0,0)';
      document.getElementById("lightboxBottom").style.backgroundColor = 'rgba(0,0,0,0)';
      document.getElementById("primary_circle").style.cursor = 'pointer';
      document.getElementById("Indicator").innerText = 'Indicator';
      document.getElementById("Indicator").style.margin = "auto";
      document.getElementById("Target").style.margin = "auto";
      document.getElementById("Target").innerText = 'Target';
      document.getElementById("Thriving").innerText = 'Thriving';
      document.getElementById("context_circle").style.display = "none";
      document.getElementById("top_circle").style.borderRadius = '90px';
      document.getElementById("top_circle").style.width = '180px';
      document.getElementById("top_text").style.color = "black";
      document.getElementById("bottom_text").style.color = "black";
      document.body.id="show_scroll";

      for(const element of [...document.getElementById("grid-container").querySelectorAll(".small-circle")]) element.remove();
      for(const element of [...document.getElementById("line-canvas").querySelectorAll("#lines")]) element.remove();
      for(const element of [...document.getElementById("right_circle").querySelectorAll("#targetLink")]) element.remove();
      for(const element of [...document.getElementById("left_circle").querySelectorAll("#indicatorLink")]) element.remove();

    }
  }

  function AdditionalCircles() {
    if(additionalCirclesIsShow===false){
      if(document.getElementById("Target").innerText !== 'Target'){
        RemoveLink("Target", "right_circle");
      }

      if(document.getElementById("Indicator").innerText !== 'Indicator'){
        RemoveLink("Indicator", "left_circle");
      }

      SetContextCircle(false);
      SetConnections(false);
      document.getElementById("primary_circle").style.cursor = 'default';
      SetShowAdditional(true);
      document.getElementById("primary_circle").style.filter = 'brightness(80%)';

      if(isTop){
        document.getElementById("lightboxTop").style.backgroundColor = 'rgba(0,0,0,0.7)';
        document.getElementById("lightboxBottom").style.backgroundColor = 'rgba(0,0,0,0.4)';
      }
      else {
        document.getElementById("lightboxBottom").style.backgroundColor = 'rgba(0,0,0,0.7)';
        document.getElementById("lightboxTop").style.backgroundColor = 'rgba(0,0,0,0.4)';
      }
    }
  }

  function ChangeTarget(){
    if(document.getElementById("Target").innerText === 'Target'){
      document.getElementById("Target").innerText = DataProperty[1]?.target ?? "why are you here go away";
      if(DataProperty[1].target_link !== ""){
        CreateLink("Target", "right_circle", DataProperty[1].target_link);
      }
    } else {
      RemoveLink("Target", "right_circle");
    }
  }

  function ChangeIndicator() {
    if(document.getElementById("Indicator").innerText === 'Indicator'){
      document.getElementById("Indicator").innerText = DataProperty[1]?.indicator ?? "why are you here go away";
      if(DataProperty[1].indicator_link !== ""){
        CreateLink("Indicator", "left_circle", DataProperty[1].indicator_link);
      }
    } else {
      RemoveLink("Indicator", "left_circle");
    }
  }

  function CreateLink(destinationText, destinationArea, url){
    document.getElementById(destinationText).style.marginBottom= "12%";
    const link = document.createElement("a");
    link.setAttribute("href",url);
    link.innerText = "Source";
    link.id = destinationText.toLowerCase()+"Link";
    document.getElementById(destinationArea).appendChild(link);
  }

  function RemoveLink(destinationText, destinationArea){
    document.getElementById(destinationText).innerText = destinationText;
      document.getElementById(destinationText).style.margin = "auto";
      for(const element of [...document.getElementById(destinationArea).querySelectorAll("#" + destinationText.toLowerCase() +"Link")]) element.remove();
  }

  function SetConnections(value) {
    if(value){
      SetShowAdditional(false);
      document.getElementById("primary_circle").style.filter = 'brightness(100%)';

      document.getElementById("icon-space").style.width = document.getElementById("grid-container").getBoundingClientRect().width + 'px';
      document.getElementById("icon-space").style.height = document.getElementById("grid-container").getBoundingClientRect().height + 'px';

      document.getElementById("line-canvas").setAttribute("width",document.getElementById("grid-container").getBoundingClientRect().width + 'px');
      document.getElementById("line-canvas").setAttribute("height",document.getElementById("grid-container").getBoundingClientRect().height + 'px');

      let adjacencyList = DataProperty[1]?.adjacent ?? "No adjacencies";
      if (adjacencyList !== "No adjacencies") {
        for(let i=0;i<adjacencyList.length;i++){
          const adjacencyListItem = adjacencyList[i];
          const offsetDimensions = document.getElementById("grid-container").getBoundingClientRect();
          if(adjacencyList[i][0] === "social"){
            const innerDimensions = document.getElementById(adjacencyListItem[2]+"_inner_img").getBoundingClientRect()
            CreateIcon(offsetDimensions, innerDimensions, adjacencyListItem)
          }else{
            const outerDimensions = document.getElementById(adjacencyListItem[2]+"_outer_img").getBoundingClientRect()
            CreateIcon(offsetDimensions, outerDimensions, adjacencyListItem)
          }

        }
        // Add event listener to window object to recall createIcon function when window size changes
        window.addEventListener('resize', () => {
          for(const element of [...document.getElementById("grid-container").querySelectorAll(".small-circle")]) element.remove();
          for(const element of [...document.getElementById("line-canvas").querySelectorAll("#lines")]) element.remove();
          const isShow = document.getElementById('lightboxTop').className === "isShow" || document.getElementById('lightboxBottom').className === "isShow";
          if (isShow) {
            for (let i = 0; i < adjacencyList.length; i++) {
              const adjacencyListItem = adjacencyList[i];
              const offsetDimensions = document.getElementById("line-canvas").getBoundingClientRect();
              if(adjacencyList[i][0] === "social"){
                const innerDimensions = document.getElementById(adjacencyListItem[2]+"_inner_img").getBoundingClientRect()
                CreateIcon(offsetDimensions, innerDimensions, adjacencyListItem)
              }else{
                const outerDimensions = document.getElementById(adjacencyListItem[2]+"_outer_img").getBoundingClientRect()
                CreateIcon(offsetDimensions, outerDimensions, adjacencyListItem)
              }
            }
          }
        });
      }
    } else {
      document.getElementById("Connections").innerText = 'Connections';
      for(const element of [...document.getElementById("grid-container").querySelectorAll(".small-circle")]) element.remove();
      for(const element of [...document.getElementById("line-canvas").querySelectorAll("#lines")]) element.remove();
    }
  }

  function CreateIcon(offsetDimensions, initialDimensions, adjacencyListItem){
    const circle = document.createElement('span');
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    circle.className = "small-circle";
    line.id = "lines";

    const imageUrl = "/api/get-icon/"+data[adjacencyListItem[0]][adjacencyListItem[1]][adjacencyListItem[2]]["symbol_id"];
    circle.style.backgroundImage = `url(${imageUrl})`;

    circle.style.top = (initialDimensions.top - offsetDimensions.top - 5) + 'px';
    circle.style.left = (initialDimensions.left - offsetDimensions.left - 5) + 'px';

    const lineDimensions = document.getElementById("line-canvas").getBoundingClientRect();

    line.setAttributeNS(null, "x1",lineDimensions.width / 2.);
    line.setAttributeNS(null, "y1",lineDimensions.height / 2.);
    line.setAttributeNS(null, "x2",(initialDimensions.left - offsetDimensions.left + 12) + 'px');
    line.setAttributeNS(null, "y2",(initialDimensions.top - offsetDimensions.top + 10) + 'px');
    line.onclick = function(){
      if(document.getElementById("Context").innerText === adjacencyListItem[3]){
        setProperty([adjacencyListItem[2],data[adjacencyListItem[0]][adjacencyListItem[1]][adjacencyListItem[2]]]);
        document.getElementById("primary_circle").style.cursor = 'pointer';
        document.getElementById("top_text","bottom_text").style.color = "black";

        for(const element of [...document.getElementById("grid-container").querySelectorAll(".small-circle")]) element.remove();
        for(const element of [...document.getElementById("line-canvas").querySelectorAll("#lines")]) element.remove();
        for(const element of [...document.getElementById("right_circle").querySelectorAll("#targetLink")]) element.remove();
        for(const element of [...document.getElementById("left_circle").querySelectorAll("#indicatorLink")]) element.remove();
        document.getElementById("context_circle").className = "circle";
      }
      document.getElementById("context_circle").style.display = "flex";
      SetContextCircle(true);
      document.getElementById("Context").innerText = adjacencyListItem[3];
    }
    circle.onclick = line.onclick;
    document.getElementById("icon-space").appendChild(circle);
    document.getElementById("line-canvas").appendChild(line);
  }

  function ChangeThriving(){
    const circle = document.getElementById("top_circle");
    const text = document.getElementById("Thriving");
    if(text.innerText === 'Thriving'){
      text.innerText = DataProperty[1]?.description ?? "why are you here go away";
      circle.style.borderRadius = '25px';
      circle.style.width = 'calc(min(500px, 100vw))';
      circle.style.boxSizing = 'border-box';
    }else{
      text.innerText = 'Thriving';
      circle.style.borderRadius = '90px';
      circle.style.width = '180px';
    }
  }

  return (
    <>
    <div className={`${trigger ? 'isShow' : 'hidden'}`} id="lightboxTop" onClick={ChangeState}></div>
    <div className={`${trigger ? 'isShow' : 'hidden'}`} id="lightboxBottom" onClick={ChangeState}></div>
    <div className="outer_indicators" style ={{top:"12vh"}} ><p id="top_text">GLOBAL </p><p> RESPONSIBILITIES </p></div>
    <div className="outer_indicators" style={{bottom:"3vh"}}><p id="bottom_text">LOCAL </p><p> ASPIRATIONS </p></div>

  <div className={`grid-container  ${trigger ? 'isShow' : ''}`} id="grid-container">
    <div id="icon-space">
      <svg id="line-canvas">
      </svg>
    </div>
    <span id="primary_circle" className={`circle  ${trigger ? 'isShow' : ''}`} onClick={AdditionalCircles}>
      <img id="lightbox_img" onClick={AdditionalCircles} src={"/api/get-icon/" + DataProperty[1]?.symbol_id ?? 4} alt={DataProperty.Name}/>
      <h1 className="lightbox_title" onClick={AdditionalCircles}>{name}</h1>
    </span>
    <span  id="top_circle" className={`circle ${additionalCirclesIsShow ? 'isShow' : ''}`} style={{borderRadius: '90px', width: '180px', boxSizing: 'borderBox'}} onClick={ChangeThriving}>
      <p id="Thriving" className="lightbox_title scrollable">{"Thriving"}</p>
    </span>
    <span  id="right_circle" className={`circle ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={ChangeTarget}>
      <p id="Target" className="lightbox_title">{"Target"}</p>
    </span>
    <span  id="left_circle" className={`circle  ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={ChangeIndicator}>
      <p id="Indicator" className="lightbox_title">{"Indicator"}</p>
    </span>
    <span  id="bottom_circle" div="center_column" className={`circle ${additionalCirclesIsShow ? 'isShow' : ''}`} onClick={()=>SetConnections(true)}>
      <p id="Connections" className="lightbox_title">{"Connections"}</p>
    </span>
    <span  id="context_circle" className={`circle ${contextCircleIsShow ? 'isShow' : ''}`}>
      <p id="Context" className="lightbox_title">{"Context"}</p>
    </span>
  </div>
  </>
    );
  };
