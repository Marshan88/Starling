function updateGroupSiteView() {
    let hasManagerAccess = false;
    if (getRoleFromUserID(model.app.userLoggedInId).id !== 2) {
        hasManagerAccess = true;
    }
    if (model.inputs.groupSite.groupId === null) model.inputs.groupSite.groupId = 0;
    const group = getGroupFromGroupId(model.inputs.groupSite.groupId);
    let html = `
    <div class="group-site-gridContainer">
    ${hasManagerAccess ? `
        <div class="group-site-buttons">
            <button onclick="">Send undersøkelse</button>
            <button onclick="redirectToPage('Comments')">Kommentarer</button>
            <button onclick="">Last ned PDF</button>
            <button onclick="redirectToPage('GroupSiteEdit')">Rediger</button>
        </div>`
            : ""}
    
    <h1 class="group-site-h1">${group.name}</h1>
    <div class="group-site-description">${group.description}</div>
        <div class="group-site-interval">
            <h3>Tidsintervall</h3>
            <p>${group.intervals} Dager</p>
        </div>
        <div class="group-site-count">
            <h3>Antall undersøkelser</h3>
            <p>${getSurveysFromGroupId(group.id).length}</p>
        </div>
        <div class="group-site-next">
        <h3>Neste undersøkelse</h3>
        <p>${getNextSurveyDate(group)}</p>
        </div>
    <div class="group-site-participantList">
        <div class="group-site-participantList-head">Deltakerliste</div>
    `
    for (let i = 0; i < group.userIds.length; i++) {
        const user = getUserFromID(group.userIds[i]);
        html += `
        <div class="group-site-participant">
            ${user.firstName} ${user.lastName}
        </div>
        `
    }
    html += `</div>
        <div style="width: 500px; height: 300px;" class="group-site-donutChart">
          <canvas id="group-site-donutChart""></canvas>
        </div>
        <div class="group-site-lineChart">
          <canvas id="group-site-lineChart"></canvas>
        </div>
        </div>
    `
    return html;
}