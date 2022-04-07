function createComment() {
  let newId = getHighestIdFromArrayObj(model.data.comments) + 1;
  let userId = model.inputs.surveyPage.commentIsAnonymous ? null : model.app.userLoggedInId;
  let survey = getObjFromID(model.inputs.surveyPage.surveyId, model.data.surveys);
  let group = getObjFromID(survey.groupId, model.data.groups);
  model.data.comments.push({
    id: newId,
    managerIds: group.managerIds,
    text: model.inputs.surveyPage.commentText,
    userId: userId
  });
}


