/*
to do:
    Om det ikke er gjort undersøkelse enda, sett neste undersøkelse utifra startdato til gruppen
*/

/**
 * @description Adds the groupId to the list of marked groups when they are turned on, and removes them when they are turned off.
 */
function editMarkedGroups(isChecked, groupId) {
    const groupList = model.inputs.groupList;
    if (isChecked === true) {
        groupList.markedGroupIds.push(groupId);
    }
    if (isChecked === false) {
        groupList.checkedAll = false;
        let index = groupList.markedGroupIds.findIndex(function (id) {
            return id === groupId;
        });
        groupList.markedGroupIds.splice(index, 1);
    }
    updateMainView();
}

/**
 * @description Adds all missing groups to the marked group array
 */
function checkAllBox(isChecked) {
    const groupList = model.inputs.groupList;
    const groupIds = getGroupsFromUserID(model.app.userLoggedInId, true);
    if (isChecked === true) {
        groupList.checkedAll = true;
        groupList.markedGroupIds = [];
        for (const group of groupIds) {
            groupList.markedGroupIds.push(group.id);
        }
    }
    else if (isChecked === false) {
        groupList.markedGroupIds = [];
        groupList.checkedAll = false;
    }
    updateMainView();
}