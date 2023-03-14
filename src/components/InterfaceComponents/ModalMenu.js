import React from 'react'
import ReactDOM from 'react-dom'
import './ModalMenu.css'

export default function ModalMenu(props) {

    return(
    <div className={`modal ${props.isShow ? 'isShow' : ''}`}>
        <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">{props.title}</h4>
            </div>

            <div className="modal-body">
                {props.children}
            </div>

            <div className="modal-footer">
                <button data-testid='modal close' className="modal-close" onClick={props.onClose}>Close</button>
                {props.canSave === true ? 
                    <button data-testid='modal save' className="modal-save" onClick={props.onSave}>Save</button>
                : null}
            </div>
            
        </div>
    </div>
  )
}