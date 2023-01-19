var characters = ["sheldon", "leonard", "howard", "raj"];
var scores = {};
var avatar;
var music;
var sounds;
var skype;
var screen;

function getData() {
    for (i of characters) {
        scores[i] = localStorage.getItem(i);
        if (scores[i] == null) {scores[i] = [0, 0, 1, 0, 0];}
        else {
            scores[i] = localStorage.getItem(i).split(" ");
            for (let j = 0; j < scores[i].length; j++) {scores[i][j] = parseInt(scores[i][j]);}
        }
    }
    avatar = localStorage.getItem("avatar");
    if (avatar == null) {avatar = "sheldon";}
    music = localStorage.getItem("music");
    if (music == null) {music = 1;}
    else {music = parseInt(music);}
    sounds = localStorage.getItem("sounds");
    if (sounds == null) {sounds = 1;}
    else {sounds = parseInt(sounds);}
    skype = localStorage.getItem("skype");
    if (skype == null) {skype = 0;}
    else {skype = parseInt(skype);}
}

function saveData() {
    localStorage.clear();
    for (i of characters) {localStorage.setItem(i, scores[i].join(" ")); console.log(i);}
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("music", music.toString());
    localStorage.setItem("sounds", sounds.toString());
    localStorage.setItem("skype", skype.toString());
}

function deleteData() {
    localStorage.removeItem(avatar);
    scores[avatar] = [0, 0, 1, 0, 0];
}