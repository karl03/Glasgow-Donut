import React, {useState, useEffect} from 'react'
import ModalMenu from './ModalMenu'
import AdjacencySelector from './AdjacencySelector'

export default function AdjacencyModal({lastCategorySelect, 
    lastSliderName,
    isShow,
    setShow,
    sliderGroups,
    setSliderGroups}) {

    const [adjData, setAdjData] = useState([]);

    function onClose(){
      setShow(false);
    }

    function onSave(){
        setShow(false);
    }

    // useEffect(() => {
    //     setAdjData(sliderGroups[lastCategorySelect.ecoOrSoc][lastCategorySelect.gloOrLoc][lastSliderName]["adjacent"]);
    // }, [sliderGroups])
    
  return (
    <ModalMenu 
        isShow={isShow}
        onClose={() => onClose()}
        onSave={() => onSave()}
        title='Adjacency Editor'
    >

    <div className='adj-display'>

    </div>

    <AdjacencySelector 
      sliderGroups={sliderGroups} 
      ecoOrSoc={lastCategorySelect !== undefined ? lastCategorySelect.ecoOrSoc : ''} 
      gloOrLoc={lastCategorySelect !== undefined ? lastCategorySelect.gloOrLoc : ''} 
    ></AdjacencySelector>
        
    </ModalMenu>
  )
}
