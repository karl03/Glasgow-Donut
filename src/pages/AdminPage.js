import React, { useState } from 'react';
import {Link as LinkR} from 'react-router-dom';
import AdminDonutGraph from "../components/Admin/AdminDonutGraph";
import AdminSliderGroup from '../components/Admin/AdminSliderGroup';
import AdminAddData from '../components/Admin/AdminAddData'
import axios from 'axios';
import ModalMenu from '../components/InterfaceComponents/ModalMenu';
import '../components/Admin/Admin.css'

export default function AdminPage(){
  const [file, setFile] = useState(null);
  const [isShowingModal, setShowingModal] = useState(false);
  const setFilename = useState('Choose File')[1];
  const [sliderGroups, setSliderGroups] = useState({
    ecological: {global: {}, local: {}},
    social: {global: {}, local: {}}
  });

  const [loaded, setLoaded] = useState(false);

	const changeHandler = (e) => {
    const file = e.target.files[0];
    const label = e.target.nextElementSibling;

    setFile(file);
    setFilename(file.name);
    label.textContent = file ? file.name : "File Upload";
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
      alert('Upload Success');

    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
        console.log('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
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

  function addSectorModal(){
    /* Opens a new modal when clicking the 'edit' icon of a slider or the + icon.
        - Should generate a modal for sector modification containing prior data.
          - Upon saving, the old sector should be delete, and the new inserted in its place.

        - If it is a new sector, the Modal is unpopulated.
          - Upon saving, the new sector is added.
    */
    return (
      <ModalMenu
          isShow={isShowingModal}
          onClose={() => setShowingModal(false)}
          onSave={() => setShowingModal(false)} // TODO: onSave function to pass data from Modal
          title="Modal Title"
          >
          <p>This is inside the menu.</p>
          <p>More text</p>
          <p>More text</p>
          <p>More text</p>
        </ModalMenu>
    )
  }

  function quitWithoutSaveModal(){
    /* Opens an warning / query when clicking to leave the editor without saving.
        - A simple message Modal.
    */
    return (
      <ModalMenu
         isShow={isShowingModal}
         onClose={() => setShowingModal(false)}
         onSave={() => setShowingModal(false)} // TODO: onSave function to pass data from Modal
         title="Unsaved Data!"
         >
          <p>There is unsaved changes to the bar chart!</p>
        </ModalMenu>
    )
  }
  
  return (
    <div className="admin-container">
      <header className="admin-header">
        <LinkR to="/" className="admin-back-button">&lt; Back</LinkR>
        <h1 className="admin-title">Gallant Donut Chart Editor</h1>
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
            <AdminDonutGraph sliderGroups={sliderGroups} size={500}/>
          </div>

          <div className="admin-io-container">
            <form className="admin-upload-form" onSubmit={handleUpload}>
            <input className="admin-upload-input" type="file" name='file' id="file" onChange={changeHandler}/>
            <label className="admin-upload-label" for="file">File Upload</label>
            <button className="admin-upload-button">Upload</button>
            </form>
          </div>

        </div>

      </div>

      {/* <div className="modal-manager">
        <button className="DEBUG modal-manager-button" onClick={() => setShowingModal(true)}>DEBUG MODAL MENU</button>
        {true ? addSectorModal(): quitWithoutSaveModal()}        
      </div>
      <AdminAddData addedElementHandler={addedElementHandler}/> */}
    </div>
  );
};
