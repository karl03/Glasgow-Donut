import React from "react";
import BarChart from "../BarChart";
import Data from "../../Data.json";

export default function AdminDonutGraph({sliderGroups}){
  const [data/*, setData*/] = React.useState({
    ecological: {global: {}, local: {}},
    social: {global: {}, local: {}}
  });
  React.useEffect(function(){
    const New = {...data};//JSON.parse(JSON.stringify(sliderGroups));
    data.ecological.global = sliderGroups.ecological.global;
    data.ecological.local = sliderGroups.ecological.local;
    data.social.global = sliderGroups.social.global;
    data.social.local = sliderGroups.social.local;
    //setData(New); //todo: removing this may have caused issues @luka
  }, [sliderGroups, data]);
  
  return (
    <div>
      <BarChart data={data} />
    </div>
  );
};