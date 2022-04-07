function updateGroupNewView() {
  const groupNew = model.inputs.groupNew;
  const groupNewViewInputs = {
    name: {
      labelText: 'Gruppenavn',
      value:  groupNew.name,
      onChange: 'model.inputs.groupNew.name = this.value',
      placeholderText: 'Skriv gruppenavn..',
      isRequired: true,
    },
    newNotification: {
      labelText: 'Ved ny undersøkelse',
      onChange: 'model.inputs.groupNew.newNotification = this.checked',
      isChecked: groupNew.newNotification,
    },
    reminderNotification:{
      labelText: 'Dagen før svarfrist',
      onChange: 'model.inputs.groupNew.reminderNotification = this.checked',
      isChecked: groupNew.reminderNotification,
    }, 
    description: {
      labelText: 'Beskrivelse av gruppen',
      value: groupNew.description,
      onChange: 'model.inputs.groupNew.description = this.value',
      columns: 45,
      rows: 10,
    },
    managerDropdown: {
      labelText: 'Teamledere',
      onChange: 'model.inputs.groupNew.managerDropdown = this.value',
      value: groupNew.managerDropdown,
      content: generateUserOptionList(getUsersFromRoleId(1)),
      buttonOnClick: "addManagerToList()",
      buttonText: "+",
    },
    userDropdown: {
      labelText: 'Brukere',
      onChange: 'model.inputs.groupNew.userDropdown = this.value',
      value: groupNew.userDropdown,
      content: generateUserOptionList(model.data.users),
      buttonOnClick: "addUserToList()",
      buttonText: "+",
    },
    startDate: {
      labelText: 'Startdato',
      value: groupNew.startDate,
      onchange: 'model.inputs.groupNew.startDate = this.value',
      placeholderText: 'Velg startdato',
      isRequired: true,
    },
    timeInterval: {
      labelText: 'Tidsintervall (dager)',
      value: groupNew.timeInterval,
      onChange: 'model.inputs.groupNew.timeInterval = parseInt(this.value)',
      placeholderText: 'Velg tidsintervall',
      isRequired: true,
    },
    deadline: {
      labelText: 'Svarfrist (dager)',
      value: groupNew.deadline,
      onChange: 'model.inputs.groupNew.deadline = parseInt(this.value)',
      placeholderText: 'Velg svarfrist',
      isRequired: true,
    },
  }
  return /*html*/ `
    <div class="group-new">
      <section>
      <form onsubmit="createGroupFromInputs(); return false">
          <h1>Ny gruppe</h1>
          ${inputTextWithLabelHTML(groupNewViewInputs.name)}
          ${groupNew.confirmName === false ? '<p style="color: red;">Gruppenavn er opptatt</p>' : ''}
          ${textAreaWithLabelHTML(groupNewViewInputs.description)}
          <div class="horizontal-flex">
            ${inputNumberWithLabelHTML(groupNewViewInputs.timeInterval)}
            ${inputDateWithLabelHTML(groupNewViewInputs.startDate)}
            ${inputNumberWithLabelHTML(groupNewViewInputs.deadline)}
          </div>
          <div>
            <label>Varsler</label>
            ${inputCheckboxWithLabelHTML(groupNewViewInputs.newNotification)}
            ${inputCheckboxWithLabelHTML(groupNewViewInputs.reminderNotification)}
          </div>
          <button>Fullfør gruppe</button>
      </form>
      </section>
      <section class="section-2">
        <div>
          ${selectWithLabelHTML(groupNewViewInputs.managerDropdown)}
          <ul>
            ${generateUserList(model.inputs.groupNew.managerIds)}
          </ul>
        </div>
        <div>
          ${selectWithLabelHTML(groupNewViewInputs.userDropdown)}
          <ul>
          ${generateUserList(model.inputs.groupNew.userIds)}
        </ul>
        </div>
      </section>
    </form>

    `;
}


function generateUserList(userIdList) {
  let optionList = ''
  for (const userId of userIdList) {
    const user = getUserFromID(userId);
    optionList += /*html*/`
      <li class="user-list-item">
        <div class="user-list">
          <p>${user.firstName} ${user.lastName}</p>
          <button onclick="removeUserFromList(${user.id})">X</button>
        </div>
      </li>`
  }
  return optionList;
}

function generateUserOptionList(userList) {
  let optionList = ''
  for (const user of userList) {
    optionList += /*html*/`
      <option value="${user.id}">
      ${user.firstName} ${user.lastName}
      </option>`
  }
  return optionList;
}