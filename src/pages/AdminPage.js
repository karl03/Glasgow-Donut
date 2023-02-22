import React, { useState } from 'react';
import AdminDonutGraph from "../components/Admin/AdminDonutGraph";
import AdminSliderGroup from '../components/Admin/AdminSliderGroup';
import AdminAddData from '../components/Admin/AdminAddData'
import AddSectorModal from '../components/InterfaceComponents/AddSectorModal'
import axios from 'axios';
import '../components/Admin/Admin.css'
import {getFormElements, populateForm, onClose, onSave} from '../components/Admin/ModalFunctions'

export default function AdminPage(){
  const [file, setFile] = useState(null);
  const [lastCategorySelect, setLastCategorySelect] = useState();
  const [isShowingModal, setShowingModal] = useState(false);
  const setFilename = useState('Choose File')[1];
  const [sliderGroups, setSliderGroups] = useState({
    ecological: {global: {}, local: {}},
    social: {global: {}, local: {}}
  });

  const [loaded, setLoaded] = useState(false);

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

  function editSliderHandler(name, ecoOrSoc, gloOrLoc) {
    setShowingModal(true);

  }

  function TESTING(){
    console.log(getFormElements());
    //populateForm();
    //onClose();
  }
  
  return (
    <div className="admin">
      <header className="admin-header">
        <button className="admin-back-button">Back</button>
        <h1 className="admin-title">GALLANT Doughnut Chart Editor</h1>
        <button className="admin-help-button">HELP</button>
      </header>

      <div className="admin-body">

        <div className="admin-left-panel">
          { (function(){
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
                      modalHandles={[setLastCategorySelect, setShowingModal]}
                      key={`AdminSliderGroup${ecoOrSoc}.${gloOrLoc}`}
                    />
                  );
                }
              }
              return Elements;
            })()}
        </div>

        <div className="admin-right-panel">

          <div className="admin-barchart-container">
            <AdminDonutGraph sliderGroups={sliderGroups}/>
          </div>

          <div className="admin-io-container">
            <form onSubmit={handleUpload}>
            <input type="file" name='file' onChange={changeHandler}/>
            <button>Upload</button>
            </form>
          </div>

        </div>

      </div>

      <div className="modal-manager">
        <button className="DEBUG modal-manager-button" onClick={() => setShowingModal(true)}>DEBUG MODAL MENU</button>
        <button onClick={TESTING}>TEST MODAL FUNCTIONS</button>
      </div>
      <AddSectorModal 
        lastCategorySelect={lastCategorySelect}
        isShow={isShowingModal}
        setShow={setShowingModal}
        sliderGroups={sliderGroups}
        setSliderGroups={setSliderGroups}
        ></AddSectorModal>
      <AdminAddData addedElementHandler={addedElementHandler}/>
    </div>
  );
};
