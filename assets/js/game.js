const round_counter = document.getElementById("round-counter");
const robot_score_indicator = document.getElementById("robot-score");
const player_score_indicator = document.getElementById("player-score");

const robot_avatar = document.getElementById("robot-avatar");
var robot_thinking;
var robot_choice_y = (BIG_CIRCLE_SIZE+SPACING)*(-5);
const robot_choice = document.getElementById("robot-choice");

const player_choice = document.getElementById("player-choice");
const choices_area = document.getElementById("choices-area");
const symbols = ["rock", "paper", "scissor", "lizard", "spock"];
var choices = [];
for (let i = 0; i < symbols.length; i++) {choices.push(document.getElementById(symbols[i]));}

const fight_bg = document.getElementById("fight-bg");

const end_area = document.getElementById("end-area");
const victory_text = document.getElementById("victory-text");
const victory_ratio = document.getElementById("victory-ratio");
const rematch_button = document.getElementById("rematch-button");

function winOrLoose(player, robot) {
    if (player == robot) {return null}
    else if (player == "rock" && robot == "paper") {return false}
    else if (player == "rock" && robot == "scissor") {return true}
    else if (player == "rock" && robot == "lizard") {return true}
    else if (player == "rock" && robot == "spock") {return false}
    else if (player == "paper" && robot == "rock") {return true}
    else if (player == "paper" && robot == "scissor") {return false}
    else if (player == "paper" && robot == "lizard") {return false}
    else if (player == "paper" && robot == "spock") {return true}
    else if (player == "scissor" && robot == "rock") {return false}
    else if (player == "scissor" && robot == "paper") {return true}
    else if (player == "scissor" && robot == "lizard") {return true}
    else if (player == "scissor" && robot == "spock") {return false}
    else  if (player == "lizard" && robot == "rock") {return false}
    else if (player == "lizard" && robot == "paper") {return true}
    else if (player == "lizard" && robot == "scissor") {return false}
    else if (player == "lizard" && robot == "spock") {return true}
    else if (player == "spock" && robot == "rock") {return true}
    else if (player == "spock" && robot == "paper") {return false}
    else if (player == "spock" && robot == "scissor") {return true}
    else if (player == "spock" && robot == "lizard") {return false}
    else {return null;}
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
        setTimeout(() => {moveTo(objects, n-1);}, 30);
    }
}

function rotateToCenter(left_sword, right_sword, n, i) {
    if (i > 0) {
        let rect = left_sword.getBoundingClientRect();
        let diff_x = (window.innerWidth-600)/2-rect.left;
        let diff_y = (window.innerHeight-600)/2-rect.top;
        left_sword.style.top = (rect.top+diff_y/i)+"px";
        left_sword.style.left = (rect.left+diff_x/i)+"px";
        left_sword.firstElementChild.style.transform = `rotate(${180/n*(n-i+1)}deg)`;
        rect = right_sword.getBoundingClientRect();
        diff_x = (window.innerWidth+200)/2-rect.left;
        diff_y = (window.innerHeight-600)/2-rect.top;
        right_sword.style.top = (rect.top+diff_y/i)+"px";
        right_sword.style.left = (rect.left+diff_x/i)+"px";
        right_sword.firstElementChild.style.transform = `rotate(${-180/n*(n-i+1)}deg)`;
        setTimeout(() => {rotateToCenter(left_sword, right_sword, n, i-1);}, 20);
    }
}

function attack(attacker, victim, n) {
    if (n > 0) {
        let rect = attacker.getBoundingClientRect();
        let rect2 = victim.getBoundingClientRect();
        attacker.style.left = (rect.left+(rect2.left-rect.left)/n)+"px";
        setTimeout(() => {attack(attacker, victim, n-1)}, 20);
    }
}

function fall(symbol, n) {
    if (n > 0) {
        let rect = symbol.getBoundingClientRect();
        symbol.style.top = (rect.top+(window.innerHeight-rect.top)/n)+"px";
        setTimeout(() => {fall(symbol, n-1)}, 20);
    }
}

