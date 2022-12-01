import React from "react";
import BarChart from "../BarChart";

export default function AdminDonutGraph({sliderGroups}){
  const [data, setData] = React.useState({
    "Inner": {"Top": [], "Bottom": []},
    "Outer": {"Top": [], "Bottom": []}
  });
  React.useEffect(function(){
    const New = {...data};
    for(let i = 0; i < 4; ++i){
      const Entries = [];
      New[(i & 2) === 0 ? "Inner" : "Outer"][(i & 1) === 0 ? "Top" : "Bottom"] = Entries;
      const sliders = sliderGroups[i];
      let j = 0;
      for(const slider of sliders){
        Entries.push({
          "Name": `${j++}`,
          "Value": slider.Value,
          "Indicator": "abc",
          "Target": "abc",
          "Links": []
        });
      }
    }
    setData(New);
  }, [sliderGroups]);
  
  return (
    <div>
      <BarChart data={data} />
    </div>
  );
};