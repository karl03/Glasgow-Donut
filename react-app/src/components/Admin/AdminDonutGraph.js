import React from "react";
import BarChart from "../BarChart";
import ExampleGraphData from "../BarChart/Data.json";

export default function AdminDonutGraph({sliders}){
  const [data, setData] = React.useState({});
  React.useEffect(function(){
    console.warn(sliders);
    const New = {...ExampleGraphData};
    const Entries = [];
    New.Inner.Top = Entries;
    for(const slider of sliders){
      Entries.push({
        "Name": "" + Math.random(),
        "Value": slider.Value,
        "Indicator": "abc",
        "Target": "abc",
        "Links": []
      });
    }

    setData(New);
  }, [sliders]);
  
  return (
    <div>
      <BarChart data={data} />
    </div>
  );
};