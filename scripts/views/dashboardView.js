function updateDashboardView () {
    return /*html*/`
    <div class="grid-dashboard">
      <nav class="navMenu" aria-label="cards">
      ${navbarCardUser()}
      ${getRoleFromUserID(model.app.userLoggedInId).id == 0 ? navbarCard("Alle grupper (Admin)", "Alle grupper", "redirectToPage('GroupList')") : navbarCard("Dine grupper", "Her er dine grupper", "redirectToPage('GroupList')")}
      ${navbarCard("Undersøkelser", "Din neste undersøkelse er i morgen", "redirectToPage('SurveyPage')")}
      </nav>
      <article class="information">
        <div class="information-cards">
          ${articleCards()}
        </div>
      </article>
    </div>`;
}
