import React from 'react'
import ModalMenu from './ModalMenu'
import './AddSectorModal.css'
import '../Admin/AdminSlider'

export default function AddSectorModal(props) {

    function handleSubmit(form){
        console.log("HELLOS!")
        console.log(form);
        props.setShow(false);
    }

  return (
    <ModalMenu 
        isShow={props.isShow}
        onClose={() => props.setShow(false)}
        onSave={() => handleSubmit} // TODO: onSave function to pass data from Modal
        title="Sector Editor"
    >
        <form action="handleSubmit" className="add-sector-form" method='post'>

            <label for="sector-title">Title </label>
            <input type="text" name='title' className="sector-title" />

            <div className="">SLIDER INPUT </div>
    
            <label for="sector-indicator">Indicator </label>
            <input type="text" name='indicator' className="sector-indicator" />
        
    
            <label for="sector-target">Target </label>
            <input type="text" name='target' className="sector-target" />
        
    
            <label for="sector-description">Description </label>
            <textarea name="sector-description" id="sector-description" cols="30" rows="10"></textarea>
        
    
            <label for="sector-cites">Citations </label>
            <input type="text" name='cites' className="sector-cites" />
        
    
            <label for="sector-videolink">Videolink </label>
            <input type="url" name='video' className="sector-videolink" />
        
        </form>
    </ModalMenu>
  )
}
