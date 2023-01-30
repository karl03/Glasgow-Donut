import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import useD3 from "./useD3";
import Data from "./Data.json";
import LightBox from "../LightBox";
import "../LightBox/Lightbox.css";
import AirPollutionB from "./Icons/Dimension Icons Global Ecological/AirPollution-black.png"
import BioDiversityB from "./Icons/Dimension Icons Global Ecological/BiodiversityLoss-black.png"
import ChemicalPollutionB from "./Icons/Dimension Icons Global Ecological/ChemicalPollution-black.png"
import ExcessiveFertilizerUseB from "./Icons/Dimension Icons Global Ecological/ExcessiveFertilizerUse-black.png"
import FreshwaterWithdrawalB from "./Icons/Dimension Icons Global Ecological/FreshwaterWithdrawal-black.png"
import LandConversionB from "./Icons/Dimension Icons Global Ecological/LandConversion-black.png"
import OceanAcidificationB from "./Icons/Dimension Icons Global Ecological/OceanAcidification-black.png"
import OzoneLayerDepletionB from "./Icons/Dimension Icons Global Ecological/OzoneLayerDepletion-black.png"
import NetworksB from "./Icons/Dimension Icons Global Social (additional)/Networks-black.png"
import BuildAndProtectSoilB from "./Icons/Dimension Icons Local Ecological/BuildAndProtectSoil-black.png"

