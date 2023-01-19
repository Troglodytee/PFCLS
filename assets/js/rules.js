const rules_area = document.getElementById("rules-area");
rules_area.firstElementChild.addEventListener("scroll", resize);
document.getElementById("rules-button").addEventListener("click", () => {fadeInElement(rules_area); resize();})
const close_button = document.getElementById("rules-close")
close_button.addEventListener("click", () => {fadeOutElement(rules_area);})

function resize() {
    let rect = rules_area.firstElementChild.getBoundingClientRect();
    close_button.style.top = `${(window.innerHeight-rect.height)/2+SPACING}px`;
    close_button.style.right = `${(window.innerWidth-rect.width)/2+SPACING}px`;
}

window.addEventListener("resize", resize);