import { nameList } from './nameList.js';
import { lastNameList } from './lastNameList.js'
const emailProviders = [ "hotmail", "gmail", "yahoo"]
const emailTLD = ["net", "com", "org", "no"];
const numberArray = [...Array(10).keys()];

function reverseString(str) {
  return str.split("").reverse().join("");
}

function randomElementFromArray(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

function generateNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function randomNumberString(min, max, numberList = numberArray) {
  let numbers = '';
  let randomNum = Math.floor(Math.random() * (max - min));
  for (let i = 0; i < Array.from({ length: randomNum }, (_, i) => i+1) + min; i++) {
    numbers += randomElementFromArray(numberList);
  }
  return numbers;
}

function getNewDate(date, days) {
  return  new Date(date).getTime() - (days * 86400000);
}


const fakeData = {
  name(nameArray = nameList) {
    return randomElementFromArray(nameArray);
  },
  lastName(lastNameArray = lastNameList) {
    return randomElementFromArray(lastNameArray);
  },
  username(minNumbers = 2, maxNumbers = 3) {
    return `${fakeData.name()}${randomNumberString(minNumbers, maxNumbers)}`;
  },
  password(username = fakeData.username(2, 4), minNumbers = 2, maxNumbers = 3) {
    return `${reverseString(username)}${randomNumberString(minNumbers, maxNumbers)}`;
  },
  email(overrideName = '', tldList = emailTLD, providerList = emailProviders,) {
    const TLD = randomElementFromArray(tldList);
    const provider = randomElementFromArray(providerList);
    const userName = overrideName != ''  ? overrideName : fakeData.username();
    return `${userName}@${provider}.${TLD}`;
  },
  user(id, roleId, avatarId) {
    return {
      id,
      firstName: fakeData.name(),
      lastName: fakeData.lastName(),
      email: fakeData.email(),
      password: fakeData.password(),
      roleId,
      avatarId,
    }
  },
  group({id, userIds, managerIds, intervals, startDate, deadline}) {
    return {
      id,
      name: `Gruppe ${groupId + 1}`,
      description: `Beskrivelse av en gruppe`,
      intervals,
      startDate,
      deadline,
      userIds,
      managerIds
    }
  },
  surveyAnswer(minScore, maxScore, totalAnswers = 1) {
    const surveyAnswer = {
      totalScores: [0, 0, 0, 0],
      averageScores: [0, 0, 0, 0]
    }
    for (let i = 0; i < totalAnswers; i++) {
      for (let j = 0; j < 4; j++) {
        surveyAnswer.totalScores[j] += generateNumber(minScore, maxScore);
        
      }
    }
    for (let i = 0; i < 4; i++) {
      surveyAnswer.averageScores[i] = Math.floor(surveyAnswer.totalScores[i] / totalAnswers);
    }
    return surveyAnswer;
  },
  survey(id, groupId, date, totalAnswers, isInterval = true) {
    const surveyAnswer = fakeData.surveyAnswer(8, 40, totalAnswers);
    return {
      id, 
      groupId,
      date,
      totalAnswers,
      totalScores: surveyAnswer.totalScores,
      stageNames: ['Forming', 'Storming', 'Norming', 'Performing'],
      averageScores: surveyAnswer.averageScores,
      isInterval,
    }
  },
  surveys(firstId, groupId, intervals, amount, startDate) {
    let surveys = [];
    let currentId = firstId;
    let currentDate = startDate;
    for (let i = 0; i < amount; i++) {
        currentDate = i == 0 ? new Date(currentDate).toISOString().split('T')[0] : new Date(getNewDate(currentDate, intervals)).toISOString().split('T')[0];
        surveys.push(fakeData.survey(currentId, groupId, currentDate, 5));
        currentId++;
    }
    return surveys.reverse();
  }
}

let globalFirstId = 0;

const newSurvey1 = fakeData.surveys(globalFirstId, 0, 7, 6, new Date().toISOString().split('T')[0]);
globalFirstId += 6;
for (const survey of newSurvey1) {
  model.data.surveys.push(survey);
}

const newSurvey2 = fakeData.surveys(globalFirstId, 1, 14, 5, getNewDate(new Date().toISOString().split('T')[0], 2));
globalFirstId += 5;
for (const survey of newSurvey2) {
  model.data.surveys.push(survey);
}

const newSurvey3 = fakeData.surveys(globalFirstId, 2, 14, 7, new Date().toISOString().split('T')[0]);
for (const survey of newSurvey3) {
  model.data.surveys.push(survey);
}

const userListExample = [
  {
    firstName: 'Anders',
    lastName: 'A',
    groupId: 0
  },
  {
    firstName: 'Carina',
    lastName: 'B',
    groupId: 0
  },
  {
    firstName: 'Geir',
    lastName: 'S',
    groupId: 0
  },
  {
    firstName: 'Pathom',
    lastName: 'S',
    groupId: 0
  },
  {
    firstName: 'Lillie',
    lastName: 'R',
    groupId: 1
  },
  {
    firstName: 'Marius',
    lastName: 'H',
    groupId: 1
  },
  {
    firstName: 'Marcus',
    lastName: 'B',
    groupId: 1
  },
  {
    firstName: 'Elisabeth',
    lastName: 'H',
    groupId: 1
  },
  {
    firstName: 'Anders',
    lastName: 'K',
    groupId: 2
  },
  {
    firstName: 'Magnus',
    lastName: 'K',
    groupId: 2
  },
  {
    firstName: 'Alexander',
    lastName: 'B',
    groupId: 2
  },
  {
    firstName: 'Linn',
    lastName: 'Ø',
    groupId: 2
  },
]

function generateUsers() {
  let nextId = 3;
  for (const user of userListExample) {
    let group = getObjFromID(user.groupId, model.data.groups);
    group.userIds.push(nextId);
    model.data.users.push({
      id: nextId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: fakeData.email(user.firstName),
      password: fakeData.password(),
      roleId: 2,
      avatarId: 3
    })
    nextId++;
  }
}

generateUsers();