function getNextSurveyDate(group) {
  let mostRecentSurvey = getMostRecentSurveyFromGroupId(group.id);
  let mostRecentSurveyTime = new Date(mostRecentSurvey.date).getTime();
  nextSurvey = new Date(
    mostRecentSurveyTime + group.intervals * 86400000
  ).toLocaleDateString('no-nB', { weekday: 'long', month: 'long', day: 'numeric' });
  return nextSurvey;
}

function generateDonutChart(survey) {
  let backgroundColors = [];
  for (stage of model.data.stageData) {
    backgroundColors.push(`rgb(${stage.color})`);
  }
  const donutChart = {
    type: "doughnut",
    data: {
      labels: survey.stageNames,
      datasets: [
        {
          label: "Donut",
          data: survey.averageScores,
          backgroundColor: backgroundColors,
          hoverOffset: 20,
        },
      ],
    },
    options: {
      cutout: 90 | "%",
      radius: 100 | "%",
      plugins: {
        legend: {
          labels: {
            color: "dark grey",
            font: { size: 20 },
          },
          position: "right",
          title: {
            color: "dark grey",
            display: true,
            text: "Forrige undersøkelse",
            font: { family: "Poppins", size: 16,},
          },
        },
      },
    },
    layout: {
      autoPadding: true,
    },
  };
  return donutChart;
}

function generateGroupSiteLineChart() {
  const lineChart = {
    type: "line",
    data: {
      datasets: generateGroupSiteLineChartData(),
    },
    options: {
      backgroundColor: "white",
      elements: {
        point: {
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHitRadius: 6,
      },
    },
      scales: {
        x: {
          title: {
            text: "Dato",
            display: true,
            font: {size: 15, family: "Poppins",}
          },
          ticks: {
            color: "dark grey",
          },
          grid: {
            color: "dark grey",
          },
        },
        y: {
          title: {
            text: "Poeng",
            display: true,
            font: {size: 15, family: "Poppins",}
          },
          ticks: {
            color: "dark grey",
          },
          grid: {
            color: "dark grey",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "dark grey",
            font: {size: 17, family: "Poppins"},
          },
        },
      },
    },
  };
  return lineChart;
}

function generateGroupSiteLineChartData() {
  const surveyList = getSurveysFromGroupId(model.inputs.groupSite.groupId);
  let dataList = [[], [], [], [], []];
  let datasets = [];
  for (const survey of surveyList) {
    const date = new Date(survey.date).toLocaleDateString('no-nB', { weekday: 'long', month: 'long', day: 'numeric' });
    for (let i = 0; i < 4; i++) {
      dataList[i].push({ x: date, y: survey.averageScores[i] });
    }
  }
  for (let i = 0; i < 4; i++) {
    const stage = model.data.stageData[i];
    datasets.push({
      label: stage.id,
      data: dataList[i],
      fill: false,
      borderColor: `rgb(${stage.color})`,
      tension: 0.3,
    });
  }
  return datasets;
}
