import React from "react";
import BarChart from "../BarChart";

export default function AdminDonutGraph({sliderGroups, size}){
  const [data, setData] = React.useState({
    ecological: {global: {}, local: {}},
    social: {global: {}, local: {}}
  });
  const [updated, setUpdated] = React.useState(false);
  React.useEffect(function(){
    const New = JSON.parse(JSON.stringify(sliderGroups));
    New.ecological.global = sliderGroups.ecological.global;
    New.ecological.local = sliderGroups.ecological.local;
    New.social.global = sliderGroups.social.global;
    New.social.local = sliderGroups.social.local;
    setData(New);
    setUpdated(true);
  }, [sliderGroups]);

  React.useEffect(function(){
    const IntervalID = window.setInterval(async function(){
      if(!updated) return;
      setUpdated(false);
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
