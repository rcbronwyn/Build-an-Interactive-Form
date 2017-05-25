

// nameInput is the input for the Name field at the top of the form.
// jobRoleSelect is the select dropdown for job role.
// basicInfo is the first fieldset in the form.
// designSelect  is the select dropdown for design in the T-Shirt Info section.
// colorSelect is the select dropdown for color in the T-Shirt Info section.
// activities is the fieldset containing the registration for activities.

const nameInput = document.getElementById('name');
const jobRoleSelect  = document.getElementById('title');
const basicInfo = document.querySelector("fieldset:first-child");
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const activities = document.querySelectorAll('.activities label input');


function availableColors(designSelected){
    const colorOptions = colorSelect.options;

    /* If the selected design is not Select Theme*/    
    if (designSelected != "Select Theme"){
        /*Reset the selected option for the color options.*/
        var colorSelected = undefined;   
        /* For each color option, check if the option's text includes the selected design*/
        for (var i = 0; i < colorOptions.length; i += 1){
            /*If it does, make sure the option is visible by setting the display css property to to blank*/
            if (colorOptions[i].textContent.includes(designSelected)){
                    colorOptions[i].style.display = "";
                    /*If the color select is still undefined, set the selected option of the color select 
                    box to the first color option that is visible.*/
                    if (colorSelected == undefined){
                        colorSelected = colorSelect.options[i];                        
                        colorSelect.options[i].selected = "selected";
                    }                    
            } else {
                /*If the color option doesn't inclue the selected design's text, hide it.*/
                colorOptions[i].style.display = "none";
            }
        }

    } else {
        var colorSelected = undefined;      
        for (var i = 0; i < colorOptions.length; i += 1){
            colorOptions[i].style.display = "";
                    if (colorSelected == undefined){
                        colorSelected = colorSelect.options[i];
                        colorSelect.options[i].selected = "selected";
                    }    
        }
    }


}






//When the page loads, give focus to the first text field.
nameInput.focus();

//A text field that will be revealed when the "Other" option is selected from the "Job Role dropdown menu"
jobRoleSelect.addEventListener('change', () =>{
    
    //jobRoleSelected is the option that is selected for the dropwn for job role.
    const jobRoleSelected = jobRoleSelect.options[jobRoleSelect.selectedIndex].value;
    
    
    
    if (jobRoleSelected == "other"){
        //Create the label and text field for the other Option.
        var input = document.createElement("input");
        input.id = "other-title";
        input.placeholder = "Your Job Role";
        var label = document.createElement("label");
        label.textContent = "Your Job:";
        label.id = "other-title-label";
        basicInfo.appendChild(label);
        basicInfo.appendChild(input);
    } else {
        const otherInput = document.getElementById('other-title');
        const otherLabel = document.getElementById('other-title-label');
        if (otherInput != undefined){
            otherInput.remove();
            otherLabel.remove();
        }

    }

    
});



//For the T-Shirt of the color menu, only display the color options that match the design selected in the "Design" menu.
 designSelect.addEventListener('change', () => {
    const designSelected = designSelect.options[designSelect.selectedIndex].innerHTML.replace('Theme - ', '');

    availableColors(designSelected);
    
 });

// Some events are at the same time as others.  If the user selects a workshop, don't allow selection of a workshop at 
// the same date and time you should disable the checkbox and visually indicate that the workshop in the competing time
// slot isn't available.
for(let i = 0; i < activities.length; i++){


    activities[i].addEventListener("change", () => {
      if(i != 0){
        var name = activities[i].parentElement.innerText.split("—")[0];
        var time = activities[i].parentElement.innerText.split("—")[1].split(",")[0];
        var price = activities[i].parentElement.innerText.split(",")[1];

      }    
      
    });
}
