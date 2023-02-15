import React from 'react'
import ModalMenu from './ModalMenu'
import './AddSectorModal.css'
import '../Admin/AdminSlider'

export default function AddSectorModal(props) {

    function getFormData(){
        const formElements = {
         "title" : document.getElementById("modal-sector-title"),
         "value" : document.getElementById("modal-sector-value"),
         "indicator" : document.getElementById("modal-sector-indicator"),
         "target" : document.getElementById("modal-sector-target"),
         "description" : document.getElementById("modal-sector-description"),
         "cites" : document.getElementById("modal-sector-cites"),
         "videolink" : document.getElementById("modal-sector-videolink")
        };

        let formData = {};
        for (var key in formElements){
            formData[key] = formElements[key].value;
            formElements[key].value = '';
        }

        return formData;
    }

    function isValidForm(title){
        if (title != '') {
            return true;
        }
        else{
            return false;
        }
    }

    function handleSubmit(props){
        const {title, value, indicator, target, description, cites, videolink} = getFormData();

        if (!isValidForm(title.value)) {
            alert("The sector requires a title!");
            return;
        }

        const New = JSON.parse(JSON.stringify(props.sliderGroups));
        const {ecoOrSoc, gloOrLoc} = props.lastCategorySelect;

        New[ecoOrSoc][gloOrLoc][title] = {
            "value": value,
            "adjacent": [],
            "indicator": indicator,
            "target": target,
            "description": description,
            "quotes": cites,
            "video_hash": videolink
        };
        props.setSliderGroups(New);

        props.setShow(false);
    }

    function handleClose(props){
        getFormData();
        props.setShow(false);
    }

  return (
    <ModalMenu 
        isShow={props.isShow}
        onClose={() => handleClose(props)}
        onSave={() => handleSubmit(props)}
        title="Sector Editor"
    >
        <form action="" className="add-sector-form" method='post'>

            <label for="sector-title">Title </label>
            <input type="text" name='title' id='modal-sector-title' className="sector-title" 
                placeholder='Title...'/>

            <label for="sector-value">Value </label>
            <input type="number" name="sector-value" id="modal-sector-value"
                max="100" min="0" placeholder='0' defaultValue='0'/>


            <label for="sector-indicator">Indicator </label>
            <input type="text" name='indicator' id='modal-sector-indicator' className="sector-indicator"
                placeholder='Category indicator...' />
        
    
            <label for="sector-target">Target </label>
            <input type="text" name='target' id='modal-sector-target'className="sector-target"
                placeholder='Category target...' />
        
    
            <label for="sector-description">Description </label>
            <textarea name="sector-description" id="modal-sector-description" cols="30" rows="10"
                placeholder='Description...'></textarea>
        
    
            <label for="sector-cites">Citations </label>
            <input type="text" name='cites' id='modal-sector-cites' className="sector-cites"
                placeholder="John Smith, 'generic paper', www.JohnSmith.com" />
        
    
            <label for="sector-videolink">Videolink </label>
            <input type="url" name='video' id="modal-sector-videolink" className="sector-videolink"
                placeholder="https://example.com"
                pattern="https://.*"/>
        
        </form>
    </ModalMenu>
  )
}
