// Survey page navigation

function nextSurveyPage() {
  const surveyPage = model.inputs.surveyPage;
  surveyPage.pageNumber += 1;
  updateMainView();
}

function previousSurveyPage() {
  const surveyPage = model.inputs.surveyPage;
  surveyPage.pageNumber -= 1;
  updateMainView();
}

function isFirstSurveyPage() {
  return model.inputs.surveyPage.pageNumber == 1;
}

function isLastSurveyPage() {
  return model.inputs.surveyPage.pageNumber == model.inputs.surveyPage.lastPageNumber;
}

// Survey questions

function parseQuestion(question) {
  let splitQuestionArray = question.split(':');
  return {
    number: Number(splitQuestionArray[0]),
    text: splitQuestionArray[1]
  }
}

function setAnswerValue(questionNumber, value) {
  model.inputs.surveyPage.answers[questionNumber - 1] = value;
}

function getAnswerValue(questionNumber) {
  return model.inputs.surveyPage.answers[questionNumber - 1];
}

function updateSurveyInputComment(value) {
  model.inputs.surveyPage.commentText = value;
}

function updateSurveyInputAnonymousInput(checked) {
  model.inputs.surveyPage.commentIsAnonymous = checked;
}

function setupEmptySurvey() {
  
  model.inputs.surveyPage.answers = new Array(32).fill(0, 0);
}

function getCurrentSurvey() {
  return getObjFromID(model.inputs.surveyPage.surveyId, model.data.surveys);
}

function getSurveyTitle() {
  return `Undersøkelse ${new Date().toLocaleDateString('no-nB', { weekday: 'long', month: 'long', day: 'numeric' })}`
}

function parseTemplateForCalculation(template) {
  const calculationOutput = {
    pages: []
  }
  // Go through the pages that are in template (input)
  for (const page of template.pages) {
    const pageCalculation = {
      title: page.title,
      questionIndexList: [],
    }

    for (const question of page.questions) {
      let splitQuestionArray = question.split(':');
      let questionNumber = parseInt(splitQuestionArray[0], 10);
      pageCalculation.questionIndexList.push(questionNumber - 1);
    }
    calculationOutput.pages.push(pageCalculation);
  }
  return calculationOutput;
}

function CalculateTotalScore(calculationInput, surveyAnswers = []) {
  const output = {
    totalScores: [],
    stageNames: [],
  }
  for (const page of calculationInput.pages) {
    let totalPageScore = 0;
    for (const questionIndex of page.questionIndexList) {
      totalPageScore += surveyAnswers[questionIndex];
    }
    output.totalScores.push(totalPageScore);
    output.stageNames.push(page.title);
  }
  return output;
}

function CreateSurvey(groupId, date = new Date().toISOString().split('T')[0], isInterval = true) {
  const surveys = model.data.surveys;
  let newId = getHighestIdFromArrayObj(surveys) + 1;
  surveys.push({
    id: newId,
    groupId: groupId,
    date: date,
    totalAnswers: 0,
    totalScores: [],
    stageNames: [],
    averageScores: [],
    isInterval: isInterval,
  })
  model.inputs.surveyPage.surveyId = newId;
}

function updateAverageScores(survey) {
  for (let i = 0; i < survey.totalScores.length; i++) {
    survey.averageScores[i] = survey.totalScores[i] / survey.totalAnswers;
  }
}

function addValuesToArray(array, newValues) {
  for (let i = 0; i < newValues.length; i++) {
    if(array[i] == null) {
      array[i] = newValues[i];
      continue;
    }
    array[i] += newValues[i];
  }
  return array;
}

function handleSurveyFinished() {
  const surveyPage = model.inputs.surveyPage;
  
  if(!checkAllAnswersAnswered()) {
    return; 
  }
  
  let indexTemplate = parseTemplateForCalculation(model.data.templates[0]);
  let calculatedTotalScore = CalculateTotalScore(indexTemplate, surveyPage.answers);
  CreateSurvey(1);
  let survey = getObjFromID(surveyPage.surveyId, model.data.surveys);
  
  survey.totalScores = addValuesToArray(survey.totalScores, calculatedTotalScore.totalScores)
  survey.stageNames = addValuesToArray(survey.stageNames, calculatedTotalScore.stageNames);
  survey.totalAnswers += 1;
  
  updateAverageScores(survey);
  createComment();
  
  resetSurveyInputs();
  
  redirectToPage('Dashboard');
}

function checkAllAnswersAnswered() {
  return !model.inputs.surveyPage.answers.includes(0);
}

function resetSurveyInputs() {
  model.inputs.surveyPage = {
    surveyId: null,
    lastPageNumber: 4,
    pageNumber: 1,
    answers: [],
    commentText: '',
    commentIsAnonymous: false,
    confirmSubmission: false,
  }
}