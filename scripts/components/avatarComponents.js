/**
 * 
 * @param {{url: string, onclick: string}} inputObj 
 */
function avatarHTML(inputObj) {
  return /*html*/`
    <img src="${inputObj.url}" class="avatar" alt="" onclick="${inputObj.onclick}"/>`
}