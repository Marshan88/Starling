// All common group controllers

/**
 * @description Returns an array of all the groups the user has access to, 
 * either as participant or manager
 */
function getGroupsFromUserID(userId, managerAccess) {
  let groupList = [];
  for (const group of model.data.groups) {
    let accessArray = managerAccess ? group.managerIds : group.userIds;
    if (accessArray.includes(userId)) {
      groupList.push(group);
    }
  }
  return groupList;
}

/**
 * @description Returns an array of all the surveys taken by a group, filtered by group IDs
 */
function getSurveysFromGroupId(groupId) {
  let surveyList = [];
  for (const survey of model.data.surveys) {
    if (survey.groupId === groupId) {
      surveyList.push(survey);
    }
  }
  return surveyList;
}

function getGroupFromGroupId(groupId) {
  let returnGroup = {};
  for (const group of model.data.groups) {
    if (group.id === groupId) {
      returnGroup = group;
      break;
    }
  }
  return returnGroup;
}
function getMostRecentSurveyFromGroupId(groupId) {
  let surveyList = getSurveysFromGroupId(groupId);
  let mostRecentSurveyTime = null;
  let mostRecentSurvey = {};
  for (const survey of surveyList) {
      let surveyDate = new Date(survey.date).getTime();
      if (surveyDate > mostRecentSurveyTime) {
        mostRecentSurveyTime = surveyDate;
        mostRecentSurvey = survey;
      }
  }
  return mostRecentSurvey;
}
