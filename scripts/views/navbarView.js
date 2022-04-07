function UpdateNavbar() {
  let iconInputs = {
    profile: {
      iconName: 'account_circle',
      page: 'UserProfile'
    },
    dashboard: {
      iconName: 'home',
      page: 'Dashboard'
    },
    logout: {
      onClick: 'logout()',
      iconName: 'logout',
    },
    grouplist: {
      iconName: 'groups',
      page: 'GroupList',
    },
    survey: {
      iconName: 'poll',
      page: 'SurveyPage',
    },
    logo: {
      url: 'assets/logo.svg'
    }
  }
  return /*html*/`
    <nav aria-label="hoved" class="navbar-main">
        ${iconRedirectButtonHTML(iconInputs.profile)}
        ${iconButtonHTML(iconInputs.logout)}
        ${iconRedirectButtonHTML(iconInputs.dashboard)}
        ${iconRedirectButtonHTML(iconInputs.grouplist)}
        ${iconRedirectButtonHTML(iconInputs.survey)}
        <div class="logo">${avatarHTML(iconInputs.logo)}</div>
    </nav>
    `
}