function fight(choosen, placeholder, choosen2) {
    if (robot_thinking == 6) {
        let player_symbol = choosen.cloneNode();
        let robot_symbol = robot_choice.children[5-choosen2].cloneNode();

        let rect = choosen.getBoundingClientRect();
        player_symbol.style.position = "absolute";
        player_symbol.style.top = rect.top+"px";
        player_symbol.style.left = rect.left+"px";
        player_symbol.style.width = BIG_CIRCLE_SIZE+"px";
        document.body.append(player_symbol);

        rect = robot_choice.parentElement.getBoundingClientRect();
        robot_symbol.style.position = "absolute";
        robot_symbol.style.top = (rect.top+SPACING)+"px";
        robot_symbol.style.left = (rect.left+SPACING)+"px";
        robot_symbol.style.width = BIG_CIRCLE_SIZE+"px";
        document.body.append(robot_symbol);

        choosen.style.display = "none";
        robot_choice.style.display = "none";

        fadeInElement(fight_bg);
        moveTo(
            [
                [player_symbol, (window.innerHeight-BIG_CIRCLE_SIZE)/2, 20],
                [robot_symbol, (window.innerHeight-BIG_CIRCLE_SIZE)/2, window.innerWidth-20-BIG_CIRCLE_SIZE],
            ],
            15
        );
        setTimeout(() => {
            let left_sword = document.createElement("div");
            let img = document.createElement("img");
            img.src = "assets/img/left-sword.svg";
            img.style.width = "100%";
            left_sword.style.width = "200px";
            left_sword.style.height = "200px";
            left_sword.style.display = "flex";
            left_sword.style.justifyContent = "flex-start";
            left_sword.style.alignItems = "flex-start";
            left_sword.style.position = "absolute";
            left_sword.style.top = "-200px";
            left_sword.style.left = "-200px";
            img.style.transformOrigin = "bottom right";
            left_sword.append(img);
            let right_sword = document.createElement("div");
            img = document.createElement("img");
            img.src = "assets/img/right-sword.svg";
            img.style.width = "100%";
            right_sword.style.width = "200px";
            right_sword.style.height = "200px";
            right_sword.style.display = "flex";
            right_sword.style.justifyContent = "flex-start";
            right_sword.style.alignItems = "flex-start";
            right_sword.style.position = "absolute";
            right_sword.style.top = "-200px";
            right_sword.style.right = "-200px";
            img.style.transformOrigin = "bottom left";
            right_sword.append(img);
            document.body.append(left_sword, right_sword);
            rotateToCenter(left_sword, right_sword, 30, 25);
            setTimeout(() => {
                fadeOutElement(left_sword);
                fadeOutElement(right_sword);
                setTimeout(() => {
                    left_sword.remove();
                    right_sword.remove();
                    win = winOrLoose(choosen.id, symbols[choosen2]);
                    let wait;
                    if (win === null) {
                        fall(player_symbol, 20);
                        fall(robot_symbol, 20);
                        wait = 600;
                    }
                    else {
                        wait = 1000;
                        if (win) {
                            player_score++;
                            attack(player_symbol, robot_symbol, 20);
                            setTimeout(() => {fall(robot_symbol, 20);}, 400)
                        }
                        else {
                            robot_score++;
                            attack(robot_symbol, player_symbol, 20);
                            setTimeout(() => {fall(player_symbol, 20);}, 400)
                        }
                    }
                    setTimeout(() => {
                        fadeOutElement(fight_bg);
                        fadeOutElement(player_symbol);
                        fadeOutElement(robot_symbol);
                        setTimeout(() => {
                            if (n_rounds == 10) {
                                updateGameIndicators();
                                n_rounds++;
                                showEndArea();
                            }
                            else {
                                updateRobotAvatar();
                                n_rounds++;
                                updateGameIndicators();
                                startRandomize();
                            }
                            player_symbol.remove();
                            robot_symbol.remove();
                            let id = choosen.id;
                            choosen.remove();
                            player_choice.append(placeholder);
                            document.getElementById(id).style.display = "block";
                            robot_choice.style.display = "flex";
                        }, 200);
                    }, wait);
                }, 200);
            }, 600);
        }, 500);
    }
    else {setTimeout(() => {fight(choosen, placeholder, choosen2)}, 100);}
}

function select(choosen) {
    let placeholder = player_choice.firstElementChild.cloneNode(true);
    player_choice.firstElementChild.remove();
    robot_thinking = Math.floor(Math.random()*5);
    fight(choosen, placeholder, robot_thinking);
}

function mobileChooseOnClick(event) {
    if (robot_thinking == 5) {
        hideChoices();
        let choosen = event.target.cloneNode(true);
        player_choice.append(choosen);
        select(choosen);
    }
}

function desktopChooseOnClick(event) {
    if (robot_thinking == 5) {
        let choosen = event.target;
        choosen.style.display = "none";
        choosen = choosen.cloneNode(true);
        choosen.style.display = "block";
        player_choice.append(choosen);
        select(choosen);
    }
}

function dragStart(event) {event.dataTransfer.setData("choice", event.target.id);}

function dragOver(event) {event.preventDefault();}

function dragEnter(event) {event.target.style.borderColor = BLUE;}

function dragLeave(event) {event.target.style.borderColor = BLACK;}

function chooseSymbol(parent, data) {
    parent.style.borderColor = BLACK;
    if (robot_thinking == 5) {
        data = data.getData("choice");
        let choosen = document.getElementById(data);
        choosen.style.display = "none";
        choosen = choosen.cloneNode(true);
        choosen.style.display = "block";
        parent.append(choosen);
        select(choosen);
    }
}

function drop(event) {
    event.preventDefault();
    if (event.target.tagName == "P") {chooseSymbol(event.target.parentElement, event.dataTransfer);}
    else {chooseSymbol(event.target, event.dataTransfer);}
}

