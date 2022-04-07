// surveyQuestionCardHTML
function surveyQuestionCardHTML(inputObj) {
  return /*html*/ `
    <li>
    <article class="survey-question">
      <p class="survey-text">${inputObj.questionText}</p>
      <fieldset 
        class="survey-fields">
          ${generateFieldsAndSelectChecked(inputObj)}
      </fieldset>
    </article>
  </li>
    `;
}

function generateFieldsAndSelectChecked(inputObj) {
  let HTML = ''
  for(let i = 1; i < 5+1; i++) {
    HTML += `<input onchange="${inputObj.onChange}" type="radio" name="${inputObj.radioName}" value="${i}" 
    ${i == inputObj.checkedRadio ? 'checked' : ''}>`
  }
  return HTML;
}

// onchange value

function surveyHeader(inputObj) {
  return /*html*/ `
  <h1 style="font-weight: 500; color: rgb(60, 60, 60);">${inputObj.title}</h1>
  <p>${inputObj.subTitle}</p>
  <section>
    <header class="survey-header">
      <h3></h3>
      <div class="description-titles">
        <h4 class="answerOne">Nesten aldri</h4>
        <h4 class="answerTwo">Sjeldent</h4>
        <h4 class="answerThree">Noen ganger</h4>
        <h4 class="answerFour">Ofte</h4>
        <h4 class="answerFive">Nesten alltid</h4>
      </div>
    </header>`;
}
