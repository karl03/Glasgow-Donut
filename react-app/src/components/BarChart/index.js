import React from "react";
import * as d3 from "d3";
import useD3 from "./useD3";
import Data from "./Data.json";
import { image, link } from "d3";

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
export default function BarChart(){
  const ref = useD3(
    async function(svg){
      console.log(Data);

      svg.select("g")?.remove?.(); //TODO: This is to remove the element from last render, probably not a good way of doing this

      const group = svg.append("g")
        .attr("transform", "translate(250, 250)");

      //Chart from https://d3-graph-gallery.com/graph/circular_barplot_label.html
      //MIT licence: https://github.com/holtzy/D3-graph-gallery 

      const innerRadius = 90;
      const outerRadius = 180;   // the outerRadius goes from the middle of the SVG area to the border
      
      
      const yOuter = d3.scaleRadial()
        .range([innerRadius + 16, outerRadius])   // Domain will be define later.
        .domain([0, 100]); // Domain of Y is from 0 to the max seen in the data

      const yInner = d3.scaleRadial()
        .range([innerRadius - 16, 10]) //This is 10 because 
        .domain([0, 100]);
      
      console.log(Data);
      console.log(Data.Inner);
      for(const [Half, Properties] of Object.entries(Data.Inner)){
        const x = d3.scaleBand()
          .range(Half === "Top" ? [-Math.PI / 2., Math.PI / 2.] : [Math.PI / 2., Math.PI * 1.5])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
          .align(0)                  // This does nothing
          .domain(Properties.map(function(d) {return d.Name; })); // The domain of the X axis is the list of states.
        console.log(Properties);
        group.append("g")
          .selectAll("path")
          .data(Properties)
          .enter()
          .append("path")
            .attr("class", "GraphColumn")
            .attr("fill", "#fa7c7e")
            .attr("d", d3.arc()     // imagine your doing a part of a donut plot
              .innerRadius(innerRadius - 16)
              .outerRadius(function(d) { return yInner(d.Value); })
              .startAngle(function(d) { return x(d.Name); })
              .endAngle(function(d) { return x(d.Name) + x.bandwidth(); })
              .padAngle(0.02)
              .padRadius(innerRadius));
        
        group.append("g")
        .selectAll("path")
        .data(Properties)
        .enter()
        .append("path")
          .attr("class", "GraphRingSegment")
          .attr("fill", "#7cff8e")
          .attr("d", d3.arc()
            .innerRadius(innerRadius - 14)
            .outerRadius(innerRadius + 14)
            .startAngle(function(d) { return x(d.Name) - .01; }) //The -.01 is to fix slight gaps
            .endAngle(function(d) { return x(d.Name) + x.bandwidth(); })
            .padAngle(0.)
            .padRadius(innerRadius)
          );
        group.append("g")
          .selectAll("path")
          .data(Properties)
          .enter()
          .append("path")
            .attr("class", "GraphRingSegment")
            .attr("fill", "#3c7f4e")
            .attr("d", d3.arc()
              .innerRadius(innerRadius - 10)
              .outerRadius(innerRadius + 10)
              .startAngle(function(d) { return x(d.Name) - .01; }) //The -.01 is to fix slight gaps
              .endAngle(function(d) { return x(d.Name) + x.bandwidth(); })
              .padAngle(0.)
              .padRadius(innerRadius)
            );

        group
        .append("image")
        .attr("xlink:href", "")
        .attr("width", 10)
        .attr("height", 10)
        .attr("x", 100)
        .attr("y", 100);

        group.append("g")
          .selectAll("g")
          .data(Properties)
          .enter()
            .append("g")
              .attr("text-anchor", function(d) { return "middle";/*(x(d.Name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; */})
              .attr("transform", function(d) {
                const Rotation = ((x(d.Name) + x.bandwidth() / 2) * 180 / Math.PI - 90);
                return "rotate(" + Rotation + ")"+"translate(" + (90) + ",0)" + "rotate(" + -Rotation + ")";
              })
              .append("svg:image")
                .attr('x', -7)
                .attr('y', -7)
                .attr('width', 14)
                .attr('height', 14)
                .attr("xlink:href", function(d){return([AirPollutionB, BioDiversityB, ChemicalPollutionB, ExcessiveFertilizerUseB, FreshwaterWithdrawalB, LandConversionB, OceanAcidificationB, OzoneLayerDepletionB, NetworksB, BuildAndProtectSoilB][d.Name[4]])})
                .style("cursor", "pointer")
                .on("click", function(Event, ElementProperties){
                  console.log(Event, ElementProperties);
                });
            // .append("text")
              // .text(function(d){return(["", "⛰️", "🚰", "🌳", "🍞", "🐟", "✈️", "🔥", "☁️", "☀️"][d.Name[4]])})
            //   //.attr("transform", function(d) { return (x(d.Name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            //   .style("font-size", "11px")
            //   .attr("alignment-baseline", "middle")
            //   .style("user-select", "none")
            //   .style("-webkit-user-select", "none")
            //   .style("cursor", "pointer")
              // .on("click", function(Event, ElementProperties){
              //   console.log(Event, ElementProperties);
              // });
              
      }
      for(const [Half, Properties] of Object.entries(Data.Outer)){
        const x = d3.scaleBand()
          .range(Half === "Top" ? [-Math.PI / 2., Math.PI / 2.] : [Math.PI / 2., Math.PI * 1.5])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
          .align(0)                  // This does nothing
          .domain(Properties.map(function(d) {return d.Name; })); // The domain of the X axis is the list of states.
        group.append("g")
        .selectAll("path")
        .data(Properties)
        .enter()
        .append("path")
        .attr("class", "GraphColumn")
          .attr("fill", "#fa9197")
          .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius + 16)
            .outerRadius(function(d) { return yOuter(d.Value); })
            .startAngle(function(d) { return x(d.Name); })
            .endAngle(function(d) { return x(d.Name) + x.bandwidth(); })
            .padAngle(0.02)
            .padRadius(innerRadius));
      }

      
      /*group.append("g").html(`
        <rect id="Background" width="2000" height="2000" x="-1000" y="-1000" fill="#0000007f" backdrop-filter="url(#SVGBlurFilter)" />
        <circle r="40" fill="white" stroke="black" />
      `);*/
      /*
      group.append()
      // Outer bars
      group.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
          .attr("fill", "#69b3a2")
          .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius + 2)
            .outerRadius(function(d) { return yOuter(d.Outer); })
            .startAngle(function(d) { return xTop(d.Statistic); })
            .endAngle(function(d) { return xTop(d.Statistic) + xTop.bandwidth(); })
            .padAngle(0.05)
            .padRadius(innerRadius));
      
      // Inner bars
      group.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
          .attr("fill", "#69b3a2")
          .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius - 2)
            .outerRadius(function(d) { return yInner(d.Inner); })
            .startAngle(function(d) { return xTop(d.Statistic); })
            .endAngle(function(d) { return xTop(d.Statistic) + xTop.bandwidth(); })
            .padAngle(0.05)
            .padRadius(innerRadius));

      // Add the labels
      group.append("g")
        .selectAll("g")
        .data(data)
        .enter()
          .append("g")
            .attr("text-anchor", function(d) { return (xTop(d.Statistic) + xTop.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((xTop(d.Statistic) + xTop.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (yOuter(d.Outer)+10) + ",0)"; })
          .append("text")
            .text(function(d){return(d.Statistic)})
            .attr("transform", function(d) { return (xTop(d.Statistic) + xTop.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "11px")
            .attr("alignment-baseline", "middle")
      */
    },
    [/*data.length*/]
  )
  return (
    <svg ref={ref} style={{
      height: 500,
      width: 500,
      transform: "scale(1.4)"
    }}>
    </svg>
  );
};
