import React, {useState, useEffect} from 'react'
import './AdjacencySelector.css'

export default function AdjacencySelector(props) {
    const [targetEcoOrSoc, SetTargetEcoOrSoc] = useState('ecological');
    const [targetGloOrLoc, SetTargetGloOrLoc] = useState('global');
    const [targetName, SetTargetName] = useState('Select...')

    const [adjacentArray, SetAdjacentArray] = useState([]);
    const [isDisabled, SetIsDisable] = useState(true);

    function HandleEcoOrSocSelect(){
        const element = document.getElementById("adj-select-EcoOrSoc");
        SetTargetEcoOrSoc(element.value);
    }

    function HandleGloOrLocSelect(){
        const element = document.getElementById("adj-select-GloOrLoc");
        SetTargetGloOrLoc(element.value);
    }

    function UpdateTargetName(targetValue){
        if (targetValue !== 'Select...') {
            SetTargetName(targetValue);
            SetIsDisable(false);
        }
        else {
            SetIsDisable(true);
        }
    }

    function HandleSubmit(event, props){
        event.preventDefault();
        // Get the form message and clear the input.
        const messageElement = document.getElementById("message-input"); 
        const message = messageElement.value;
        messageElement.value = "";

        // Collate the new adjaceny data.
        const newAdjacency = [targetEcoOrSoc, targetGloOrLoc, targetName, message];

        const newSliderGroups = JSON.parse(JSON.stringify(props.sliderGroups));

        // Check if the adjacency already exists.
        const adjacencies = props.sliderGroups[props.ecoOrSoc][props.gloOrLoc][props.lastSliderName]["adjacent"];
            
        for (let index = 0; index < adjacencies.length; index++) {
            const element = adjacencies[index];
            // If the same target is already and adjacency: update the message.
            if (element[0] === targetEcoOrSoc &&
                element[1] === targetGloOrLoc &&
                element[2] === targetName) {
                newSliderGroups[props.ecoOrSoc][props.gloOrLoc][props.lastSliderName]["adjacent"][index][3] = message;
                props.SetSliderGroups(newSliderGroups);
                return;
            }
        }

        // If new adjacency: Add the new Adjacency to the dataset.
        
        newSliderGroups[props.ecoOrSoc][props.gloOrLoc][props.lastSliderName]["adjacent"].push(newAdjacency);
        props.SetSliderGroups(newSliderGroups);
    }

    useEffect(() => {
        const keys = Object.keys(props.sliderGroups[targetEcoOrSoc][targetGloOrLoc]);
        if (props.ecoOrSoc === targetEcoOrSoc && props.gloOrLoc === targetGloOrLoc) {
            SetAdjacentArray(keys.filter((x) => x !== props.lastSliderName));
            return;
        }
        SetAdjacentArray(keys);
    }, [targetEcoOrSoc, targetGloOrLoc, props])

  return (
    <form className='adj-select' onSubmit={(event) => HandleSubmit(event, props)}>
        <select data-testid='adjSelect ecoOrSoc' name="EcoOrSoc" id="adj-select-EcoOrSoc" onChange={HandleEcoOrSocSelect}>
            <option value="ecological">Ecological</option>
            <option value="social">Social</option>
        </select>

        <select data-testid='adjSelect gloOrLoc' name="GloOrLoc" id="adj-select-GloOrLoc" onChange={HandleGloOrLocSelect}>
            <option value="global">Global</option>
            <option value="local">Local</option>
        </select>

        <select data-testid='adjSelect sector' name="sector" id="adj-select-sector" onChange={(e) => UpdateTargetName(e.target.value)}>
            <option key="0">Select...</option>
            {adjacentArray.map((item, index) => <option data-testid='adj-select sector option' key={index + 1}>{item}</option>)}
        </select>
        <input data-testid='adjSelect message' type="text" className='message-input' id='message-input' placeholder='Message...'/>
        <input data-testid='adjSelect submit' type="submit" disabled={isDisabled} value="Enter" />
    </form>
  )
}
