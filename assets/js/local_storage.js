var n_victories;
var n_defeats;
var n_rounds;
var robot_score;
var player_score;
var avatar;
var music;
var sounds;
var skype;

function getData() {
    if (localStorage.getItem("n_victories") == null) {
        n_victories = 0;
        n_defeats = 0;
        avatar = "sheldon";
        music = 1;
        sounds = 1;
        skype = 0;
    }
    else {
        n_victories = parseInt(localStorage.getItem("n_victories"));
        n_defeats = parseInt(localStorage.getItem("n_defeats"));
        avatar = localStorage.getItem("avatar");
        music = parseInt(localStorage.getItem("music"));
        sounds = parseInt(localStorage.getItem("sounds"));
        skype = parseInt(localStorage.getItem("skype"));
    }
    if (localStorage.getItem("n_rounds") == null) {
        n_rounds = 1;
        robot_score = 0;
        player_score = 0;
    }
    else {
        n_rounds = parseInt(localStorage.getItem("n_rounds"));
        robot_score = parseInt(localStorage.getItem("robot_score"));
        player_score = parseInt(localStorage.getItem("player_score"));
    }
}

function saveData() {
    localStorage.clear();
    localStorage.setItem("n_victories", n_victories.toString());
    localStorage.setItem("n_defeats", n_defeats.toString());
    if (1 < n_rounds && n_rounds < 11) {
        localStorage.setItem("n_rounds", n_rounds.toString());
        localStorage.setItem("robot_score", robot_score.toString());
        localStorage.setItem("player_score", player_score.toString());
    }
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("music", music.toString());
    localStorage.setItem("sounds", sounds.toString());
    localStorage.setItem("skype", skype.toString());
}

function deleteData() {
    n_victories = 0;
    n_defeats = 0;
    n_rounds = 0;
    robot_score = 0;
    player_score = 0;
    avatar = "sheldon";
    music = 1;
    sounds = 1;
    skype = 0;
    let screen = localStorage.getItem("screen");
    localStorage.clear();
    localStorage.setItem("screen", screen);
}