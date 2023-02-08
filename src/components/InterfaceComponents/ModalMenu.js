import React, { useState } from 'react'
import './ModalMenu.css'

export default function ModalMenu(props) {

  return (
    <div className={`modal ${props.isShow ? 'isShow' : ''}`}>
        <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">{props.title}</h4>
            </div>

            <div className="modal-body">
                {props.children}
            </div>

            <div className="modal-footer">
                <button className="modal-button" onClick={props.onClose}>Close</button>
            </div>
            
        </div>
    </div>
  )
}