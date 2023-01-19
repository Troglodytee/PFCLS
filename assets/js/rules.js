/*
    A file which contains the rules popup interactions
*/

const rules_area = document.getElementById("rules-area");
document.getElementById("rules-button").addEventListener("click", () => {fadeInElement(rules_area); resizeRules();})
const rules_close_button = document.getElementById("rules-close")
rules_close_button.addEventListener("click", () => {fadeOutElement(rules_area);})

function resizeRules() {
    let rect = rules_area.firstElementChild.getBoundingClientRect();
    rules_close_button.style.top = ((window.innerHeight-rect.height)/2+SPACING)+"px";
    rules_close_button.style.right = ((window.innerWidth-rect.width)/2+SPACING)+"px";
}

window.addEventListener("resize", resizeRules);