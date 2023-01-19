function fadeInElement(element) {
    element.style.display = "flex";
    element.style.animation = "fade-in 0.2s";
}

function fadeOutElement(element) {
    element.style.animation = "fade-out 0.2s";
    setTimeout(() => {element.style.display = "none";}, 200);
}