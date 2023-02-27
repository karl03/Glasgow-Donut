import React, {useState, useEffect} from 'react'
import DropDownMenu from './DropdownMenu'
import './AdjacencySelector.css'

export default function AdjacencySelector(props) {
    const [ecoOrSoc, setEcoOrSoc] = useState('');
    const [gloOrLoc, setGlocOrLoc] = useState('');
    const [selectionArray, SetSelectionArray] = useState([]);
    function getConstrainedSectors(sliderGroups, ecoOrSoc, gloOrLoc){
        if (ecoOrSoc === '' || gloOrLoc === '') return;
        return Object.keys(sliderGroups[ecoOrSoc][gloOrLoc]);
    }

    function handleEcoOrSoc(selection){
        setEcoOrSoc(selection === "Ecological" ? "ecological" : "social");
    }

    function handleGloOrLoc(selection){
        setGlocOrLoc(selection === "Global" ? "global" : "local");
    }

    function setAdjacency(sliderGroups, setSliderGroups){
        
    }

    useEffect(() => {
        SetSelectionArray(getConstrainedSectors(props.sliderGroups, ecoOrSoc, gloOrLoc));
    }, [ecoOrSoc, gloOrLoc]);

  return (
    <div className='adjacency-selector'>
        <DropDownMenu 
            dataArray={["Ecological", "Social"]} 
            notifyFunction={handleEcoOrSoc} 
            onClear={()=>{setEcoOrSoc('')}}>
        </DropDownMenu>
        <DropDownMenu 
            dataArray={["Global", "Local"]} 
            notifyFunction={handleGloOrLoc} 
            onClear={()=>{setGlocOrLoc('')}}>
        </DropDownMenu>
        <DropDownMenu 
            dataArray={selectionArray}
            notifyFunction={() => setAdjacency(props.sliderGroups, props.setSliderGroups)}
            onClear={() => {}}>
        </DropDownMenu>
        <input type="text" className='message-input' id='message-input' defaultValue="Message..."/>
        <button className='enter-adjacency-button'>Enter</button>
    </div>
  )
}
