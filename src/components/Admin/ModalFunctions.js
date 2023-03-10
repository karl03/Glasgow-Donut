// Functions for the modal menu!

function getFormElements(){
    const title = document.getElementById('modal-sector-title');
    const value = document.getElementById('modal-sector-value');
    const indicator = document.getElementById('modal-sector-indicator');
    const indicator_link = document.getElementById('modal-sector-indicator-link');
    const target = document.getElementById('modal-sector-target');
    const target_link = document.getElementById('modal-sector-target-link');
    const description = document.getElementById('modal-sector-description');
    const cites = document.getElementById('modal-sector-cites');
    
    return {
        "title": title,
        "value": value,
        "indicator": indicator,
        "indicator_link": indicator_link,
        "target": target,
        "target_link": target_link,
        "description": description,
        "cites": cites,
    };
}

export function populateForm(sliderGroups, name, ecoOrSoc, gloOrLoc){
    // Find existing data.

    const data = sliderGroups[ecoOrSoc][gloOrLoc][name];

    // Write data to elemenets.
    const {title, value, indicator, indicator_link, target, target_link, description, cites} = getFormElements();
    title.value = name;
    value.value = data['value'];
    indicator.value = data['indicator'];
    indicator_link.value = data['indicator_link'];
    target.value = data['target'];
    target_link.value = data['target_link'];
    description.value = data['description'];
    cites.value = data['quotes'];
}

export function onClose(setShow){
    const formElements = getFormElements();
    // Clear form.
    for( const value of Object.values(formElements)){
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

    
export function onSave(sliderGroups, setSliderGroups, title, ecoOrSoc, gloOrLoc, setShow, icon){
    // Get form data.
    const formData = getFormData(getFormElements());

    if (!isValidForm(title)) {
        alert("The sector requires a title!");
        return;
    }

    // Insert or overwrite new data.

    const New = JSON.parse(JSON.stringify(sliderGroups));
    New[ecoOrSoc][gloOrLoc][formData['title']] = {
        "value": Number.parseInt(formData['value']) || 0,
        "adjacent": New[ecoOrSoc][gloOrLoc][formData['title']] === undefined ? [] : New[ecoOrSoc][gloOrLoc][formData['title']]['adjacent'],
        "indicator": formData['indicator'],
        "indicator_link": formData['indicator_link'],
        "target": formData['target'],
        "target_link": formData['target_link'],
        "description": formData['description'],
        "quotes": formData['cites'],
        "symbol_id": icon
    };
    setSliderGroups(New);
    onClose(setShow)
}