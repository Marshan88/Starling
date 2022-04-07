function DevToolView() {
    const devTools = model.inputs.devTools;
    return `
        <div class="dev-tools">
        <button style="margin: 0.5rem 0; color: transparent; background-color: transparent;" onclick="openDevPopup()">Signup</button>
        </div>
    `
}

function listOfPages() {
    const pages = ['Dashboard', 'SurveyPage', 'GroupList', 'GroupNew', 'GroupSite'];
    let HTML = '';
    for (const page of pages) {
        HTML += `<option value="${page}">${page}</option>`
    }
    return HTML;
}

function listOfUsers() {
    const users = [{
        id: 7,
        name: 'User'
    },
    {
        id: 1,
        name: 'Admin'
    },
    {
        id: 2,
        name: 'Manager'
    }];

    let HTML = '';
    for (const user of users) {
        HTML += `<option value="${user.id}">${user.name}</option>`
    }
    return HTML;
}

function changeUser(id) {
    model.app.userLoggedInId = id;
    updateMainView();
}


//${selectWithLabelHTML()} 

function popUp() {
    const pageDropDown = {
        labelText: 'Navigate to page',
        onChange: 'model.inputs.devTools.dropdownPage = this.value',
        value: "Dashboard",
        content: listOfPages(),
        buttonOnClick: "window.opener.redirectToPage(model.inputs.devTools.dropdownPage)",
        buttonText: "Switch",
    }
    const userDropdown = {
        labelText: 'Change user',
        onChange: 'model.inputs.devTools.dropdownUser = this.value',
        value: "Dashboard",
        content: listOfUsers(),
        buttonOnClick: "window.opener.changeUser(Number(model.inputs.devTools.dropdownUser))",
        buttonText: "Switch",
    }
    let inputText = '';
    return /*html*/`
    <div class="dev-tool">
        <div class="dev-tool-page">
            ${selectWithLabelHTML(pageDropDown)}
        </div>
        <div class="dev-tool-login">
            ${selectWithLabelHTML(userDropdown)} 
        </div>
        <p>Model: </p>
        ${modelDetails()}
        <input type="text" value="lise@example.com" id="" />
        <input type="text" value="N0rdp@ssw0rd99_" id="" />
    </div>`;
}



function modelDetails() {
    let html = '';
    for (const key in model) {
        if (Object.hasOwnProperty.call(model, key)) {
            const element = model[key];
            html += detailsComponent(key, `<pre>${JSON.stringify(element, null, 2)}</pre>`)
        }
    }
    return html;
}

function detailsComponent(summary, content) {
    return /*html*/`
    <details>
        <summary>${summary}</summary>
        ${content}
    </details>
    `
}

function getModel() {
    return model;
}

function openDevPopup() {
    let newWindow = open('/', 'example', 'width=300,height=300');
    newWindow.onload = function () {
        newWindow.document.body.innerHTML = popUp();
    };
}


