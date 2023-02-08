import React, { useState } from 'react';
import { AdminAddDataContainer, AdminContainer, AdminDataListing, AdminDonutGraphContainer, AdminUploadFileContainer } from './AdminElements';
import AdminDonutGraph from "./AdminDonutGraph";
import AdminAddData from "./AdminAddData";
import AdminSliderGroup from './AdminSliderGroup';
import axios from 'axios';


export default function AdminMain(){
  const [file, setFile] = useState(null);
  const [isShowingModal, setShowingModal] = useState(false);
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

  const [sliderGroups, setSliderGroups] = useState({
    ecological: {global: {}, local: {}},
    social: {global: {}, local: {}}
  });

  const [loaded, setLoaded] = useState(false);
  
  React.useEffect(function(){
    async function getData(){
      const LoadedData = (await (await fetch("/api/get-data")).json())[0];
      setSliderGroups(LoadedData);
      setLoaded(true);
    }
    if(!loaded) getData();
  }, [loaded]);

  
  const eventHandler = React.useCallback(function(ecoOrSoc, gloOrLoc, type, name, newValue){
    switch(type){
      case "value":{
        const NewValue = Number.parseInt(newValue);
        setSliderGroups(function(oldSliders){
          //Make a deep copy of the object (avoids React's State)
          const New = JSON.parse(JSON.stringify(oldSliders));
          New[ecoOrSoc][gloOrLoc][name].value = NewValue;
          return New;
        });
        break;
      }
      default: throw new Error("Not implemented!"); //TODO: Remove this in release
    }
  }, []);

  const addedElementHandler = React.useCallback(function(ecoOrSoc, gloOrLoc, name){
    setSliderGroups(function(oldSliders){
      const New = JSON.parse(JSON.stringify(oldSliders));
      New[ecoOrSoc][gloOrLoc][name] = {
        "value": Math.round(Math.random() * 100.),
        "adjacent":[["ecological","local","fresh_water","ocean acidification affects the water quality"],["social","local","water","ocean acidification affects water"]],
        "indicator":"this is the indicator",
        "target":"aim to make it a better category",
        "description":"how much acid in the ocean",
        "quotes":"These are the quotes/citations",
        "video_hash":"I77B871YOTQ"
      };
      return New;
    });
  }, []);

  function deleteSliderHandler(name, ecoOrSoc, gloOrLoc) {
    setSliderGroups(function(oldSliders){
      let New = JSON.parse(JSON.stringify(oldSliders));
      delete New[ecoOrSoc][gloOrLoc][name];
      return New;
    });
  }
  
  return (
    <AdminContainer>
      
      <AdminDataListing>
        <h1>Graph Components</h1>
        {
          (function(){
            const Elements = [];
            for(const [ecoOrSoc, gloAndLoc] of Object.entries(sliderGroups)){
              for(const [gloOrLoc, sliders] of Object.entries(gloAndLoc)){
                Elements.push(
                  <AdminSliderGroup
                    sliders={sliders}
                    ecoOrSoc={ecoOrSoc}
                    gloOrLoc={gloOrLoc}
                    eventHandler={eventHandler}
                    deleteFunction={deleteSliderHandler}
                    key={`AdminSliderGroup${ecoOrSoc}.${gloOrLoc}`}
                  />
                );
              }
            }
            return Elements;
          })()
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
