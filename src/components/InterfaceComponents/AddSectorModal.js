import React from 'react'
import ModalMenu from './ModalMenu'
import './AddSectorModal.css'
import '../Admin/AdminSlider'

export default function AddSectorModal(lastCategorySelect,
    lastSliderName,
    isShow,
    setShow,
    sliderGroups,
    setSliderGroups) {

    function getFormElements(){
        return {
            "title" : document.getElementById("modal-sector-title"),
            "value" : document.getElementById("modal-sector-value"),
            "indicator" : document.getElementById("modal-sector-indicator"),
            "target" : document.getElementById("modal-sector-target"),
            "description" : document.getElementById("modal-sector-description"),
            "cites" : document.getElementById("modal-sector-cites"),
            "videolink" : document.getElementById("modal-sector-videolink")
           };
    }

    function getFormData(formElements){
        let formData = {};
        for (var key in formElements){
            const value = formElements[key].value;
            if (typeof(value) === "undefined") {
                formData[key] = '';
            }
            else{
                formData[key] = value;
            }
            formElements[key].value = '';
        }

        return formData;
    }

    function isValidForm(title){
        if (title !== '') {
            return true;
        }
        else{
            return false;
        }
    }

    function handleSubmit(sliderGroups, lastCategorySelect, setSliderGroups, setShow){
        const {
            title, 
            value, 
            indicator, 
            target, 
            description, 
            cites, 
            videolink
        } = getFormData(getFormElements());

        console.log("handleSubmit: " + title, 
        value, 
        indicator, 
        target, 
        description, 
        cites, 
        videolink)

        if (!isValidForm(title.value)) {
            alert("The sector requires a title!");
            return;
        }

        const New = JSON.parse(JSON.stringify(sliderGroups));
        const {ecoOrSoc, gloOrLoc} = lastCategorySelect;

        New[ecoOrSoc][gloOrLoc][title] = {
            "value": value,
            "adjacent": [],
            "indicator": indicator,
            "target": target,
            "description": description,
            "quotes": cites,
            "video_hash": videolink
        };
        setSliderGroups(New);

        setShow(false);
    }

    function handleClose(setShow){
        getFormData();
        setShow(false);
    }

  return (
    <ModalMenu 
        isShow={isShow}
        onClose={() => handleClose(setShow)}
        onSave={() => handleSubmit(sliderGroups, lastCategorySelect, setSliderGroups, setShow)}
        title="Sector Editor"
    >
        <form action="" className="add-sector-form" method='post'>

            <label htmlFor="sector-title">Title </label>
            <input type="text" name='title' id='modal-sector-title' className="sector-title" 
                placeholder='Title...'/>

            <label htmlFor="sector-value">Value </label>
            <input type="number" name="sector-value" id="modal-sector-value"
                max="100" min="0" placeholder='0' defaultValue='0'/>


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
