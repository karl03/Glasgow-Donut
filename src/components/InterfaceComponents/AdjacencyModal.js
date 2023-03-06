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
      //sliderGroups[lastCategorySelect.ecoOrSoc][lastCategorySelect.gloOrLoc][lastSliderName]["adjacent"].push()
      setShow(false);
    }

    function formatAdjacency(){

    }

    useEffect(() => {
      if (lastCategorySelect !== undefined) {
        if (lastSliderName in sliderGroups[lastCategorySelect.ecoOrSoc][lastCategorySelect.gloOrLoc]) {
          setAdjData(sliderGroups[lastCategorySelect.ecoOrSoc][lastCategorySelect.gloOrLoc][lastSliderName]["adjacent"]);
        }
      }
    }, [sliderGroups])
    
  return (
    <ModalMenu 
        isShow={isShow}
        onClose={() => onClose()}
        onSave={() => onSave()}
        title='Adjacency Editor'
    >

    <ul className='adj-display'>
      {adjData.map((item, index) => <li key={index}>{item[0] + " " + item[1] + ": " + item[3]}<button onClick={console.log(index, item)}>Delete</button></li>)}
    </ul>

    <AdjacencySelector 
      sliderGroups={sliderGroups} 
      lastSliderName={lastSliderName}
      setSliderGroups={setSliderGroups}
      ecoOrSoc={lastCategorySelect !== undefined ? lastCategorySelect.ecoOrSoc : ''} 
      gloOrLoc={lastCategorySelect !== undefined ? lastCategorySelect.gloOrLoc : ''} 
    ></AdjacencySelector>
        
    </ModalMenu>
  )
}
