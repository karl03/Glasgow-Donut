import React from 'react'
import ModalMenu from './ModalMenu'
import './AddSectorModal.css'
import '../Admin/AdminSlider'

export default function AddSectorModal(props) {

    function handleSubmit(props){
        const title = document.getElementById("modal-sector-title");
        const value = document.getElementById("modal-sector-value");
        const indicator = document.getElementById("modal-sector-indicator");
        const target = document.getElementById("modal-sector-target");
        const description = document.getElementById("modal-sector-description");
        const cites = document.getElementById("modal-sector-cites");
        const videolink = document.getElementById("modal-sector-videolink");

        if (!isValidForm(title.value)) {
            alert("The sector requires a title!");
            return;
        }

        const New = JSON.parse(JSON.stringify(props.sliderGroups));
        const {ecoOrSoc, gloOrLoc} = props.lastCategorySelect;

        New[ecoOrSoc][gloOrLoc][title.value] = {
            "value": value.value,
            "adjacent": [],
            "indicator": indicator.value,
            "target": target.value,
            "description": description.value,
            "quotes": cites.value,
            "video_hash": videolink.value
        };
        props.setSliderGroups(New);

        title.value = '';
        value.value = '';
        indicator.value = '';
        target.value = '';
        description.value = '';
        cites.value = '';
        videolink.value = '';

        props.setShow(false);
    }

    function isValidForm(title){
        if (title != '') {
            return true;
        }
        else{
            return false;
        }
    }

  return (
    <ModalMenu 
        isShow={props.isShow}
        onClose={() => props.setShow(false)}
        onSave={() => handleSubmit(props)} // TODO: onSave function to pass data from Modal
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
