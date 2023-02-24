import React, { useState } from 'react';
import {Link as LinkR} from 'react-router-dom';
import AdminDonutGraph from "../components/Admin/AdminDonutGraph";
import AdminSliderGroup from '../components/Admin/AdminSliderGroup';
import AddSectorModal from '../components/InterfaceComponents/AddSectorModal'
import ModalMenu from '../components/InterfaceComponents/ModalMenu'
import axios from 'axios';
import '../components/Admin/Admin.css'
import {populateForm} from '../components/Admin/ModalFunctions'

export default function AdminPage(){
  const [file, setFile] = useState(null);
  const [isShowingEditModal, setShowingEditModal] = useState(true);
  const [isShowingUploadModal, setShowingUploadModal] = useState(false);
  const setFilename = useState('Choose File')[1];
  const [sliderGroups, setSliderGroups] = useState({
    ecological: {global: {}, local: {}},
    social: {global: {}, local: {}}
  });

  // 'Edit modal' state variables.
  const [lastCategorySelect, setLastCategorySelect] = useState();
  const [lastSliderName, setLastSliderName] = useState();

  const [loaded, setLoaded] = useState(false);

	const changeUploadHandler = (e) => {
    const file = e.target.files[0];
    const label = e.target.nextElementSibling;

    setFile(file);
    setFilename(file.name);
    label.textContent = file ? file.name : "File Upload";
  };

  const showUploadModal = (e) => {
    if (!file) {
      alert("No file upload");
    } else {
      setShowingUploadModal(true);
    }
  }

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('myfile', file);

    try {
      const selectedFolder = document.getElementById("folder").value;
      
      const res = await axios.post(`/api/upload/${selectedFolder}`, formData, {
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


  function deleteSliderHandler(name, ecoOrSoc, gloOrLoc) {
    setSliderGroups(function(oldSliders){
      let New = JSON.parse(JSON.stringify(oldSliders));
      delete New[ecoOrSoc][gloOrLoc][name];
      return New;
    });
  }

  function newSliderHandler(ecoOrSoc, gloOrLoc){
    console.log("newSliderHandler: ", ecoOrSoc,gloOrLoc);
    setLastCategorySelect({ecoOrSoc, gloOrLoc});
    setShowingEditModal(true);
  }

  function editSliderHandler(name, ecoOrSoc, gloOrLoc) {
    console.log("editSliderHandler: ", name, ecoOrSoc, gloOrLoc);
    setLastSliderName(name);
    setLastCategorySelect({ecoOrSoc, gloOrLoc});
    populateForm(sliderGroups, name, ecoOrSoc, gloOrLoc);
    setShowingEditModal(true);
  }

  function addUploadModal(){
    return (
      <ModalMenu
          isShow={isShowingUploadModal}
          onClose={() => setShowingUploadModal(false)}
          onSave={() => setShowingUploadModal(false)} // TODO: onSave function to pass data from Modal
          title="Modal Title"
          >
          <div className='admin-upload-modal'>
            <label>Choose Upload Folder:</label>
            <select style={{marginTop:"20px"}} name="folder" id="folder">
              <option value="Global_Ecological">Global_Ecological</option>
              <option value="Global_Social">Global_Social</option>
              <option value="Local_Ecological">Local_Ecological</option>
              <option value="Local_Social">Local_Social</option>
            </select>
            <button style={{maxHeight:"40px", marginTop:"20px"}} className="admin-upload-button" onClick={handleUpload}>Upload</button>
          </div>
        </ModalMenu>
    )
  }

  function quitUploadModal(){
    return (
      <ModalMenu
         isShow={isShowingUploadModal}
         onClose={() => setShowingUploadModal(false)}
         onSave={() => setShowingUploadModal(false)} // TODO: onSave function to pass data from Modal
         title="Unsaved Data!"
         >
          <p>There is unsaved changes to the upload!</p>
        </ModalMenu>
    )
  }

  function TESTING(sliderGroups, lastCategorySelect){
    const {e, g} = lastCategorySelect;
    populateForm(sliderGroups, 'Hello', e, g);
    //onClose();
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
                      editFunction={editSliderHandler}
                      newFunction={newSliderHandler}
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
            <div className="admin-upload-form">
              <input className="admin-upload-input" type="file" name='file' id="file" onChange={changeUploadHandler}/>
              <label className="admin-upload-label" htmlFor="file">Choose File</label>
              <button className="admin-upload-button" onClick={showUploadModal}>Upload</button>
            </div>
          </div>
        </div>

      </div>
      <div>
        {true ? addUploadModal(): quitUploadModal()}
      </div>
      <div className="modal-manager">
        <button className="DEBUG modal-manager-button" onClick={() => setShowingEditModal(true)}>DEBUG MODAL MENU</button>
        <button onClick={() => TESTING(sliderGroups, lastCategorySelect)}>TEST MODAL FUNCTIONS</button>
      </div>
      <AddSectorModal 
        lastCategorySelect={lastCategorySelect}
        lastSliderName={lastSliderName}
        isShow={isShowingEditModal}
        setShow={setShowingEditModal}
        sliderGroups={sliderGroups}
        setSliderGroups={setSliderGroups}
        ></AddSectorModal>
    </div>
  );
};
