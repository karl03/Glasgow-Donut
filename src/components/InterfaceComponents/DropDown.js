import React, { useState } from 'react'
import './DropDown.css'

export default function DropDown() {
    const [isOpen, setOpen] = useState(false);

    function handleOpen(){
        setOpen(!isOpen);
    }

  return (
    <div className='dropdown'>
      <button onClick={handleOpen}> {"" + isOpen}</button>
      {isOpen ? 
      <ul className='menu'>
        <li> <button className='menu-item'> Button 1</button></li>
        <li> <button className='menu-item'> Button 2</button></li>
        <li> <button className='menu-item'> Button 3</button></li>
      </ul> : null}
      {isOpen ? <div>Is open!</div> : <div>Is closed!</div>}
    </div>
  )
}
