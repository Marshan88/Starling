/**
 * Icon html
 * @param {{className: string, onClick: string, className: string}} inputObj
 */
function iconButtonHTML(inputObj) {
  inputObj.className = '';
  return /*html*/`
  <button class="icon-button" onclick="${inputObj.onClick}">
    ${iconHTML(inputObj)}
  </button>
  `;
}


/**
 * Icon html
 * @param {{className: string, iconName: string, page: string}} inputObj
 */
function iconRedirectButtonHTML(inputObj) {
  inputObj.className = '';
  return /*html*/`
  <button class="icon-button" onclick='redirectToPage("${inputObj.page}")'>
    ${iconHTML(inputObj)}
  </button>
  `;
}

/**
 * Icon html
 * @param {{className: string, iconName: string}} inputObj
 */
function iconHTML(inputObj) {
  inputObj.className = '';
  return /*html*/`
  <span class="material-icons ${inputObj.className}">
      ${inputObj.iconName}
  </span>
  `;
}