function updateGroupListView() {
    let hasManagerAccess = false;
    let disableButtons = '';
    if (getRoleFromUserID(model.app.userLoggedInId).id !== 2) {
        hasManagerAccess = true;
    }
    if (model.inputs.groupList.markedGroupIds.length === 0) disableButtons = 'disabled';
    else disableButtons = '';
    let html = `<div class="group-list">
    <h1>Gruppeoversikt<h1>
    ${hasManagerAccess ? `
        <div class="group-list-buttons">
            <button ${disableButtons}>Last ned PDF</button>
            <button onclick="model.inputs.groupComparison.groupIds = model.inputs.groupList.markedGroupIds; redirectToPage('GroupComparison')" ${disableButtons}>Sammenlign</button>
            <button onclick="redirectToPage('GroupEdit')" ${disableButtons}>Rediger</button>
            <button onclick="redirectToPage('GroupNew')">Lag ny</button>
        </div>`
            : ""}
    
<table class="group-list-table">
    <thead style="border: solid black 1px;" class="group-list-table-head">
        <tr>
        ${hasManagerAccess ? `<th><input onchange="checkAllBox(this.checked)" type="checkbox" 
                        ${model.inputs.groupList.checkedAll ? "checked" : ""}></th>` : ""}
            <th>Navn</th>
            <th>Neste undersøkelse</th>
            <th>Forrige undersøkelse</th>
            <th>Tidsintervall</th>
            <th>Antall undersøkelser</th>
            <th>Opprettelsesdato</th>
        </tr>
    </thead>
    <tbody class="group-list-table-body">
    `
    for (const group of getGroupsFromUserID(model.app.userLoggedInId, model.app.userLoggedInId == 7 ? false : true)) {
        let nextSurvey = getNextSurveyDate(group);
        let mostRecentSurvey = new Date(getMostRecentSurveyFromGroupId(group.id).date).toLocaleDateString('no-nB', { weekday: 'long', month: 'long', day: 'numeric' });
        let isSurveyAvailable = false;
        if (nextSurvey <= new Date().toLocaleDateString('no-nB', { weekday: 'long', month: 'long', day: 'numeric' })) {
            isSurveyAvailable = true;
        }
        if (nextSurvey == "Invalid Date") nextSurvey = "Ingen undersøkelser funnet";
        if (mostRecentSurvey == "Invalid Date") mostRecentSurvey = "Ingen undersøkelser fullført";
        html += `
        <tr>
            ${hasManagerAccess ? `
                <td><input onchange="editMarkedGroups(this.checked, ${group.id})" type="checkbox" 
                ${model.inputs.groupList.markedGroupIds.includes(group.id) ? "checked" : ""}></td>`
                : ""}
            <td onclick="setGroupSiteId(${group.id}); redirectToPage('GroupSite'); " class="group-list-name">${group.name}</td>
            <td onclick="${isSurveyAvailable ? "redirectToPage('SurveyPage')" : ""}" class="${isSurveyAvailable ? "group-list-nextSurvey" : ""}">
                            ${isSurveyAvailable ? "Ny undersøkelse tilgjengelig" : nextSurvey}</td>
            <td>${mostRecentSurvey}</td>
            <td>${group.intervals}</td>
            <td>${getSurveysFromGroupId(group.id).length}</td>
            <td>${new Date(group.startDate).toLocaleDateString('no-nB', { weekday: 'short', month: 'long', day: 'numeric' }).slice(4)}</td>
        </tr>
        `
    }

    html += `
    </tbody>
    </div>`
    return html;
}

function setGroupSiteId(groupId) {
    model.inputs.groupSite.groupId = groupId;
}