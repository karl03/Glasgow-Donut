import React from 'react'
import ModalMenu from './ModalMenu'
import './AddSectorModal.css'
import '../Admin/AdminSlider'

export default function AddSectorModal(props) {

  return (
    <ModalMenu 
        isShow={props.isShow}
        onClose={() => props.setShow(false)}
        onSave={() => props.setShow(false)} // TODO: onSave function to pass data from Modal
        title="Sector Editor"
    >
        <form action="" className="add-sector-form">

            <label for="sector-title">Title </label>
            <input type="text" className="sector-title" />

            <div className="">SLIDER INPUT </div>
    
            <label for="sector-indicator">Indicator </label>
            <input type="text" className="sector-indicator" />
        
    
            <label for="sector-target">Target </label>
            <input type="text" className="sector-target" />
        
    
            <label for="sector-description">Description </label>
            <textarea name="sector-description" id="sector-description" cols="30" rows="10"></textarea>
        
    
            <label for="sector-cites">Citations </label>
            <input type="text" className="sector-cites" />
        
    
            <label for="sector-videolink">Videolink </label>
            <input type="url"  className="sector-videolink" />

            <input type="submit" value="" />
        
        </form>
    </ModalMenu>
  )
}
