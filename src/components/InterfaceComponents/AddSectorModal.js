import React from 'react'
import ModalMenu from './ModalMenu'

export default function AddSectorModal(props) {

  return (
    <ModalMenu 
        isShow={props.isShow}
        onClose={() => props.setShow(false)}
        onSave={() => props.setShow(false)} // TODO: onSave function to pass data from Modal
        title="Modal Title"
    >
        <form action="" className="add-sector-form">
            <div>
                <label for="sector-title">Title: </label>
                <input type="text" className="sector-title" />
            </div>
            <div>SLIDER INSERT</div>
            <div>
                <label for="sector-indicator">Indicator: </label>
                <input type="text" className="sector-indicator" />
            </div>
            <div>
                <label for="sector-target">target: </label>
                <input type="text" className="sector-target" />
            </div>
            <div>
                <label for="sector-description">description: </label>
                <input type="text" className="sector-description" />
            </div>
            <div>
                <label for="sector-cites">Citations: </label>
                <input type="text" className="sector-cites" />
            </div>
            <div>
                <label for="sector-videolink">Videolink: </label>
                <input type="url"  className="sector-videolink" />
            </div>
        </form>
    </ModalMenu>
  )
}
