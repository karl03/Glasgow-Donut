import React from "react";
import * as d3 from "d3";

export default function(renderChart, dependencies){
  const ref = React.useRef();
  React.useEffect(function(){
    renderChart(d3.select(ref.current));
    return function(){};
  }, dependencies);
  return ref;
};
