import React from 'react'
import ModalMenu from './ModalMenu'
import './AddSectorModal.css'
import '../Admin/AdminSlider'
import AdjacencySelector from './AdjacencySelector'
import {onClose, onSave} from '../Admin/ModalFunctions'

export default function AddSectorModal({lastCategorySelect,
    lastSliderName,
    isShow,
    setShow,
    sliderGroups,
    setSliderGroups}) {

    function handleSubmit(sliderGroups, lastCategorySelect, lastSliderName, setSliderGroups, setShow){
        const {ecoOrSoc, gloOrLoc} = lastCategorySelect;
        console.log("handleSubmit: ", lastSliderName);
        onSave(sliderGroups, setSliderGroups, lastSliderName, ecoOrSoc, gloOrLoc, setShow);
    }

    function handleClose(setShow){
        onClose(setShow);
    }

    function handleNotify(selection){
        console.log("handleNotify: " + selection);
    }

  return (
    <ModalMenu 
        isShow={isShow}
        onClose={() => handleClose(setShow)}
        onSave={() => handleSubmit(sliderGroups, lastCategorySelect, lastSliderName, setSliderGroups, setShow)}
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

            <label htmlFor='sector-adjacencies'>Adjacencies </label>
    
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
