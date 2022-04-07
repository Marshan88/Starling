function generateComparisonLineCharts() {
  let stageIndex = 0;
  for (stage of model.data.stageData) {
    new Chart(
      `group-comparison-${stage.id}-lineChart`,
      generateComparisonLineChartObject(stage, stageIndex));
    stageIndex++;
  }
}



function generateComparisonLineChartObject(stage, stageIndex) {
  const lineChart = {
    type: "line",
    data: {
      datasets: generateComparisonLineChartData(stageIndex),
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
            text: "Antall undersøkelser",
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
        title: {
          display: true,
          text: stage.id,
          color: 'dark grey',
          font: {size: 25, family: "Poppins", weight: '400',}
        },
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

function generateComparisonLineChartData(stageIndex) {
  const colors = ['255, 99, 132', '255, 205, 86', '100, 150, 86', '75, 192, 192', '102, 0, 102', '0, 51, 153'];
  const selectedGroups = [];
  let dataset = [];
  for (groupId of model.inputs.groupComparison.groupIds) {
    selectedGroups.push(getGroupFromGroupId(groupId));
  }
  for (let [groupindex, group] of selectedGroups.entries()) {
    const surveyList = getSurveysFromGroupId(group.id);
    let datalist = [];
    for (let [i, survey] of surveyList.entries()) {
      datalist.push({ x: (i + 1).toString(), y: survey.averageScores[stageIndex]});
    }
    dataset.push({
      label: group.name,
      data: datalist,
      fill: false,
      borderColor: `rgb(${colors[groupindex]})`,
      tension: 0.3,
    });  
  }
  return dataset;
}