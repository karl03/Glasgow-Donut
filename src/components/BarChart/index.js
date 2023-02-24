import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import LightBox from "../LightBox";
import "../LightBox/Lightbox.css";
//TODO: Refactor this to use more idiomatic react
export default function BarChart({
  size = 500,
  data = null//Data[0]
}){
  const outerRadius = (size / 2) - 20;
  const innerRadius = outerRadius / 2;
  const ringRadius = size / 7;
  const smallRingRadius = size / 9.33;
  const margin = 3;
  const [events, eventSetter] = useState({ target: { href: { baseVal: 'Default Value' }}});
  const [elementProperties, propertySetter] = useState({ Name: 'Default Name'});
  const [trigger, setTrigger] = useState(false);
  //const [data, setData] = useState(data); Potentially needed for dynamic read-write operations
  const ref = useRef();
  const innerTextRadius = innerRadius - (ringRadius + smallRingRadius) / 4;
  const outerTextRadius = innerRadius + (ringRadius + smallRingRadius) / 4;
  useEffect(() => {

    function LightBoxTrigger(Event, ElementProperties){
      document.body.scrollTop = 65; // For Safari
      document.documentElement.scrollTop = 65; // For Chrome, Firefox, IE and Opera
      setTrigger(true)
      eventSetter(Event);
      propertySetter(ElementProperties);
      document.body.id="hide_scroll"
    }

    function CreateBarChart(svg){

      function SetupBarChart(){
        svg.select("g")?.remove?.(); //TODO: This is to remove the element from last render, probably not a good way of doing this
        
        const group = svg.append("g")
          .attr("transform", "translate(" + size / 2 + "," + size / 2 + ")");
    
        const yOuter = d3.scaleRadial()
          .range([innerRadius + ringRadius / 2. + margin, outerRadius])   // Domain will be define later.
          .domain([0, 100]); // Domain of Y is from 0 to the max seen in the data
    
        const yInner = d3.scaleRadial()
          .range([innerRadius - ringRadius / 2. - margin, 10]) //This is 10 because the inner part of the graph would become too pointy
          .domain([0, 100]);
    
          return {group, yOuter, yInner};
      }

      let {group, yOuter, yInner} = SetupBarChart();

      var Tooltip = d3.select(".svgClass")
            .append("text")
            .attr("class", "tooltip")
            .style("fill", "black")
            .style("font-size", "12px")
            .style("pointer-events", "none")
          
          var mouseover = function(event, data) {
            Tooltip
              .style("opacity", 1)
            d3.select(this)
              .style("stroke", "black")
            if(document.getElementById(data[0]+"_outer")){
              document.getElementById(data[0]+"_outer").setAttribute("fill","blue")
            } else if(document.getElementById(data[0]+"_inner")){
              document.getElementById(data[0]+"_inner").setAttribute("fill","blue")
            }
              //.style("opacity", 1)
          }
          var mousemove = function(event, data) {
            Tooltip
              .html("Value: " + data[1].indicator)
              .attr("x", (event.offsetX + 20))
              .attr("y", (event.offsetY + 20))
          }
          var mouseleave = function(event, data) {
            Tooltip
              .style("opacity", 0)
            d3.select(this)
              .style("stroke", "none")
            if(document.getElementById(data[0]+"_outer")){
              document.getElementById(data[0]+"_outer").setAttribute("fill","#fa9197")
            } else if(document.getElementById(data[0]+"_inner")){
              document.getElementById(data[0]+"_inner").setAttribute("fill","#ed7d79")
              }
              //.style("opacity", 0.8)
          }
    
      function SetupBarChartInnerSectors(group, yInner){
        
        function CreateGraphColumnInner(Properties, group, xScale, yInner){
          group.append("g")
              .selectAll("path")
              .data(Properties)
              .enter()
              .append("path")
                .attr("class", "GraphColumn")
                .attr("fill", "#ed7d79")
                .attr("id", d=>d[0]+"_inner")
                .attr("d", d3.arc()     // imagine your doing a part of a donut plot
                  .innerRadius(innerRadius - ringRadius / 2. - margin)
                  .outerRadius(d => yInner(d[1].value))
                  .startAngle(d => xScale(d[0]))
                  .endAngle(d => xScale(d[0]) + xScale.bandwidth())
                  .padAngle(margin / 100.)
                  .padRadius(innerRadius));
        }

        function CreateRingSegment(Properties, group, xScale){
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
                .startAngle(d => xScale(d[0]) - .01) //The -.01 is to fix slight gaps
                .endAngle(d => xScale(d[0]) + xScale.bandwidth())
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
                .startAngle(d => xScale(d[0]) - .01 ) //The -.01 is to fix slight gaps
                .endAngle(d => xScale(d[0]) + xScale.bandwidth())
                .padAngle(0.)
                .padRadius(innerRadius)
              );
        }


        function CreateIconRing(Properties, group, xScale){
          group.append("g")
              .selectAll("g")
              .data(Properties)
              .enter()
                .append("g")
                  .attr("text-anchor", "middle")
                  .attr("transform", function(d) {
                    const Rotation = ((xScale(d[0]) + xScale.bandwidth() / 2) * 180 / Math.PI - 90);
                    return `rotate(${Rotation}) translate(${smallRingRadius*1.9},0) rotate(${-Rotation})`;
                  })
                .append("svg:image")
                  .attr('x', -smallRingRadius + 10)
                  .attr('y', -smallRingRadius + 13)
                  .attr('width', smallRingRadius / 3)
                  .attr('height', smallRingRadius / 3)
                  .attr("xlink:href", function(d){return `/api/get-icon/${d[1].symbol_id}`;})
                  .style("cursor", "pointer")
                  .attr('transform', `translate(${ringRadius / 2}, ${ringRadius / 2})`)
                  .on("mouseover", mouseover)
                  .on("mousemove", mousemove)
                  .on("mouseleave", mouseleave)
                  .on("click", function(Event, ElementProperties){
                    if(window.location.pathname === '/') { //to be changed when giving website away or url changes to proper one
                      LightBoxTrigger(Event, ElementProperties);
                    }
                  });
                    
            // All Text Labeling of Bar Chart --------
            group.append("path")
              .attr("id", "arc-top") //Unique id of the path
              .attr("d", `M -${innerTextRadius},0 A ${innerTextRadius} ${innerTextRadius} 0 0 1 ${innerTextRadius} 0`) //SVG path
              .attr("dy", ".1em")
              .style("fill", "none")
              .style("stroke", "0");

            group.append("g")
              .append("text")
              .append("textPath")
                .attr("xlink:href", "#arc-top")
                .style("alignment-baseline", "middle")
                .style("dominant-baseline", "middle")
                .style("fill", "white")
                .style("font-size", 12 + "px")
                .style("letter-spacing", "0.001em")
                .style("text-anchor","middle")
                .attr("startOffset", "50%")
                .text("GLOBAL SOCIAL FOUNDATION");

            group.append("path")
              .attr("id", "arc-bottom") //Unique id of the path
              .attr("d", `M -${innerTextRadius},0 A ${innerTextRadius} ${innerTextRadius} 0 0 0 ${innerTextRadius} 0`) //SVG path
              .style("fill", "none")
              .style("stroke", "0");
          
            group.append("g")
              .append("text")
              .append("textPath")
                .attr("xlink:href", "#arc-bottom")
                .style("alignment-baseline", "middle")
                .style("dominant-baseline", "middle")
                .style("fill", "white")
                .style("font-size", 12 + "px")
                .style("letter-spacing", "0.001em")
                .style("text-anchor","middle")
                .attr("startOffset", "50%")
                .attr("dy", ".1em")
                .text("LOCAL SOCIAL FOUNDATION");

            group.append("path")
                .attr("id", "lower-arc-bottom") //Unique id of the path
                .attr("d", `M -${outerTextRadius},0 A ${outerTextRadius} ${outerTextRadius} 0 0 0 ${outerTextRadius} 0`) //SVG path
                .style("fill", "none")
                .style("stroke", "0");

            group.append("g")
                .append("text")
                .append("textPath")
                  .attr("xlink:href", "#lower-arc-bottom")
                  .style("alignment-baseline", "middle")
                  .style("dominant-baseline", "middle")
                  .style("fill", "white")
                  .style("font-size", 12 + "px")
                  .style("letter-spacing", "0.001em")
                  .style("text-anchor","middle")
                  .attr("startOffset", "50%")
                  .attr("dy", ".1em")
                  .text("LOCAL ECOLOGICAL GENEROSITY");


            group.append("path")
              .attr("id", "upper-arc-top") //Unique id of the path
              .attr("d", `M -${outerTextRadius},0 A ${outerTextRadius} ${outerTextRadius} 0 0 1 ${outerTextRadius} 0`) //SVG path
              .style("fill", "none")
              .style("stroke", "0");

            group.append("g")
              .append("text")
              .append("textPath")
                .attr("xlink:href", "#upper-arc-top")
                .style("alignment-baseline", "middle")
                .style("dominant-baseline", "middle")
                .style("fill", "white")
                .style("font-size", 12 + "px")
                .style("letter-spacing", "0.001em")
                .style("text-anchor","middle")
                .attr("startOffset", "50%")
                .attr("dy", ".1em")
                .text("GLOBAL ECOLOGICAL CEILING");
        }

        for(const [Half, Properties] of Object.entries(data.social)){
            const xScale = d3.scaleBand()
              // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
              .range(Half === "global" ? [-Math.PI / 2., Math.PI / 2.] : [Math.PI / 2., Math.PI * 1.5])
              .align(0)                  // This does nothing
              .domain(Object.keys(Properties)); // The domain of the X axis is the list of states.
            const PropertiesEntries = Object.entries(Properties);
            CreateGraphColumnInner(PropertiesEntries, group, xScale, yInner);
            CreateRingSegment(PropertiesEntries, group, xScale);
            CreateIconRing(PropertiesEntries, group, xScale);
          }
      }

        
    
      function SetupBarChartOuterSectors(group, yOuter){

        function CreateGraphColumnOuter(Properties, group, xScale, yOuter){
          group.append("g")
          .selectAll("path")
          .data(Properties)
          .enter()
          
          .append("path")
          .attr("class", "GraphColumn")
            .attr("fill", "#fa9197")
            .attr("id", d=>d[0]+"_outer")
            .attr("d", d3.arc()     // imagine your doing a part of a donut plot
              .innerRadius(innerRadius + ringRadius / 2. + margin)
              .outerRadius(d => yOuter(d[1].value))
              .startAngle(d =>xScale(d[0]))
              .endAngle(d => xScale(d[0]) + xScale.bandwidth())
              .padAngle(margin / 100.)
              .padRadius(innerRadius))
              .style("cursor", "pointer")
              .on("click", function(Event, ElementProperties){
                if(window.location.pathname === '/') { //to be changed when giving website away or url changes to proper one
                  LightBoxTrigger(Event, ElementProperties);
                }
              });
        }

        function CreateIconRing(Properties, group, xScale){
          group.append("g")
              .selectAll("g")
              .data(Properties)
              .enter()
                .append("g")
                  .attr("text-anchor", "middle")
                  .attr("transform", function(d) {
                    const Rotation = ((xScale(d[0]) + xScale.bandwidth() / 2) * 180 / Math.PI - 90);
                    return `rotate(${Rotation}) translate(${smallRingRadius*2.45},0) rotate(${-Rotation})`;
                  })
                .append("svg:image")
                  .attr('x', -smallRingRadius + 10)
                  .attr('y', -smallRingRadius + 13)
                  .attr('width', smallRingRadius / 3)
                  .attr('height', smallRingRadius / 3)
                  .attr("xlink:href", function(d){return `/api/get-icon/${d[1].symbol_id}`;})
                  .style("cursor", "pointer")
                  .attr('transform', `translate(${ringRadius / 2}, ${ringRadius / 2})`)
                  .on("mouseover", mouseover)
                  .on("mousemove", mousemove)
                  .on("mouseleave", mouseleave)
                  .on("click", function(Event, ElementProperties){
                    if(window.location.pathname === '/') { //to be changed when giving website away or url changes to proper one
                      LightBoxTrigger(Event, ElementProperties);
                    }
                  });
          }

        for(const [Half, Properties] of Object.entries(data.ecological)){
            const xScale = d3.scaleBand()
              .range(Half === "global" ? [-Math.PI / 2., Math.PI / 2.] : [Math.PI / 2., Math.PI * 1.5])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
              .align(0)                  // This does nothing
              .domain(Object.keys(Properties)); // The domain of the X axis is the list of states.
              
            
            const PropertiesEntries = Object.entries(Properties);
            CreateGraphColumnOuter(PropertiesEntries, group, xScale, yOuter);
            CreateIconRing(PropertiesEntries, group, xScale);
          }
      }


    
      
      SetupBarChartInnerSectors(group, yInner);
      SetupBarChartOuterSectors(group, yOuter);
    }

    const svgElement = d3.select(ref.current);
    CreateBarChart(svgElement);
  }, [data, innerRadius, margin, outerRadius, ringRadius, smallRingRadius, innerTextRadius, outerTextRadius, size]);

  return (
    <>
    <svg className = "svgClass" ref={ref} width={size} height={size} style={{
      height: size.toString(),
      width: size.toString(),
    }}>
    </svg>
    <LightBox trigger={trigger} setTrigger={setTrigger} DataProperty={elementProperties} EventProperty={events}/>
    </>
  );
};
