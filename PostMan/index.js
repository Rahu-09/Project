console.log('This is my project 6 from JavaScript course');

// Utility Function:-
// Utility Function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
// 
// Initialize No of Parameters
let addedParamCount = 0;

// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// if the user click on + button than add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
    <label for="Parameter" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
    </div>
    <button class="btn btn-primary deleteParam">-</button>
</div>`;
    // convert the element string to dom mode
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // Add an event listener to remove the parameter on clicking -
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // add a confirmation box to confirm paramter deletion
            let Remove = confirm("Do You Want to delete");
            if (Remove == true) {
                e.target.parentElement.remove();
            } else {
                console.log("You pressed Cancel!");
            }
        })
    }
    addedParamCount++;
})

// if the user click on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // show pls wait in the response box to request patience from the user
    document.getElementById('responseJsonText').value = "Pls wait.... Fetching Response....";
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requesttype']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    // if userr has used params option instead of JSON, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    // log all the values in the console for debugging
    console.log('URL is', url);
    console.log('requestType is', requestType);
    console.log('contentType is', contentType);
    console.log('data is', data);

    // if the requestTypeis get ,invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById("responseJsonText").value = text;
            })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById("responseJsonText").value = text;
            })
    }

})