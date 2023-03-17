import React, {useState, useEffect} from 'react'
import ModalMenu from './ModalMenu'
import AdjacencySelector from './AdjacencySelector'
import './AdjacencyModal.css'

export default function AdjacencyModal({lastCategorySelect, 
    lastSliderName,
    isShow,
    SetShow,
    sliderGroups,
    SetSliderGroups}) {

    const [adjData, SetAdjData] = useState([]);

    function OnClose(){
      SetShow(false);
    }

    function OnSave(){
      SetShow(false);
    }

    function DeleteAdjacency(item, index){

      // Gather the existing adjacency data.
      const newSliderGroups = JSON.parse(JSON.stringify(sliderGroups));
      
      // Remove the specific adjacency.
      newSliderGroups[lastCategorySelect.ecoOrSoc][lastCategorySelect.gloOrLoc][lastSliderName]["adjacent"].splice(index, 1);

      // Update the dataset.
      SetSliderGroups(newSliderGroups);
    }

    useEffect(() => {
      if (lastCategorySelect !== undefined) {
        if (lastSliderName in sliderGroups[lastCategorySelect.ecoOrSoc][lastCategorySelect.gloOrLoc]) {
          SetAdjData(sliderGroups[lastCategorySelect.ecoOrSoc][lastCategorySelect.gloOrLoc][lastSliderName]["adjacent"]);
        }
      }
    }, [sliderGroups, lastCategorySelect, lastSliderName, isShow])
    
  return (
    <ModalMenu 
        isShow={isShow}
        OnClose={() => OnClose()}
        OnSave={() => OnSave()}
        title={'Adjacency Editor: ' + lastSliderName}
    >

    <ul className='adj-display'>
      {adjData.map((item, index) => 
      <li data-testid='adj li' className='adj-list-element' key={index}>{lastCategorySelect.ecoOrSoc + " " + lastCategorySelect.gloOrLoc + " " + lastSliderName + "→" + 
        item[0] + " " + item[1] + " " + item[2] + ": " + item[3]}
      <button data-testid='adj delete' className='adj-delete-button' onClick={() => DeleteAdjacency(item, index)}>Delete</button></li>)
      }
    </ul>

    <AdjacencySelector 
      sliderGroups={sliderGroups} 
      lastSliderName={lastSliderName}
      SetSliderGroups={SetSliderGroups}
      ecoOrSoc={lastCategorySelect !== undefined ? lastCategorySelect.ecoOrSoc : ''} 
      gloOrLoc={lastCategorySelect !== undefined ? lastCategorySelect.gloOrLoc : ''} 
    ></AdjacencySelector>
        
    </ModalMenu>
  )
}
