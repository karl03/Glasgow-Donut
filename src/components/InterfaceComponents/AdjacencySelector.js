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
    }, [ecoOrSoc, gloOrLoc, props.sliderGroups]);

    function checkValidAdj(sliderGroups, ecoOrSoc, gloOrLoc, title){
        // check if self adjacency (use an alert...)
        // for every adjacency
            // check if adjacency is the same as the proposed new one.
            // If overwrite, then call overwrite.
            // else, create new


        if (sliderGroups[ecoOrSoc][gloOrLoc][title]) {
            
        }
    }

    function handleSubmit(e, props){
        // props = sliderGroup, ecoOrSoc, gloOrLoc
        e.preventDefault();
        // Selection slider variables.
        const form = document.getElementById("message-input");
        const adjacencyData = [ecoOrSoc,
        gloOrLoc,
        sector,
        form.value]

        form.value = ''; // Clear the form.

        // Current slider variables.
        const currentEcoOrSoc = props.ecoOrSoc;
        const currentGloOrLoc = props.gloOrLoc;
        const currentTitle = props.lastSliderName;
        
        const newSliderGroup = JSON.parse(JSON.stringify(props.sliderGroups));
        console.log("THIS -->",currentTitle);
        newSliderGroup[currentEcoOrSoc][currentGloOrLoc][currentTitle]["adjacent"].push(adjacencyData);
        console.log("!!!", newSliderGroup);
        props.setSliderGroups(newSliderGroup);
    }

  return (
    <form className='adj-select' onSubmit={(e) => handleSubmit(e, props)}>
        <select name="EcoOrSoc" id="adj-select-EcoOrSoc" onChange={handleEcoOrSocSelect}>
            <option value="ecological">Ecological</option>
            <option value="social">Social</option>
        </select>

        <select name="GloOrLoc" id="adj-select-GloOrLoc" onChange={handleGloOrLocSelect}>
            <option value="global">Global</option>
            <option value="local">Local</option>
        </select>

        <select name="sector" id="adj-select-sector" value={sector} onChange={e => setSector(e.target.value)}>
            {selectionArray.map((item, index) => <option key={index}>{item}</option>)}
        </select>
        <input type="text" className='message-input' id='message-input' placeholder='Message...'/>
        <input type="submit" value="Enter" />
    </form>
  )
}
