import React from 'react'
import ReactDOM from 'react-dom'
import './ModalMenu.css'

export default function ModalMenu(props) {

  return ReactDOM.createPortal(
    <div className={`modal ${props.isShow ? 'isShow' : ''}`}>
        <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">{props.title}</h4>
            </div>

            <div className="modal-body">
                {props.children}
            </div>

            <div className="modal-footer">
                {props.onClose === null ? 
                <button className="modal-close" onClick={props.onClose}>Close</button>
                : null}
                {props.onSave === null ?
                <button className="modal-save" onClick={props.onSave}>Save</button>
                : null}
            </div>
            
        </div>
    </div>
    , document.getElementById('root')
  )
}