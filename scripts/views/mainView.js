const appElement = document.getElementById('app');
let showDevTools = true;

updateMainView();

function enableDev() {
  showDevTools = !showDevTools;
  updateMainView();
}

function updateMainView() {
  const appPage = model.app.page;
  let showNavbar = true;

  switch (appPage) {
    case 'UserLogin':
      showNavbar = false;
      break;
    case 'UserSignup':
      showNavbar = false;
      break;
  }

  const appPageView = getAppPageView(appPage);

  appElement.innerHTML = `
    ${showDevTools ? DevToolView() : ''}
    
    <header class="grid-header">
      ${showNavbar ? UpdateNavbar() : ''}
    </header>
    <main class="grid-main">
      ${appPageView === undefined ? `<h2>Error ${appPage} not found</h2>` : appPageView()}
    </main>`;
    if (appPage == 'GroupSite') {
      new Chart('group-site-donutChart', generateDonutChart(getMostRecentSurveyFromGroupId(model.inputs.groupSite.groupId)));
      new Chart('group-site-lineChart', generateGroupSiteLineChart()); 
    }
    if (appPage == 'GroupComparison') {
      generateComparisonLineCharts();
    }
}

function getAppPageView(appPage = '') {
  return window[`update${appPage}View`];
}


