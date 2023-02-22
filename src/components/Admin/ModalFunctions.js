// Functions for the modal menu!

// get all form elements
export function getFormElements(){
    const title = document.getElementById('modal-sector-title');
    const value = document.getElementById('modal-sector-value');
    const indicator = document.getElementById('modal-sector-indicator');
    const target = document.getElementById('modal-sector-target');
    const description = document.getElementById('modal-sector-description');
    const cites = document.getElementById('modal-sector-cites');
    const videolink = document.getElementById('modal-sector-videolink');
    
    return [title, value, indicator, target, description, cites, videolink];
}

export function populateForm(sliderGroups, formElements, name, ecoOrSoc, gloOrLoc){
    // Find existing data

    const data = sliderGroups[ecoOrSoc][gloOrLoc][name];

    console.log(name, JSON.stringify(data));


    // write data to elemenets

}

export function onClose(){
    // on close
        // clear form

        // close modal
}

export function onSave(){
    // on save
        // delete exisiting slider from data.json
        // insert form data to replace old slider
        // clear form
        // close modal

}