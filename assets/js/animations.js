function fadeInElement(element) {
    element.style.display = "flex";
    element.style.animation = `fade-in ${FADE_DURATION/1000}s`;
}

function fadeOutElement(element) {
    element.style.animation = `fade-out ${FADE_DURATION/1000}s`;
    setTimeout(() => {element.style.display = "none";}, FADE_DURATION);
}

function moveTo(objects, n) {
    if (n > 0) {
        for (i of objects) {
            let rect = i[0].getBoundingClientRect();
            let diff_x = i[2]-rect.left;
            let diff_y = i[1]-rect.top;
            i[0].style.top = (rect.top+diff_y/n)+"px";
            i[0].style.left = (rect.left+diff_x/n)+"px";
        }
        setTimeout(() => {moveTo(objects, n-1);}, ANIMATION_FRAME_DURATION);
    }
}

function rotation(element, angle, n, i) {
    if (i > 0) {
        element.style.transform = `rotate(${angle/n*(n-i)}deg)`;
        setTimeout(() => {rotation(element, angle, n, i-1)}, ANIMATION_FRAME_DURATION);
    }
}

function slip(attacker, victim, n) {
    if (n > 0) {
        let rect = attacker.getBoundingClientRect();
        let rect2 = victim.getBoundingClientRect();
        attacker.style.left = (rect.left+(rect2.left-rect.left)/n)+"px";
        setTimeout(() => {slip(attacker, victim, n-1)}, ANIMATION_FRAME_DURATION);
    }
}

function jump(attacker, victim, n) { ////////
    if (n > 0) {
        let rect = attacker.getBoundingClientRect();
        let rect2 = victim.getBoundingClientRect();
        attacker.style.left = (rect.left+(rect2.left-rect.left)/n)+"px";
        setTimeout(() => {jump(attacker, victim, n-1)}, ANIMATION_FRAME_DURATION);
    }
}

function pushBack(element, side, n) {
    if (n > 0) {
        let rect = element.getBoundingClientRect();
        if (side) {element.style.left = (rect.left+(window.innerWidth-rect.left)/n)+"px";}
        else {element.style.left = (rect.left-(rect.left+rect.width)/n)+"px";}
        setTimeout(() => {pushBack(element, side, n-1)}, ANIMATION_FRAME_DURATION);
    }
}

function fall(element, n) {
    if (n > 0) {
        let rect = element.getBoundingClientRect();
        element.style.top = (rect.top+(window.innerHeight-rect.top)/n)+"px";
        setTimeout(() => {fall(element, n-1)}, ANIMATION_FRAME_DURATION);
    }
}