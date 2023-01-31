import React from "react";
import BarChart from "../BarChart";

export default function AdminDonutGraph({sliderGroups}){
  const [data, setData] = React.useState({
    ecological: {global: {}, local: {}},
    social: {global: {}, local: {}}
  });
  React.useEffect(function(){
    const New = JSON.parse(JSON.stringify(sliderGroups));
    New.ecological.global = sliderGroups.ecological.global;
    New.ecological.local = sliderGroups.ecological.local;
    New.social.global = sliderGroups.social.global;
    New.social.local = sliderGroups.social.local;
    setData(New);
  }, [sliderGroups, data]);
  
  return (
    <div>
      <BarChart data={data} />
    </div>
  );
};
