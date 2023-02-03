import React, { useState } from 'react'
import './DropDown.css'

export default function DropDown({ dataArray } ) {
  if (dataArray === undefined) {
    dataArray = [];
  }

  const [isOpen, SetOpen] = useState(false);


  function HandleOpen(){
      SetOpen(!isOpen);
  }

  return (
    <div className='dropdown'>
      <button onClick={HandleOpen}> {"" + isOpen}</button>
      {isOpen ? 
      <ul className='menu'>
        {dataArray.map((Item, index) => (
            <li key={index} className="menu-item">{Item}</li>
        ))}
      </ul> : null}
    </div>
  )
}
