function navbarCardUser() {
  const user = getUserFromID(model.app.userLoggedInId);
  const avatar = getObjFromID(user.avatarId, model.data.avatars);
  return /*html*/`
    <div class="navbar-card">
    ${avatarHTML(avatar)}
      <div>
          <h3>Hei ${user.firstName}!</h3>
          <p>Velkommen til din side</p>
      </div>
  </div>`
}

function navbarCard(tittel, beskrivelse, onClick = "") {
  return /*html*/`
    <button onclick="${onClick}" class="navbar-card">
      <div>
          <h3>${tittel}</h3>
          <p>${beskrivelse}</p>
      </div>
    </button>`
}

function articleCards(){
  let html = ``;
    for (const article of getArticles()) {
      html += informationCard(article)
    }
  return html;
}
  

function informationCard(articleObj = model.data.articles[0]){
  return /*html*/`
    <a class="information-card" href="${articleObj.url}">
    <img src="${articleObj.imageURL}">
    <div>
      <h3>${articleObj.title}</h3>
      <p>${articleObj.description}</p>
    </div>
    </a>`
}