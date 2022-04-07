function updateGroupComparisonView() {
  let html = `<div class="group-comparison">`;
  for (stage of model.data.stageData) {
    html += `
            <div class="group-comparison-lineChart">
                <canvas id="group-comparison-${stage.id}-lineChart"></canvas>
            </div>`;
  }
  html += `</div>`;
  return html;
}
