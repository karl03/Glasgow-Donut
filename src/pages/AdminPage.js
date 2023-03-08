import React, { useState } from 'react';
import {Link as LinkR} from 'react-router-dom';
import AdminDonutGraph from "../components/Admin/AdminDonutGraph";
import AdminSliderGroup from '../components/Admin/AdminSliderGroup';
import AddSectorModal from '../components/InterfaceComponents/AddSectorModal'
import AdjacencyModal from '../components/InterfaceComponents/AdjacencyModal'
import ModalMenu from '../components/InterfaceComponents/ModalMenu'
import axios from 'axios';
import '../components/Admin/Admin.css'
import {populateForm} from '../components/Admin/ModalFunctions'

export default function AdminPage(){
  const [file, setFile] = useState(null);
  const [isShowingEditModal, setShowingEditModal] = useState(false);
  const [isShowingAdjModal, setShowingAdjModal] = useState(false);
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

  function changeSliderHandler(ecoOrSoc, gloOrLoc, name, newValue){
    const newSliderGroups = JSON.parse(JSON.stringify(sliderGroups));
    newSliderGroups[ecoOrSoc][gloOrLoc][name].value = Number.parseInt(newValue);
    setSliderGroups(newSliderGroups)
  }

  function deleteSliderHandler(name, ecoOrSoc, gloOrLoc) {
    setSliderGroups(function(oldSliders){
      let New = JSON.parse(JSON.stringify(oldSliders));
      delete New[ecoOrSoc][gloOrLoc][name];
      return New;
    });
  }

  function newSliderHandler(ecoOrSoc, gloOrLoc){
    setLastCategorySelect({ecoOrSoc, gloOrLoc});
    setShowingEditModal(true);
  }

  function editSliderHandler(name, ecoOrSoc, gloOrLoc) {
    setLastSliderName(name);
    setLastCategorySelect({ecoOrSoc, gloOrLoc});
    populateForm(sliderGroups, name, ecoOrSoc, gloOrLoc);
    setShowingEditModal(true);
  }

  function editAdjHandler(name, ecoOrSoc, gloOrLoc){
    setLastSliderName(name);
    setLastCategorySelect({ecoOrSoc, gloOrLoc});
    setShowingAdjModal(true);
  }

  function addUploadModal(){
    return (
      <ModalMenu
          isShow={isShowingUploadModal}
          onClose={() => setShowingUploadModal(false)}
          onSave={handleUpload}
          title="Upload Model"
          >
          <div className='admin-upload-modal'>
            <label>Choose Upload Folder:</label>
            <select style={{marginTop:"20px"}} name="folder" id="folder">
              <option value="Global_Ecological">Global_Ecological</option>
              <option value="Global_Social">Global_Social</option>
              <option value="Local_Ecological">Local_Ecological</option>
              <option value="Local_Social">Local_Social</option>
            </select>
            {/* <button style={{maxHeight:"40px", marginTop:"20px"}} className="admin-upload-button" onClick={handleUpload}>Upload</button> */}
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
                      sliderGroups={sliderGroups}
                      ecoOrSoc={ecoOrSoc}
                      gloOrLoc={gloOrLoc}
                      changeSliderHandler={changeSliderHandler}
                      deleteFunction={deleteSliderHandler}
                      editFunction={editSliderHandler}
                      newFunction={newSliderHandler}
                      adjFunction={editAdjHandler}
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

      <AddSectorModal 
        lastCategorySelect={lastCategorySelect}
        setLastSliderName={setLastSliderName}
        lastSliderName={lastSliderName}
        isShow={isShowingEditModal}
        setShow={setShowingEditModal}
        sliderGroups={sliderGroups}
        setSliderGroups={setSliderGroups}
      ></AddSectorModal>

      <AdjacencyModal
        lastCategorySelect={lastCategorySelect} 
        lastSliderName={lastSliderName}
        isShow={isShowingAdjModal}
        setShow={setShowingAdjModal}
        sliderGroups={sliderGroups}
        setSliderGroups={setSliderGroups}
      ></AdjacencyModal>
    </div>
  );
};
