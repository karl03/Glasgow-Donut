import React, { useState } from 'react';
import { AdminAddDataContainer, AdminContainer, AdminDataListing, AdminDonutGraphContainer } from './AdminElements';
//import AdminSlider from "./AdminSlider";
//import ReactDOM from "react-dom";
import Data from "../BarChart/Data.json"; //This is temporary
import AdminDonutGraph from "./AdminDonutGraph";
import AdminAddData from "./AdminAddData";
import AdminSliderGroup from './AdminSliderGroup';


export default function AdminMain(){
  //const [state, setState] = useState({});
  const [sliderGroups, setSliderGroups] = useState([
    Data.Inner.Top,
    Data.Inner.Bottom,
    Data.Outer.Top,
    Data.Outer.Bottom
  ]);

  
  const eventHandler = React.useCallback(function(groupID, name, event){
    const newValue = Number.parseInt(event);
    setSliderGroups(function(oldSliders){
      const New = JSON.parse(JSON.stringify(oldSliders));
      for(const slider of New[groupID]){
        if(slider.Name === name){
          slider.Value = newValue;
          break;
        }
      }
      return New;
    });
  }, []);

  const addedElementHandler = React.useCallback(function(groupID, name){
    setSliderGroups(function(oldSliders){
      const New = JSON.parse(JSON.stringify(oldSliders));
      New[groupID].push({
        "Name": name,
        "Value": Math.round(Math.random() * 100.),
        "Indicator": "abc",
        "Target": "abc",
        "Links": []
      });
      return New;
    });
  }, []);
  
  return (
    <AdminContainer>
      <AdminDataListing> 
        <h1>Graph Components</h1>
        {
          sliderGroups.map((sliders, groupID) =>{
            return <AdminSliderGroup
              sliders={sliders}
              groupID={groupID}
              eventHandler={eventHandler}
              key={`AdminSliderGroup${groupID}`}
            />
          })
        }
      </AdminDataListing>
      <AdminDonutGraphContainer>
        <AdminDonutGraph sliderGroups={sliderGroups}/>
      </AdminDonutGraphContainer>
      <AdminAddDataContainer>
        <h1>Options for adding new data here</h1>
        <AdminAddData addedElementHandler={addedElementHandler}/>
      </AdminAddDataContainer>
    </AdminContainer>
  );
};