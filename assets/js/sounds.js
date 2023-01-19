/*
    A file which contains the code for the sounds on the site
*/

// Play the Big Bang Theory intro music
function playIntro() {
    music_object.src = "assets/musics/intro.mp3";
    music_object.play();
    waitIntroEnd();
}

// Play the ambiance music
function playAmbiance() {
    if (skype) {music_object.src = "assets/musics/skype.mp3";}
    else {music_object.src = "assets/musics/ambiance.mp3";}
    music_object.loop = true;
    music_object.play();
}

// Wait until the end of the intro music to start playing the ambiance music
function waitIntroEnd() {
    if (music_object.ended) {playAmbiance();}
    else {setTimeout(waitIntroEnd, 1000);}
}

// Update the muted value of the sounds
function updateOnOff() {
    if (music) {music_object.muted = false;}
    else {music_object.muted = true;}
    if (sounds) {sounds_object.muted = false;}
    else {sounds_object.muted = true;}
}

// Update the sounds buttons appearence
function updateSounds() {
    if (music) {music_button.src = "assets/img/sounds/music-on.svg";}
    else {music_button.src = "assets/img/sounds/music-off.svg";}
    if (sounds) {sounds_button.src = "assets/img/sounds/sounds-on.svg";}
    else {sounds_button.src = "assets/img/sounds/sounds-off.svg";}
}

// Play a sound
function playSound(name) {
    sounds_object.src = `assets/sounds/${name}.mp3`;
    sounds_object.play();
}

const music_button = document.getElementById("music-button");
const sounds_button = document.getElementById("sounds-button");

var music_object = document.createElement("audio");
music_object.autoplay = true;
var sounds_object = document.createElement("audio");

// On window load
window.addEventListener("load", () => {
    // Add interaction to easter-egg button
    if (document.getElementById("skype-button")) {
        document.getElementById("skype-button").addEventListener("click", () => {
            if (skype) {skype = 0;}
            else {skype = 1;}
            localStorage.setItem("skype", skype.toString());
            playAmbiance();
        });
    }
    updateSounds();
    // Add interaction to the music mute button
    music_button.addEventListener("click", () => {
        if (music) {music = 0;}
        else {music = 1;}
        localStorage.setItem("music", music.toString());
        updateOnOff();
        updateSounds();
    });
    // Add interaction to the sound mute button
    sounds_button.addEventListener("click", () => {
        if (sounds) {sounds = 0;}
        else {sounds = 1;}
        localStorage.setItem("sounds", sounds.toString());
        updateOnOff();
        updateSounds();
    });
    updateOnOff();
    if (screen) {playAmbiance();}
    else {playIntro();}
})