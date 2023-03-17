import React, { useState } from 'react';
import {Link as LinkR} from 'react-router-dom';
import AdminDonutGraph from "../components/Admin/AdminDonutGraph";
import AdminSliderGroup from '../components/Admin/AdminSliderGroup';
import AddSectorModal from '../components/InterfaceComponents/AddSectorModal'
import AdjacencyModal from '../components/InterfaceComponents/AdjacencyModal'
import ModalMenu from '../components/InterfaceComponents/ModalMenu'
import axios from 'axios';
import '../components/Admin/Admin.css'
import {PopulateForm} from '../components/InterfaceComponents/ModalFunctions'

export default function AdminPage(){
  const [file, SetFile] = useState(null);
  const [isShowingEditModal, SetShowingEditModal] = useState(false);
  const [isShowingAdjModal, SetShowingAdjModal] = useState(false);
  const [isShowingUploadModal, SetShowingUploadModal] = useState(false);
  const SetFilename = useState('Choose File')[1];
  const [sliderGroups, SetSliderGroups] = useState({
    ecological: {global: {}, local: {}},
    social: {global: {}, local: {}}
  });

  // 'Edit modal' state variables.
  const [lastCategorySelect, SetLastCategorySelect] = useState();
  const [lastSliderName, SetLastSliderName] = useState();

  const [loaded, SetLoaded] = useState(false);

	const changeUploadHandler = (e) => {
    const file = e.target.files[0];
    const label = e.target.nextElementSibling;

    SetFile(file);
    SetFilename(file.name);
    label.textContent = file ? file.name : "File Upload";
  };

  const ShowUploadModal = (e) => {
    if (!file) {
      alert("No file upload");
    } else {
      SetShowingUploadModal(true);
    }
  }

  const HandleUpload = async (e) => {
    const formData = new FormData();
    formData.append('myfile', file);

    try {
      const selectedFolder = document.getElementById("folder").value;
      
      await axios.post(`/api/upload-icon/${selectedFolder}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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

  const ReportUpload = async (e) => {
    try {
      // Call the delete-all API to delete all files in the specified folder
      await axios.delete('/api/delete-all/Report');

      // Upload Report File
      const formData = new FormData();
      formData.append('myfile', file);

      await axios.post(`/api/upload-report`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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
    async function GetData(){
      const loadedData = (await (await fetch("/api/get-data")).json())[0];
      SetSliderGroups(loadedData);
      SetLoaded(true);
    }
    if(!loaded) GetData();
  }, [loaded]);

  function ChangeSliderHandler(ecoOrSoc, gloOrLoc, name, newValue){
    const newSliderGroups = JSON.parse(JSON.stringify(sliderGroups));
    newSliderGroups[ecoOrSoc][gloOrLoc][name].value = Number.parseInt(newValue);
    SetSliderGroups(newSliderGroups)
  }

  function DeleteSliderHandler(name, ecoOrSoc, gloOrLoc) {
    SetSliderGroups(function(oldSliders){
      let New = JSON.parse(JSON.stringify(oldSliders));
      delete New[ecoOrSoc][gloOrLoc][name];
      return New;
    });
  }

  function NewSliderHandler(ecoOrSoc, gloOrLoc){
    SetLastCategorySelect({ecoOrSoc, gloOrLoc});
    SetShowingEditModal(true);
  }

  function EditSliderHandler(name, ecoOrSoc, gloOrLoc) {
    SetLastSliderName(name);
    SetLastCategorySelect({ecoOrSoc, gloOrLoc});
    PopulateForm(sliderGroups, name, ecoOrSoc, gloOrLoc);
    SetShowingEditModal(true);
  }

  function EditAdjHandler(name, ecoOrSoc, gloOrLoc){
    SetLastSliderName(name);
    SetLastCategorySelect({ecoOrSoc, gloOrLoc});
    SetShowingAdjModal(true);
  }

  function AddUploadModal(){
    return (
      <ModalMenu
          isShow={isShowingUploadModal}
          OnClose={() => SetShowingUploadModal(false)}
          OnSave={HandleUpload}
          title="Upload Model"
          canSave={true}
          >
          <div className='admin-upload-modal'>
            <label>Choose Upload Folder:</label>
            <select style={{marginTop:"20px"}} name="folder" id="folder">
              <option value="Global_Ecological">Global_Ecological</option>
              <option value="Global_Social">Global_Social</option>
              <option value="Local_Ecological">Local_Ecological</option>
              <option value="Local_Social">Local_Social</option>
            </select>
            <button style={{marginTop:"2vh"}} className="admin-report-button" onClick={ReportUpload}>Upload Report</button>
          </div>
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
              const elements = [];
              for(const [ecoOrSoc, gloAndLoc] of Object.entries(sliderGroups)){
                for(const [gloOrLoc, sliders] of Object.entries(gloAndLoc)){
                  elements.push(
                    <AdminSliderGroup
                      sliders={sliders}
                      sliderGroups={sliderGroups}
                      ecoOrSoc={ecoOrSoc}
                      gloOrLoc={gloOrLoc}
                      ChangeSliderHandler={ChangeSliderHandler}
                      DeleteFunction={DeleteSliderHandler}
                      EditFunction={EditSliderHandler}
                      NewFunction={NewSliderHandler}
                      AdjFunction={EditAdjHandler}
                      key={`AdminSliderGroup${ecoOrSoc}.${gloOrLoc}`}
                    />
                  );
                }
              }
              return elements;
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
              <button className="admin-upload-button" onClick={ShowUploadModal}>Upload</button>
            </div>
          </div>
        </div>

      </div>
      <div>
        {AddUploadModal()}
      </div>

      <AddSectorModal 
        lastCategorySelect={lastCategorySelect}
        SetLastSliderName={SetLastSliderName}
        lastSliderName={lastSliderName}
        isShow={isShowingEditModal}
        SetShow={SetShowingEditModal}
        sliderGroups={sliderGroups}
        SetSliderGroups={SetSliderGroups}
      ></AddSectorModal>

      <AdjacencyModal
        lastCategorySelect={lastCategorySelect} 
        lastSliderName={lastSliderName}
        isShow={isShowingAdjModal}
        SetShow={SetShowingAdjModal}
        sliderGroups={sliderGroups}
        SetSliderGroups={SetSliderGroups}
      ></AdjacencyModal>
    </div>
  );
};
