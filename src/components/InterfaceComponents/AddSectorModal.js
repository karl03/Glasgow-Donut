import React, {useState, useEffect} from 'react'
import ModalMenu from './ModalMenu'
import Select from "react-select";
import './AddSectorModal.css'
import '../Admin/AdminSlider'
import {OnClose, OnSave} from './ModalFunctions'

export default function AddSectorModal({lastCategorySelect,
    lastSliderName,
    isShow,
    SetShow,
    sliderGroups,
    SetSliderGroups}) {

    const [selectedIconOption, SetSelectedIconOption] = useState(null);

    function HandleSubmit(sliderGroups, lastCategorySelect, lastSliderName, SetSliderGroups, SetShow, iconLabel){
        const {ecoOrSoc, gloOrLoc} = lastCategorySelect;
        const ecoOrSocIcon = ecoOrSoc.charAt(0).toUpperCase() + ecoOrSoc.slice(1);
        const gloOrLocIcon = gloOrLoc.charAt(0).toUpperCase() + gloOrLoc.slice(1);
        const icon = `${gloOrLocIcon}_${ecoOrSocIcon}/${iconLabel}`;

        OnSave(sliderGroups, SetSliderGroups, lastSliderName, ecoOrSoc, gloOrLoc, SetShow, icon);
    }

    function HandleClose(SetShow){
        OnClose(SetShow);
    }

    function GetFileNames(folder) {
      return new Promise((resolve, reject) => {
        fetch(`/api/get-icon-filenames/${folder}`)
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

    function IconOptions(lastCategorySelect, sliderGroups, selectedOption, SetSelectedOption) {
        const [iconOptions, SetIconOptions] = useState([]);
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
          SetSelectedOption(null);

          if (lastCategorySelect) {
            function PopulateIcons() {
              let { ecoOrSoc, gloOrLoc } = lastCategorySelect;
              ecoOrSoc = ecoOrSoc.charAt(0).toUpperCase() + ecoOrSoc.slice(1);
              gloOrLoc = gloOrLoc.charAt(0).toUpperCase() + gloOrLoc.slice(1);
              const folder = `${gloOrLoc}_${ecoOrSoc}`;
              
              // Get default Option Value (The one in Data.json)
              let data = sliderGroups[ecoOrSoc.toLowerCase()][gloOrLoc.toLowerCase()][document.getElementById('modal-sector-title').value];
              if (data && data['symbol_id'] && data['symbol_id'] !== "") {
                let defaultValue = data['symbol_id'].split("/")[1]
                SetSelectedOption({label: defaultValue, value: defaultValue, iconUrl: `/api/get-icon/${folder}/${defaultValue}`})
              }

              GetFileNames(folder)
                .then((fileNames) => {
                  const options = fileNames.map((fileName, index) => ({
                    label: fileName,
                    value: fileName,
                    iconUrl: `/api/get-icon/${folder}/${fileName}`,
                  }));
                  SetIconOptions(options);
                })
                .catch((err) => {
                  console.error(err);
                });
            }
            PopulateIcons();
          }
        }, [lastCategorySelect, sliderGroups, SetSelectedOption]);

        const HandleSelectChange = (option) => {
          SetSelectedOption(option);
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
              onChange={HandleSelectChange}
            />
          </>
        );
      } 

  return (
    <ModalMenu 
        isShow={isShow}
        OnClose={() => HandleClose(SetShow)}
        OnSave={() => HandleSubmit(sliderGroups, lastCategorySelect, lastSliderName, SetSliderGroups, SetShow, selectedIconOption === null ? null : selectedIconOption.label)}
        title="Sector Editor"
        canSave={true}
    >
        <form action="" className="add-sector-form" method='post'>

            <label htmlFor="sector-title">Title </label>
            <input type="text" name='title' id='modal-sector-title' className="sector-title" 
                placeholder='Title...' data-testid='add modal title'/>

            <label htmlFor="sector-value">Value </label>
            <input type="number" name="sector-value" id="modal-sector-value"
                max="100" min="-1" placeholder='0' defaultValue='0' data-testid='add modal value'/>
            
            {IconOptions(lastCategorySelect, sliderGroups, selectedIconOption, SetSelectedIconOption)}

            <label htmlFor="sector-indicator">Indicator </label>
            <input type="text" name='indicator' id='modal-sector-indicator' className="sector-indicator"
                placeholder='Category indicator...' data-testid='add modal indicator'/>

            <label htmlFor='sector-indicator-link'>Indicator Hyperlink</label>
            <input type="url" name='indicator-link' id='modal-sector-indicator-link' className='sector-indicator-link'
              placeholder="https://example.com"
              pattern="https://.*"
              data-testid='add modal indicator link'
            />
    
            <label htmlFor="sector-target">Target </label>
            <input type="text" name='target' id='modal-sector-target'className="sector-target"
                placeholder='Category target...'  data-testid='add modal target'/>

            <label htmlFor='sector-target-link'>Target Hyperlink</label>
            <input type="url" name='target-link' id='modal-sector-target-link' className='sector-target-link'
              placeholder="https://example.com"
              pattern="https://.*"
              data-testid='add modal target link'
            />
    
            <label htmlFor="sector-description">Description </label>
            <textarea name="sector-description" id="modal-sector-description" cols="30" rows="10"
                placeholder='Description...' data-testid='add modal description'></textarea>
    
            <label htmlFor="sector-cites">Citations </label>
            <input type="text" name='cites' id='modal-sector-cites' className="sector-cites"
                placeholder="John Smith, 'generic paper', www.JohnSmith.com" data-testid='add modal cites'/>
        
        </form>
    </ModalMenu>
  )
}
