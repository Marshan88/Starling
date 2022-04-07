

// lage ny gruppe
// check if group name already exist

function isUserInList(id) {
    const groupNew = model.inputs.groupNew;

    if (groupNew.managerIds.includes(id) === false && groupNew.userIds.includes(id) === false) {
        return false;
    }
    return true;

}

function addUserToList() {
    let userId = parseInt(model.inputs.groupNew.userDropdown);
    if (isUserInList(userId) === false && userId > -1) {
        model.inputs.groupNew.userIds.push(userId);
        updateMainView();
    }
}

function addManagerToList() {
    let userId = parseInt(model.inputs.groupNew.managerDropdown);
    if (isUserInList(userId) === false && userId > -1) {
        model.inputs.groupNew.managerIds.push(userId);
        updateMainView();
    }
}

function isGroupNameAvailable() {
    for (const group of model.data.groups) {
        if (group.name.toLowerCase() === model.inputs.groupNew.name.toLowerCase()) {
            return false;
        }
    }
    return true;
}

function removeUserFromList(userId) {
    const groupNew = model.inputs.groupNew;
    let managerIndex = groupNew.managerIds.findIndex(managerId => managerId === userId);
    let userIndex = groupNew.userIds.findIndex(id => id === userId);

    if (managerIndex > -1) {
        groupNew.managerIds.splice(managerIndex, 1);
    }
    if (userIndex > -1) {
        groupNew.userIds.splice(userIndex, 1);
    }
    updateMainView();
}

// createGroupFromInputs
// do validation - run isGroupNameAvailable | x
// create group object from inputs
// add group object to model
// redirect to group list page
// reset group new fields

function createGroupFromInputs() {
    const groupNew = model.inputs.groupNew;
    groupNew.confirmName = isGroupNameAvailable();
    if (groupNew.confirmName === false) {
        updateMainView();
        return;
    }
    const groupSignupInputs = model.inputs.groupNew;
    let highestId = getHighestIdFromArrayObj(model.data.groups);
    let newgroupId = highestId + 1;

    let newGroup = {
        id: newgroupId,
        name: groupSignupInputs.name,
        description: groupSignupInputs.description,
        intervals: groupSignupInputs.timeInterval,
        startDate: toStringDate(new Date(groupSignupInputs.startDate)),
        deadline: groupSignupInputs.deadline,
        userIds: groupSignupInputs.userIds,
        managerIds: groupSignupInputs.managerIds,
    }
    model.data.groups.push(newGroup);
    redirectToPage("GroupList");
}