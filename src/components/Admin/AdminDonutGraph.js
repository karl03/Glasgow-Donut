import React from "react";
import BarChart from "../BarChart/BarChart";

export default function AdminDonutGraph({sliderGroups, size}){
  const [data, SetData] = React.useState({
    ecological: {global: {}, local: {}},
    social: {global: {}, local: {}}
  });
  const [updated, SetUpdated] = React.useState(false);
  React.useEffect(function(){
    const newSliderGroups = JSON.parse(JSON.stringify(sliderGroups));
    newSliderGroups.ecological.global = sliderGroups.ecological.global;
    newSliderGroups.ecological.local = sliderGroups.ecological.local;
    newSliderGroups.social.global = sliderGroups.social.global;
    newSliderGroups.social.local = sliderGroups.social.local;
    SetData(newSliderGroups);
    SetUpdated(true);
  }, [sliderGroups]);

  React.useEffect(function(){
    const IntervalID = window.setInterval(async function(){
      if(!updated) return;
      SetUpdated(false);
      await window.fetch("/api/change-data", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify([data]) //This is inside of an array because in the future there will be an array of these for different years, and that's what the entire program expects
      });
    }, 500);
    return function(){
      window.clearInterval(IntervalID);
    }
  });
  
  return (
    <div data-testid="donut container" style={{height:"max-content"}}>
      <div data-testid="barchart"></div>
      <BarChart data={data} size={size}/>
    </div>
  );
};
