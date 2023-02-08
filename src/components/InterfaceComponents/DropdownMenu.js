import React, { useState } from 'react'
import './DropdownMenu.css'

export default function DropdownMenu({ dataArray } ) {
  if (dataArray === undefined) {
    dataArray = [];
  }

  const [isOpen, SetOpen] = useState(false);

  return (
    <div className='menu'>
      <button onClick={() => SetOpen(!isOpen)}> {"" + isOpen}</button>
      {isOpen ? 
      <ul className='menu'>
        {dataArray.map((Item, index) => (<li key={index} className="menu-item" onClick={function(){console.log(Item + " at " + index + " was clicked!");}}>{Item}</li> ))} 
      </ul> : null}
    </div>
  )
}
