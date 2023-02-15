import React from 'react'
import ModalMenu from './ModalMenu'
import './AddSectorModal.css'
import '../Admin/AdminSlider'

export default function AddSectorModal(props) {

    function handleSubmit(form){
        const title = document.getElementById("modal-sector-title");
        const indicator = document.getElementById("modal-sector-indicator");
        const target = document.getElementById("modal-sector-target");
        const description = document.getElementById("modal-sector-description");
        const cites = document.getElementById("modal-sector-cites");
        const videolink = document.getElementById("modal-sector-videolink");

        console.log(title.value + '\n' + indicator.value + '\n' + target.value + '\n' + description.value + '\n' + cites.value + '\n' + videolink.value);

        props.setShow(false);
    }

  return (
    <ModalMenu 
        isShow={props.isShow}
        onClose={() => props.setShow(false)}
        onSave={handleSubmit} // TODO: onSave function to pass data from Modal
        title="Sector Editor"
    >
        <form action="" className="add-sector-form" method='post'>

            <label for="sector-title">Title </label>
            <input type="text" name='title' id='modal-sector-title' className="sector-title" />

            <div className="">SLIDER INPUT </div>
    
            <label for="sector-indicator">Indicator </label>
            <input type="text" name='indicator' id='modal-sector-indicator' className="sector-indicator" />
        
    
            <label for="sector-target">Target </label>
            <input type="text" name='target' id='modal-sector-target'className="sector-target" />
        
    
            <label for="sector-description">Description </label>
            <textarea name="sector-description" id="modal-sector-description" cols="30" rows="10"></textarea>
        
    
            <label for="sector-cites">Citations </label>
            <input type="text" name='cites' id='modal-sector-cites' className="sector-cites" />
        
    
            <label for="sector-videolink">Videolink </label>
            <input type="url" name='video' id="modal-sector-videolink" className="sector-videolink" />
        
        </form>
    </ModalMenu>
  )
}