//TODO: Refactor this to use more idiomatic react
export default function BarChart({
  size = 500,
  outerRadius = (size / 2) - 20,
  innerRadius = outerRadius / 2,
  ringRadius = 40,
  smallRingRadius = 24,
  margin = 3,
  data = Data
}){
  const [events, eventSetter] = useState({ target: { href: { baseVal: 'Default Value' }}});
  const [elementProperties, propertySetter] = useState({ Name: 'Default Name'});
  const [trigger, setTrigger] = useState("hidden");
  //const [data, setData] = useState(data); Potentially needed for dynamic read-write operations

  function LightBoxTrigger(Event, ElementProperties){
    document.body.scrollTop = 65; // For Safari
    document.documentElement.scrollTop = 65; // For Chrome, Firefox, IE and Opera
    setTrigger("active")
    eventSetter(Event);
    propertySetter(ElementProperties);
    document.body.id="hide_scroll"
  }
  

  function CreateBarChart(svg){

    function SetupBarChart(){
      svg.select("g")?.remove?.(); //TODO: This is to remove the element from last render, probably not a good way of doing this
      
      const group = svg.append("g")
          .attr("transform", "translate(250, 250)");
  
      const yOuter = d3.scaleRadial()
        .range([innerRadius + ringRadius / 2. + margin, outerRadius])   // Domain will be define later.
        .domain([0, 100]); // Domain of Y is from 0 to the max seen in the data
  
      const yInner = d3.scaleRadial()
        .range([innerRadius - ringRadius / 2. - margin, 10]) //This is 10 because the inner part of the graph would become too pointy
        .domain([0, 100]);
  
        return {group, yOuter, yInner};
    }

    let {group, yOuter, yInner} = SetupBarChart();
  
    function SetupBarChartInnerSectors(group, yInner){
      for(const [Half, Properties] of Object.entries(data.Inner)){
          const x = d3.scaleBand()
            .range(Half === "Top" ? [-Math.PI / 2., Math.PI / 2.] : [Math.PI / 2., Math.PI * 1.5])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
            .align(0)                  // This does nothing
            .domain(Properties.map(property => property.Name)); // The domain of the X axis is the list of states.
          
          group.append("g")
            .selectAll("path")
            .data(Properties)
            .enter()
            .append("path")
              .attr("class", "GraphColumn")
              .attr("fill", "#ed7d79")
              .attr("d", d3.arc()     // imagine your doing a part of a donut plot
                .innerRadius(innerRadius - ringRadius / 2. - margin)
                .outerRadius(d => yInner(d.Value))
                .startAngle(d => x(d.Name))
                .endAngle(d => x(d.Name) + x.bandwidth())
                .padAngle(margin / 100.)
                .padRadius(innerRadius));
    
          
          group.append("g")
          .selectAll("path")
          .data(Properties)
          .enter()
          .append("path")
            .attr("class", "GraphRingSegment")
            .attr("fill", "#1e693a")
            .attr("d", d3.arc()
              .innerRadius(innerRadius - ringRadius / 2.)
              .outerRadius(innerRadius + ringRadius / 2.)
              .startAngle(d => x(d.Name) - .01) //The -.01 is to fix slight gaps
              .endAngle(d => x(d.Name) + x.bandwidth())
              .padAngle(0.)
              .padRadius(innerRadius)
            );
            
          group.append("g")
            .selectAll("path")
            .data(Properties)
            .enter()
            .append("path")
              .attr("class", "GraphRingSegment")
              .attr("fill", "#44d345")
              .attr("d", d3.arc()
                .innerRadius(innerRadius - smallRingRadius / 2.)
                .outerRadius(innerRadius + smallRingRadius / 2.)
                .startAngle(d => x(d.Name) - .01 ) //The -.01 is to fix slight gaps
                .endAngle(d => x(d.Name) + x.bandwidth())
                .padAngle(0.)
                .padRadius(innerRadius)
              );
    
          group.append("g")
            .selectAll("g")
            .data(Properties)
            .enter()
              .append("g")
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                  const Rotation = ((x(d.Name) + x.bandwidth() / 2) * 180 / Math.PI - 90);
                  return `rotate(${Rotation}) translate(${innerRadius},0) rotate(${-Rotation})`;
                })
                .append("svg:image")
                  .attr('x', -smallRingRadius / 3.)
                  .attr('y', -smallRingRadius / 3.)
                  .attr('width', smallRingRadius / 1.5)
                  .attr('height', smallRingRadius / 1.5)
                  .attr("xlink:href", function(d){return([AirPollutionB, BioDiversityB, ChemicalPollutionB, ExcessiveFertilizerUseB, FreshwaterWithdrawalB, LandConversionB, OceanAcidificationB, OzoneLayerDepletionB, NetworksB, BuildAndProtectSoilB][d.Name[4]])})
                  .style("cursor", "pointer")
                  .on("click", function(Event, ElementProperties){
                    LightBoxTrigger(Event, ElementProperties);
                  });
        }
    }
  
    function SetupBarChartOuterSectors(group, yOuter){
      for(const [Half, Properties] of Object.entries(data.Outer)){
          const x = d3.scaleBand()
            .range(Half === "Top" ? [-Math.PI / 2., Math.PI / 2.] : [Math.PI / 2., Math.PI * 1.5])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
            .align(0)                  // This does nothing
            .domain(Properties.map(d =>  d.Name)); // The domain of the X axis is the list of states.
          group.append("g")
          .selectAll("path")
          .data(Properties)
          .enter()
          .append("path")
          .attr("class", "GraphColumn")
            .attr("fill", "#fa9197")
            .attr("d", d3.arc()     // imagine your doing a part of a donut plot
              .innerRadius(innerRadius + ringRadius / 2. + margin)
              .outerRadius(d => yOuter(d.Value))
              .startAngle(d =>x(d.Name))
              .endAngle(d => x(d.Name) + x.bandwidth())
              .padAngle(margin / 100.)
              .padRadius(innerRadius))
              .style("cursor", "pointer")
              .on("click", function(Event, ElementProperties){
                LightBoxTrigger(Event, ElementProperties);
                });
        }
    }
  
    SetupBarChartInnerSectors(group, yInner);
    SetupBarChartOuterSectors(group, yOuter);
  }

  const ref = useRef();
  useEffect(() => {
    const svgElement = d3.select(ref.current);
    CreateBarChart(svgElement);
  }, [data]);

  return (
    <>
    <svg ref={ref} style={{
      height: 500,
      width: 500,
      transform: "scale(1.2)",
    }}>
    </svg>
    <LightBox trigger={trigger} setTrigger={setTrigger} DataProperty={elementProperties} EventProperty={events}/>
    </>
  );
};