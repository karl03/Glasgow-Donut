import React, {useState, useEffect} from 'react'
import './AdjacencySelector.css'

export default function AdjacencySelector(props) {
    const [ecoOrSoc, setEcoOrSoc] = useState('ecological');
    const [gloOrLoc, setGlocOrLoc] = useState('global');
    const [sector, setSector] = useState();
    const [selectionArray, SetSelectionArray] = useState([]);

    function getConstrainedSectors(sliderGroups, ecoOrSoc, gloOrLoc){
        return Object.keys(sliderGroups[ecoOrSoc][gloOrLoc]);
    }

    function handleEcoOrSocSelect(){
        const element = document.getElementById("adj-select-EcoOrSoc");
        setEcoOrSoc(element.value);
    }

    function handleGloOrLocSelect(){
        const element = document.getElementById("adj-select-GloOrLoc");
        setGlocOrLoc(element.value);
    }

    useEffect(() => {
        SetSelectionArray(getConstrainedSectors(props.sliderGroups, ecoOrSoc, gloOrLoc));
    }, [ecoOrSoc, gloOrLoc]);

    function handleSubmit(e){
        e.preventDefault();
        // Selection slider variables
        const adjacencyData = [ecoOrSoc,
        gloOrLoc,
        sector,
        document.getElementById("message-input").value]
        // Current slider variables 
        // FROM SOMEWHERE!

    }

  return (
    <form className='adj-select' onSubmit={handleSubmit}>
        <select name="EcoOrSoc" id="adj-select-EcoOrSoc" onChange={handleEcoOrSocSelect}>
            <option value="ecological">Ecological</option>
            <option value="social">Social</option>
        </select>

        <select name="GloOrLoc" id="adj-select-GloOrLoc" onChange={handleGloOrLocSelect}>
            <option value="global">Global</option>
            <option value="local">Local</option>
        </select>

        <select name="sector" id="adj-select-sector" value={sector} onChange={e => setSector(e.target.value)}>
            {selectionArray.map(opt => <option>{opt}</option>)}
        </select>
        <input type="text" className='message-input' id='message-input' placeholder='Message...'/>
        <input type="submit" value="Enter" />
    </form>
  )
}
