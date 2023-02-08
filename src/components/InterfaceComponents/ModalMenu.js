import React, { useState } from 'react'
import './ModalMenu.css'

export default function ModalMenu() {

    const [isShown, setShown] = useState(false);


  return (
    <div className='modal'>
        <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">Modal Menu</h4>
            </div>

            <div className="modal-body">
                This is where the main content is.
            </div>

            <div className="modal-footer">
                <button className="modal-button">Close</button>
            </div>
            
        </div>
    </div>
  )
}