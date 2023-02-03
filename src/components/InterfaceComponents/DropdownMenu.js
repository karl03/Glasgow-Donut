import React, { useState } from 'react'
import './DropDown.css'

export default function DropDown({ dataArray } ) {
  if (dataArray === undefined) {
    dataArray = [];
  }

  const [isOpen, SetOpen] = useState(false);

  return (
    <div className='dropdown'>
      <button onClick={() => SetOpen(!isOpen)}> {"" + isOpen}</button>
      {isOpen ? 
      <ul className='menu'>
        {dataArray.map((Item, index) => (
            <li key={index} className="menu-item">{Item}</li>
        ))}
      </ul> : null}
    </div>
  )
}