function showChoices() {fadeInElement(choices_area);}

function hideChoices() {fadeOutElement(choices_area);}

function resize() {
    if (window.innerWidth < 700) {
        hideChoices();
        player_choice.addEventListener("click", showChoices);
        player_choice.removeEventListener("dragover", dragOver);
        player_choice.removeEventListener("dragleave", dragLeave);
        player_choice.removeEventListener("dragenter", dragEnter);
        player_choice.removeEventListener("drop", drop);
        for (let i = 0; i < choices.length; i++) {
            choices[i].parentElement.style.top = parseInt(window.innerHeight/2-Math.sin((i*72+90)/180*Math.PI)*CIRCLE_SPACING-CIRCLE_SIZE/2)+"px";
            choices[i].parentElement.style.left = parseInt(window.innerWidth/2-Math.cos((i*72+90)/180*Math.PI)*CIRCLE_SPACING-CIRCLE_SIZE/2)+"px";
        }
        for (i of choices) {
            i.draggable = "false";
            i.addEventListener("click", mobileChooseOnClick);
            i.removeEventListener("click", desktopChooseOnClick);
            i.removeEventListener("dragstart", dragStart);
        }
    }
    else {
        showChoices();
        player_choice.removeEventListener("click", showChoices);
        player_choice.addEventListener("dragover", dragOver);
        player_choice.addEventListener("dragleave", dragLeave);
        player_choice.addEventListener("dragenter", dragEnter);
        player_choice.addEventListener("drop", drop);
        for (i of choices) {
            i.draggable = "true";
            i.removeEventListener("click", mobileChooseOnClick);
            i.addEventListener("click", desktopChooseOnClick);
            i.addEventListener("dragstart", dragStart);
        }
    }
}

function randomizeRobotChoice() {
    if (robot_thinking != 6 && (robot_thinking == 5 || robot_thinking != (robot_choice_y+(BIG_CIRCLE_SIZE+SPACING)*5)/(BIG_CIRCLE_SIZE+SPACING))) {
        robot_choice_y += 34;
        if (robot_choice_y == 0) {robot_choice_y = (BIG_CIRCLE_SIZE+SPACING)*(-5);}
        robot_choice.style.transform = `translateY(${robot_choice_y}px)`;
        setTimeout(randomizeRobotChoice, 30);
    }
    else {robot_thinking = 6;}
}

function startRandomize() {
    robot_thinking = 5;
    randomizeRobotChoice();
}

function startNewGame() {
    n_rounds = 1;
    robot_score = 0;
    player_score = 0;
    updateRobotAvatar();
    updateGameIndicators();
    startRandomize();
}

function updateGameIndicators() {
    round_counter.textContent = `Manche ${n_rounds}/10`;
    robot_score_indicator.textContent = robot_score.toString();
    player_score_indicator.textContent = player_score.toString();
}

function updateRobotAvatar() {
    let diff = player_score-robot_score;
    if (-10 <= diff && diff <= -4) {robot_avatar.src = "assets/img/robot/happy.svg";}
    else if (-3 <= diff && diff <= -2) {robot_avatar.src = "assets/img/robot/amused.svg";}
    else if (-1 <= diff && diff <= 1) {robot_avatar.src = "assets/img/robot/normal.svg";}
    else if (2 <= diff && diff <= 3) {robot_avatar.src = "assets/img/robot/annoyed.svg";}
    else if (4 <= diff && diff <= 10) {robot_avatar.src = "assets/img/robot/angry.svg";}
}

function showEndArea() {
    fadeInElement(end_area);
    if (player_score == robot_score) {
        victory_text.textContent = "Egalité...";
        robot_avatar.src = "assets/img/robot/normal.svg";
    }
    else if (player_score > robot_score) {
        victory_text.textContent = `Vous avez gagné ! (${player_score} - ${robot_score})`;
        n_victories++;
        robot_avatar.src = "assets/img/robot/angry.svg";
    }
    else {
        victory_text.textContent = `Vous avez perdu... (${player_score} - ${robot_score})`;
        n_defeats++;
        robot_avatar.src = "assets/img/robot/happy.svg";
    }
    if (n_victories+n_defeats == 0) {victory_ratio.textContent = "Vous n'avez pas encore gagné ni perdu contre le robot";}
    else {victory_ratio.textContent = `Vous avez un taux de ${(n_victories/(n_victories+n_defeats)*100).toFixed(3)}% de victoires (${n_victories} victoires et ${n_defeats} défaites)`;}
}

getData();

window.addEventListener("load", () => {
    localStorage.setItem("screen", "1");
    resize();
    document.getElementById("player-avatar").src = `assets/img/player/${avatar}.svg`;
    updateGameIndicators();
    startRandomize();
    updateRobotAvatar();
    window.addEventListener("resize", resize);
    rematch_button.addEventListener("click", () => {
        fadeOutElement(end_area);
        startNewGame();
    })
});
window.addEventListener("unload", saveData);