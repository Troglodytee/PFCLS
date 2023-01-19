function playIntro() {
    music_object.src = "assets/musics/intro.mp3";
    music_object.play();
    waitIntroEnd();
}

function playAmbiance() {
    if (skype) {music_object.src = "assets/musics/skype.mp3";}
    else {music_object.src = "assets/musics/ambiance.mp3";}
    music_object.loop = true;
    music_object.play();
}

function waitIntroEnd() {
    if (music_object.ended) {playAmbiance();}
    else {setTimeout(waitIntroEnd, 1000);}
}

function updateOnOff() {
    if (music) {music_object.muted = false;}
    else {music_object.muted = true;}
}

function updateSounds() {
    if (music) {music_button.src = "assets/img/sounds/music-on.svg";}
    else {music_button.src = "assets/img/sounds/music-off.svg";}
    if (sounds) {sounds_button.src = "assets/img/sounds/sounds-on.svg";}
    else {sounds_button.src = "assets/img/sounds/sounds-off.svg";}
}

const music_button = document.getElementById("music-button");
const sounds_button = document.getElementById("sounds-button");

var music_object = document.createElement("audio");
music_object.autoplay = true;


window.addEventListener("load", () => {
    if (document.getElementById("skype-button")) {
        document.getElementById("skype-button").addEventListener("click", () => {
            if (skype) {skype = 0;}
            else {skype = 1;}
            localStorage.setItem("skype", skype.toString());
            playAmbiance();
        });
    }
    updateSounds();
    music_button.addEventListener("click", () => {
        if (music) {music = 0;}
        else {music = 1;}
        localStorage.setItem("music", music.toString());
        updateOnOff();
        updateSounds();
    });
    sounds_button.addEventListener("click", () => {
        if (sounds) {sounds = 0;}
        else {sounds = 1;}
        localStorage.setItem("sounds", sounds.toString());
        updateSounds();
    });
    updateOnOff();
    if (localStorage.getItem("screen") == "0") {playIntro();}
    else {playAmbiance();}
})