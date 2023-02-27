import React, { useState } from 'react'
import './DropdownMenu.css'

export default function DropdownMenu(props) {
  const dataArray = props.dataArray || [];
  if (props.notifyFunction === undefined) props.notifyFunction = function() {return undefined;};

  const [isOpen, SetOpen] = useState(false);
  const [selection, SetSelection] = useState('');

  const handleSelection = (e) =>{
    const item = e.currentTarget.getAttribute("data-item");
    const index = e.currentTarget.getAttribute("data-index");

    try {
      props.notifyFunction(item);
      SetSelection(item);
      SetOpen(!isOpen);
    } catch (error) {
      console.log(error)
    }
  }

  function handleOnClear(){
    try {
      props.onClear();
      SetSelection('');
      props.notifyFunction('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='menu'>
      <button className='dropdown_button' onClick={() => SetOpen(!isOpen)}> {selection === '' ? 'Select...' : selection}</button>
      <button className='dropdown_deselect_button' onClick={handleOnClear}>X</button>
      {isOpen ? 
      <ul className='menu'>
        {console.log(dataArray)}
        {dataArray.map((item, index) => (<li key={index} className="menu-item" data-index={index} data-item={item} onClick={handleSelection}>{item}</li> ))} 
      </ul> : null}
    </div>
  )
}
