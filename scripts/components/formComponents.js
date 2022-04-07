/**
 * Input password component
 * @param {{labelText: string, savePass: boolean, onChange: string, placeholderText: string, minLength: number}} inputObj
 * @returns HTML string with a div that has label and input with type checkbox
 */
function passwordInputWithLabelHTML(inputObj) {
  return /*html*/`
    <div class="input-items">
    <label>${inputObj.labelText}</label>
    <input
      value="${inputObj.savePass ? inputObj.value : ""}"
      onchange="${inputObj.onChange}" 
      type="password"
      minlength="${inputObj.minLength}"
      placeholder="${inputObj.placeholderText}"
      required >
    </div>`
}

/**
 * Input text component
 * @param {{labelText: string, value: string, onChange: string, placeholderText: string, isRequired: boolean}} inputObj
 * @returns HTML string with a div that has label and input with type text
 */
function inputTextWithLabelHTML(inputObj) {
  return /*html*/ `
    <div class="input-items">
    <label>${inputObj.labelText}</label>
    <input 
      onchange="${inputObj.onChange}"
      value="${inputObj.value}"
      type="text"
      placeholder="${inputObj.placeholderText}" 
      ${inputObj.isRequired ? "required" : ""} />
    </div>`;
}

/**
 * Input text component
 * @param {{labelText: string, onChange: string, isChecked: boolean}} inputObj
 * @returns HTML string with a div that has label and input with type checkbox
 */
function inputCheckboxWithLabelHTML(inputObj) {
  return /*html*/ `
    <div>
    <input 
      onchange="${inputObj.onChange}"
      type="checkbox"
      ${inputObj.isChecked ? "checked" : ""}>
    <label>${inputObj.labelText}</label>
    </div>`;
}

/**
 * 
 * @param {{labelText: string, value: string, onChange: string, content: string, 
 *          buttonText: string, buttonOnClick: string}} inputObj 
 * @returns HTML string with a div that has label and select with type dropbox
 */
function selectWithLabelHTML(inputObj) {
  return /*html*/ `
      <div class="flex-down">
      <label>${inputObj.labelText}</label>
        <div>
          <select
            onchange="${inputObj.onChange}"
            value="${inputObj.value}">
            <option value="-1">Velg fra liste</option>
            ${inputObj.content}
          </select>
          <button 
            onclick="${inputObj.buttonOnClick}">
            ${inputObj.buttonText}
          </button>
        </div>
      </div>`;
}

/**
 * Input text component
 * @param {{labelText: string, value: string, onChange: string, columns: string, rows: string}} inputObj
 * @returns HTML string with a div that has label and textarea element
 */
function textAreaWithLabelHTML(inputObj) {
  return /*html*/`
    <div class="input-items">
    <label>${inputObj.labelText}</label>
    <textarea
    onchange="${inputObj.onChange}" cols="${inputObj.columns}" rows="${inputObj.rows}">${inputObj.value}</textarea>
  </div>`;
}

/**
 * 
 * @param {{labelText: string, value: string, onChange: string, placeholderText: string, isRequired: boolean}} inputObj 
 * @returns HTML string with a div that has label and input date element
 */
function inputDateWithLabelHTML(inputObj) {
  return /*html*/`
  <div class="input-items">
      <label>${inputObj.labelText}</label>
      <input
        value="${inputObj.value}"
        onchange="${inputObj.onChange}"
        type="date" 
        placeholder="${inputObj.placeholderText}" 
        ${inputObj.isRequired ? "required" : ""} />
    </div>`
}

/**
 * 
 * @param {{labelText: string, value: string, onChange: string, isRequired: boolean}} inputObj 
 * @returns HTML string with div that has label and input number element
 */
function inputNumberWithLabelHTML(inputObj) {
  return /*html*/`
  <div class="input-items">
  <label>${inputObj.labelText}</label>
  <input
    value="${inputObj.value}"
    onchange="${inputObj.onChange}"
    type="number"
    ${inputObj.isRequired ? "required" : ""}/>
  </div>
  `
}

/**
 * 
 * @param {{labelText: string, value: string, onChange: string, isRequired: boolean}} inputObj 
 * @returns HTML string with div that has label and input email element
 */
 function inputEmailWithLabeHTML(inputObj) {
  return /*html*/`
  <div class="input-items">
  <label>${inputObj.labelText}</label>
  <input
    value="${inputObj.value}"
    onchange="${inputObj.onChange}"
    type="email"
    placeholder="${inputObj.placeholderText}" 
    ${inputObj.isRequired ? "required" : ""}/>
  </div>
  `
}