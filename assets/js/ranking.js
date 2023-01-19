const ranking_area = document.getElementById("ranking-area");
document.getElementById("ranking-button").addEventListener("click", () => {
    computeRanking();
    fadeInElement(ranking_area);
    resizeRanking();
})
const ranking_close_button = document.getElementById("ranking-close")
ranking_close_button.addEventListener("click", () => {fadeOutElement(ranking_area);})
const ranking_score_section = document.getElementById("ranking-scores-section");

function resizeRanking() {
    let rect = ranking_area.firstElementChild.getBoundingClientRect();
    ranking_close_button.style.top = ((window.innerHeight-rect.height)/2+SPACING)+"px";
    ranking_close_button.style.right = ((window.innerWidth-rect.width)/2+SPACING)+"px";
}

function computeRanking() {
    ranking_score_section.innerHTML = "";
    let ratio = {};
    for (i of characters) {
        if (scores[i][0]+scores[i][1] == 0) {ratio[i] = null;}
        else {ratio[i] = parseFloat((scores[i][0]/(scores[i][0]+scores[i][1])*100).toFixed(3));}
    }
    let names = {
        "sheldon" : "Sheldon",
        "leonard" : "Léonard",
        "howard"  : "Howard",
        "raj"     : "Raj",
    };
    let n = 1;
    while (Object.keys(ratio).length > 0) {
        let max = null;
        for (i in ratio) {
            if (max == null || ratio[max] == null && ratio[i] != null || ratio[i] > ratio[max]) {max = i;}
        }
        let rank;
        let text;
        if (ratio[max] === null) {
            rank = "<p class=\"fs-xl text-black\">-</p>";
            text = "<p class=\"text-black\">Aucune partie jouée</p>";
        }
        else {
            if (n == 1) {rank = "<p class=\"fs-xl text-gold\">1er</p>";}
            else if (n == 2) {rank = "<p class=\"fs-xl text-silver\">2e</p>";}
            else if (n == 3) {rank = "<p class=\"fs-xl text-bronze\">3e</p>";}
            else {rank = `<p class="fs-xl text-black">${n}e</p>`;}
            text = `
                <p class="text-black">${ratio[max]}% de victoires</p>
                <p class="text-black">(${scores[max][0]} victoires et ${scores[max][1]} défaites)</p>
            `;
        }
        let container = document.createElement("div");
        container.className = "row";
        container.innerHTML = `
            ${rank}
            <div class="circle border border-black bg-white">
                <img class="w-100" src="assets/img/player/${max}.svg">
            </div>
            <div>
                <p class="fs-lg text-black">${names[max]}</p>
                ${text}
            </div>
        `;
        ranking_score_section.append(container);
        delete ratio[max];
        n++;
    }
}

window.addEventListener("resize", resizeRanking);