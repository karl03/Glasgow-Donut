import React, { useState } from 'react';
import { AdminAddDataContainer, AdminContainer, AdminDataListing, AdminDonutGraphContainer } from './AdminElements';
import AdminSlider from "./AdminSlider";
import ReactDOM from "react-dom";
import ExampleSliders from "./ExampleSliders.json"; //This is temporary
import AdminDonutGraph from "./AdminDonutGraph";
import AdminAddData from "./AdminAddData";


export default function(){
  //const [state, setState] = useState({});
  const [sliders, setSliders] = useState(ExampleSliders);

  function eventHandler(index){
    return function(event){
      const newValue = Number.parseInt(event);
      setSliders(function(oldSliders){
        const New = [...oldSliders];
        New[index].Value = newValue;
        return New;
      });
    };
  }

  function addedElementHandler(event){
    setSliders(function(oldSliders){
      return [...oldSliders, {
        "Name": event,
        "Factor": "idk",
        "Value": Math.floor(Math.random() * 100.)
      }];
    });
  }
  
  return (
    <AdminContainer>
      <AdminDataListing> 
        <h1>List Data here</h1>
        {
          sliders.map((slider, index) => (
            <AdminSlider
              handleEvent={eventHandler(index)} //This index should probably be some unique id so it's easier to delete elements
              initialValue={slider.Value}
              initialName={slider.Name}
              initialFactor={slider.Factor}
              key={"AdminSliders" + index}
            />
          ))
        }
      </AdminDataListing>
      <AdminDonutGraphContainer>
        <AdminDonutGraph state={sliders}/>
      </AdminDonutGraphContainer>
      <AdminAddDataContainer>
        <h1>Options for adding new data here</h1>
        <AdminAddData addedElementHandler={addedElementHandler}/>
      </AdminAddDataContainer>
    </AdminContainer>
  );
};