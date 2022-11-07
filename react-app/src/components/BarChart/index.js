import React from "react";
import * as d3 from "d3";
import useD3 from "./useD3";

//TODO: Refactor this to use more idiomatic react
export default function BarChart(){
  const ref = useD3(
    async function(svg){

      const data = await d3.dsv(",", "http://voxel.rs/Test/Data.csv", (d) => {
        return {
          Statistic: d.Statistic,
          Outer: +d.Outer,
          Inner: +d.Inner,
        };
      });
      console.log(data);
      
      svg.select("g")?.remove?.(); //TODO: This is to remove the element from last render, probably not a good way of doing this

      const group = svg.append("g")
        .attr("transform", "translate(250, 250)");

      //Chart from https://d3-graph-gallery.com/graph/circular_barplot_label.html
      //MIT licence: https://github.com/holtzy/D3-graph-gallery 

      const innerRadius = 75;
      const outerRadius = 175;   // the outerRadius goes from the middle of the SVG area to the border
        

      const x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing
        .domain(data.map(function(d) { return d.Statistic; })); // The domain of the X axis is the list of states.
      const yOuter = d3.scaleRadial()
        .range([innerRadius + 2, outerRadius])   // Domain will be define later.
        .domain([0, 200]); // Domain of Y is from 0 to the max seen in the data

      const yInner = d3.scaleRadial()
        .range([innerRadius - 2, 0])
        .domain([0, 100]);

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
            .startAngle(function(d) { return x(d.Statistic); })
            .endAngle(function(d) { return x(d.Statistic) + x.bandwidth(); })
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
            .startAngle(function(d) { return x(d.Statistic); })
            .endAngle(function(d) { return x(d.Statistic) + x.bandwidth(); })
            .padAngle(0.05)
            .padRadius(innerRadius));

      // Add the labels
      group.append("g")
        .selectAll("g")
        .data(data)
        .enter()
          .append("g")
            .attr("text-anchor", function(d) { return (x(d.Statistic) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.Statistic) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (yOuter(d.Outer)+10) + ",0)"; })
          .append("text")
            .text(function(d){return(d.Statistic)})
            .attr("transform", function(d) { return (x(d.Statistic) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "11px")
            .attr("alignment-baseline", "middle")

    },
    [/*data.length*/]
  )
  return (
    <svg ref={ref} style={{
      height: 500,
      width: 500,
      marginRight: "0px",
      marginLeft: "0px"
    }}>
    </svg>
  );
};
