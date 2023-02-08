import React, { useState } from 'react'
import './DropdownMenu.css'

export default function DropdownMenu({ dataArray } ) {
  if (dataArray === undefined) {
    dataArray = [];
  }

  const [isOpen, SetOpen] = useState(false);

  function handleSelection(item, index){
    console.log(item + " at " + index + " was clicked!");
    SetOpen(!isOpen);
  }

  return (
    <div className='menu'>
      <button onClick={() => SetOpen(!isOpen)}> {"" + isOpen}</button>
      {isOpen ? 
      <ul className='menu'>
        {dataArray.map((item, index) => (<li key={index} className="menu-item" onClick={function(){handleSelection(item, index)}}>{item}</li> ))} 
      </ul> : null}
    </div>
  )
}
