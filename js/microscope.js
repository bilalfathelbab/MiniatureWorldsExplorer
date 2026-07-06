// ============================================================
// MICROSCOPE GUIDE
// Displays the microscope guide template.
// ============================================================

function showMicroscopeGuide() {
  const template = document.getElementById('microscope-template');
  const clone = template.content.cloneNode(true);
  const detailContent = document.getElementById('detailContent');

  detailContent.innerHTML = '';
  detailContent.appendChild(clone);
  document
  .getElementById('detailWrapper')
  .classList.add('microscope-mode');

  document.getElementById('homeView').classList.add('hidden');

  const detailView = document.getElementById('detailView');
  startDetailBubbles();
  restartDetailPanelAnimation(detailView);
  detailView.classList.remove('hidden', 'detail-overlay-hidden', 'overlay-fade-out');
  detailView.classList.add('detail-overlay-visible');
  detailView.classList.add('overlay-fade-in');
}
