import React, { useState } from 'react';
import { AdminAddDataContainer, AdminContainer, AdminDataListing, AdminDonutGraphContainer, AdminUploadFileContainer } from './AdminElements';
//import AdminSlider from "./AdminSlider";
//import ReactDOM from "react-dom";
import Data from "../BarChart/Data.json"; //This is temporary
import AdminDonutGraph from "./AdminDonutGraph";
import AdminAddData from "./AdminAddData";
import AdminSliderGroup from './AdminSliderGroup';
import axios from 'axios';


export default function AdminMain(){
  const [file, setFile] = useState(null);
  //const [filename, setFilename] = useState('Choose File');
  const setFilename = useState('Choose File')[1];
	const changeHandler = (e) => {
		setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
	};

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myfile', file);

    try {
      console.log(file)
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { fileName, filePath } = res.data;

      console.log(fileName);
      console.log(filePath);

    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

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
  })

  function deleteSliderHandler(id, groupID) {
    setSliderGroups(function(oldSliders){
      let New = JSON.parse(JSON.stringify(oldSliders));
      New[groupID] = New[groupID].filter(function(item){
          return item.id != id;  
      })
      return New;
    })
  }
  
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
              deleteFunction={deleteSliderHandler}
              key={`AdminSliderGroup${groupID}`}
            />
          })
        }
      </AdminDataListing>
      <AdminDonutGraphContainer>
        <AdminDonutGraph sliderGroups={sliderGroups}/>
      </AdminDonutGraphContainer>
      <AdminAddDataContainer>
        <p>Options for adding new data here</p>
        <AdminAddData addedElementHandler={addedElementHandler}/>
      </AdminAddDataContainer>
      <AdminUploadFileContainer>
        <form onSubmit={handleUpload}>
          <input type="file" name='file' onChange={changeHandler}/>
          <button>Upload</button>
        </form>
      </AdminUploadFileContainer>
    </AdminContainer>
  );
};