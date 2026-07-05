// ============================================================
// MICROSCOPE GUIDE
// Displays the microscope guide template.
// ============================================================

function showMicroscopeGuide() {

    const template = document.getElementById("microscope-template");
    const clone = template.content.cloneNode(true);

    const detailContent = document.getElementById("detailContent");

    detailContent.innerHTML = "";
    detailContent.appendChild(clone);

    document.getElementById("homeView").classList.add("hidden");

    const detailView = document.getElementById("detailView");

    detailView.classList.remove("hidden");
    detailView.classList.add("overlay-fade-in");

    stopHomeBubbles();
    startDetailBubbles();
}