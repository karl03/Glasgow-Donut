import React, {useState, useEffect} from 'react'
import './AdjacencySelector.css'

export default function AdjacencySelector(props) {
    const [targetEcoOrSoc, setTargetEcoOrSoc] = useState('ecological');
    const [targetGloOrLoc, setTargetGloOrLoc] = useState('global');
    const [targetName, setTargetName] = useState('Select...')

    const [adjacentArray, setAdjacentArray] = useState([]);
    const [isDisabled, setIsDisable] = useState(true);

    function handleEcoOrSocSelect(){
        const element = document.getElementById("adj-select-EcoOrSoc");
        setTargetEcoOrSoc(element.value);
    }

    function handleGloOrLocSelect(){
        const element = document.getElementById("adj-select-GloOrLoc");
        setTargetGloOrLoc(element.value);
    }

    function updateTargetName(targetValue){
        if (targetValue !== 'Select...') {
            setTargetName(targetValue);
            setIsDisable(false);
            console.log("Update Target Name: ", targetValue);
        }
        else {
            setIsDisable(true);
        }
    }

    function handleSubmit(event, props){
        event.preventDefault();

        // Collate the new adjaceny data.
        const message = document.getElementById("message-input").value;
        const newAdjacency = [targetEcoOrSoc, targetGloOrLoc, targetName, message];

        // Check if the adjacency already exists.

        // Add the new Adjacency to the dataset.
        console.log(props.sliderGroups);
        const newSliderGroups = JSON.parse(JSON.stringify(props.sliderGroups));
        newSliderGroups[props.ecoOrSoc][props.gloOrLoc][props.lastSliderName]["adjacent"].push(newAdjacency);
        props.setSliderGroups(newSliderGroups);
        console.log(props.sliderGroups);
    }

    useEffect(() => {
        const keys = Object.keys(props.sliderGroups[targetEcoOrSoc][targetGloOrLoc]);
        if (props.ecoOrSoc === targetEcoOrSoc && props.gloOrLoc === targetGloOrLoc) {
            setAdjacentArray(keys.filter((x) => x !== props.lastSliderName));
            return;
        }
        setAdjacentArray(keys);
    }, [targetEcoOrSoc, targetGloOrLoc, props])

  return (
    <form className='adj-select' onSubmit={(event) => handleSubmit(event, props)}>
        <select name="EcoOrSoc" id="adj-select-EcoOrSoc" onChange={handleEcoOrSocSelect}>
            <option value="ecological">Ecological</option>
            <option value="social">Social</option>
        </select>

        <select name="GloOrLoc" id="adj-select-GloOrLoc" onChange={handleGloOrLocSelect}>
            <option value="global">Global</option>
            <option value="local">Local</option>
        </select>

        <select name="sector" id="adj-select-sector" onChange={(e) => updateTargetName(e.target.value)}>
            <option key="0">Select...</option>
            {adjacentArray.map((item, index) => <option key={index + 1}>{item}</option>)}
        </select>
        <input type="text" className='message-input' id='message-input' placeholder='Message...'/>
        <input type="submit" disabled={isDisabled} value="Enter" />
    </form>
  )
}
