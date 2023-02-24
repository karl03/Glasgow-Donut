// Functions for the modal menu!

// get all form elements
function getFormElements(){
    const title = document.getElementById('modal-sector-title');
    const value = document.getElementById('modal-sector-value');
    const indicator = document.getElementById('modal-sector-indicator');
    const target = document.getElementById('modal-sector-target');
    const description = document.getElementById('modal-sector-description');
    const cites = document.getElementById('modal-sector-cites');
    const videolink = document.getElementById('modal-sector-videolink');
    
    return {
        "title": title,
        "value": value,
        "indicator": indicator,
        "target": target,
        "description": description,
        "cites": cites,
        "videolink": videolink};
}

export function populateForm(sliderGroups, name, ecoOrSoc, gloOrLoc){
    // Find existing data

    const data = sliderGroups[ecoOrSoc][gloOrLoc][name];

    console.log("populateForm: ", name, JSON.stringify(data));

    // write data to elemenets
    const {title, value, indicator, target, description, cites, videolink} = getFormElements();
    title.value = name;
    value.value = data['value'];
    indicator.value = data['indicator'];
    target.value = data['target'];
    description.value = data['description'];
    cites.value = data['quotes'];
    videolink.value = data['video_hash'];
}

export function onClose(setShow){
    const formElements = getFormElements();
    // Clear form.
    for( const [key, value] of Object.entries(formElements)){
        value.value = '';
    }
    // Close modal.
    setShow(false);
}

function isValidForm(title){
    if (title !== '') {
        return true;
    }
    else{
        return false;
    }
}

function getFormData(formElements){
    let formData = {};
    for (var key in formElements){
        const value = formElements[key].value;
        if (typeof(value) === "undefined") {
            formData[key] = '';
        }
        else{
            formData[key] = value;
        }
    }

    return formData;
}

export function onSave(sliderGroups, setSliderGroups, title, ecoOrSoc, gloOrLoc, setShow){
    // get form data
    const x = getFormData(getFormElements());

    if (!isValidForm(title)) {
        alert("The sector requires a title!");
        return;
    }

    console.log("onSave: " + title, 
    x['value'], 
    x["indicator"], 
    x["target"], 
    x["description"], 
    x["cites"], 
    x["videolink"])

    console.log("AAHSDHJASIJDHKJADSN",Object.keys(x));
    // insert/overwrite new data 

    const New = JSON.parse(JSON.stringify(sliderGroups));
    New[ecoOrSoc][gloOrLoc][x['title']] = {
        "value": x['value'],
        "adjacent": [],//NEEDS TO BE IMPLEMENTED
        "indicator": x['indicator'],
        "target": x['target'],
        "description": x['description'],
        "quotes": x['cites'],
        "symbol_id": '', //NEEDS TO BE IMPLEMENTED
        "video_hash": x['videolink']
    };
    console.log(New);
    setSliderGroups(New);
    onClose(setShow)
}