import React, { useState } from 'react'
import './DropDown.css'

export default function DropDown({ dataArray } ) {
  const [isOpen, setOpen] = useState(false);


  function handleOpen(){
      setOpen(!isOpen);
  }

  return (
    <div className='dropdown'>
      <button onClick={handleOpen}> {"" + isOpen}</button>
      {isOpen ? 
      <ul className='menu'>
        {dataArray.map((Item, index) => (
            <li key={index} className="menu-item">{Item}</li>
        ))}
      </ul> : null}
    </div>
  )
}
