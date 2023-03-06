import React, {useState, useEffect} from 'react'
import ModalMenu from './ModalMenu'
import Select from "react-select";
import './AddSectorModal.css'
import '../Admin/AdminSlider'
import {onClose, onSave} from '../Admin/ModalFunctions'

export default function AddSectorModal({lastCategorySelect,
    lastSliderName,
    isShow,
    setShow,
    sliderGroups,
    setSliderGroups}) {

    const [selectedIconOption, setSelectedIconOption] = useState(null);

    function handleSubmit(sliderGroups, lastCategorySelect, lastSliderName, setSliderGroups, setShow, iconLabel){
        const {ecoOrSoc, gloOrLoc} = lastCategorySelect;
        const ecoOrSocIcon = ecoOrSoc.charAt(0).toUpperCase() + ecoOrSoc.slice(1);
        const gloOrLocIcon = gloOrLoc.charAt(0).toUpperCase() + gloOrLoc.slice(1);
        const icon = `${gloOrLocIcon}_${ecoOrSocIcon}/${iconLabel}`;

        console.log("handleSubmit: ", lastSliderName);
        onSave(sliderGroups, setSliderGroups, lastSliderName, ecoOrSoc, gloOrLoc, setShow, icon);
    }

    function handleClose(setShow){
        onClose(setShow);
    }

    function getFileNames(folder) {
        return new Promise((resolve, reject) => {
          fetch(`/api/get-filenames/${folder}`) // Replace with your server endpoint
            .then((response) => response.json())
            .then((data) => {
              const fileNames = data;
              resolve(fileNames);
            })
            .catch((err) => {
              console.error(err);
              reject(err);
            });
        });
    }      

    function IconOptions(lastCategorySelect, sliderGroups, selectedOption, setSelectedOption) {
        const [iconOptions, setIconOptions] = useState([]);
        const customSelectStyles = {
          control: (provided) => ({
            ...provided,
            borderRadius: 'none',
            border: 'none',
            boxShadow: 'none'
          }),
        };
      
        useEffect(() => {
          // Set null value to Icon options
          setSelectedOption(null);

          if (lastCategorySelect) {
            let { ecoOrSoc, gloOrLoc } = lastCategorySelect;
            ecoOrSoc = ecoOrSoc.charAt(0).toUpperCase() + ecoOrSoc.slice(1);
            gloOrLoc = gloOrLoc.charAt(0).toUpperCase() + gloOrLoc.slice(1);
            const folder = `${gloOrLoc}_${ecoOrSoc}`;
            
            // Get default Option Value (The one in Data.json)
            let data = sliderGroups[ecoOrSoc.toLowerCase()][gloOrLoc.toLowerCase()][document.getElementById('modal-sector-title').value];
            if (data && data['symbol_id'] && data['symbol_id'] != "") {
              let defaultValue = data['symbol_id'].split("/")[1]
              setSelectedOption({label: defaultValue, value: defaultValue, iconUrl: `/api/get-icon/${folder}/${defaultValue}`})
            }

            getFileNames(folder)
              .then((fileNames) => {
                const options = fileNames.map((fileName, index) => ({
                  label: fileName,
                  value: fileName,
                  iconUrl: `/api/get-icon/${folder}/${fileName}`,
                }));
                setIconOptions(options);
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }, [lastCategorySelect]);

        const handleSelectChange = (option) => {
          setSelectedOption(option);
        };
      
        return (
          <>
            <label htmlFor="sector-icon">Icon </label>
            <Select
              name='icon'
              id="modal-sector-icon"
              styles={customSelectStyles}
              className="my-custom-select"
              options={iconOptions}
              value={selectedOption}
              getOptionLabel={(option) => (
                <>
                  <img src={option.iconUrl} alt={option.label} width="20" height="20" />
                  {"   " + option.label}
                </>
              )}
              getOptionValue={(option) => option.value}
              onChange={handleSelectChange}
            />
          </>
        );
      } 

  return (
    <ModalMenu 
        isShow={isShow}
        onClose={() => handleClose(setShow)}
        onSave={() => handleSubmit(sliderGroups, lastCategorySelect, lastSliderName, setSliderGroups, setShow, selectedIconOption.label)}
        title="Sector Editor"
    >
        <form action="" className="add-sector-form" method='post'>

            <label htmlFor="sector-title">Title </label>
            <input type="text" name='title' id='modal-sector-title' className="sector-title" 
                placeholder='Title...'/>

            <label htmlFor="sector-value">Value </label>
            <input type="number" name="sector-value" id="modal-sector-value"
                max="100" min="0" placeholder='0' defaultValue='0'/>
            
            {IconOptions(lastCategorySelect, sliderGroups, selectedIconOption, setSelectedIconOption)}

            <label htmlFor="sector-indicator">Indicator </label>
            <input type="text" name='indicator' id='modal-sector-indicator' className="sector-indicator"
                placeholder='Category indicator...' />
        
    
            <label htmlFor="sector-target">Target </label>
            <input type="text" name='target' id='modal-sector-target'className="sector-target"
                placeholder='Category target...' />
        
    
            <label htmlFor="sector-description">Description </label>
            <textarea name="sector-description" id="modal-sector-description" cols="30" rows="10"
                placeholder='Description...'></textarea>
        
    
            <label htmlFor="sector-cites">Citations </label>
            <input type="text" name='cites' id='modal-sector-cites' className="sector-cites"
                placeholder="John Smith, 'generic paper', www.JohnSmith.com" />
        
    
            <label htmlFor="sector-videolink">Videolink </label>
            <input type="url" name='video' id="modal-sector-videolink" className="sector-videolink"
                placeholder="https://example.com"
                pattern="https://.*"/>
        
        </form>
    </ModalMenu>
  )
}
