const popup_valid_delete = document.getElementById("popup-valid-delete");
const continue_button = document.getElementById("continue-button");
const confirm_area = document.getElementById("popup-confirm-delete");
const player_avatar = document.getElementById("player-avatar");
const avatar_bar = document.getElementById("avatar-bar");

var avatar_bar_deploy = false;

function updateAvatar() {player_avatar.src = `assets/img/player/${avatar}.svg`;}

function retract() {
    let size = parseInt(avatar_bar.style.paddingBottom.slice(0, -2));
    if (size > 0) {
        avatar_bar.style.paddingBottom = (size-10)+"px";
        setTimeout(retract, 5);
    }
    else {
        size = parseInt(avatar_bar.style.height.slice(0, -2));
        if (size > 0) {
            avatar_bar.style.height = (size-10)+"px";
            setTimeout(retract, 5);
        }
        else {
            size = parseInt(avatar_bar.style.paddingTop.slice(0, -2));
            if (size > 0) {
                avatar_bar.style.paddingTop = (size-10)+"px";
                setTimeout(retract, 5);
            }
            else {avatar_bar.style.display = "none";}
        }
    }
}

function deploy() {
    if (avatar_bar.style.paddingTop == "") {
        avatar_bar.style.paddingTop = "0px";
        setTimeout(deploy, 5);
    }
    else {
        let size = parseInt(avatar_bar.style.paddingTop.slice(0, -2));
        if (size < SPACING) {
            avatar_bar.style.paddingTop = (size+10)+"px";
            setTimeout(deploy, 5);
        }
        else {
            if (avatar_bar.style.height == "") {
                avatar_bar.style.height = "0px";
                setTimeout(deploy, 5);
            }
            else {
                size = parseInt(avatar_bar.style.height.slice(0, -2));
                if (size < 350) {
                    avatar_bar.style.height = (size+10)+"px";
                    setTimeout(deploy, 5);
                }
                else {
                    if (avatar_bar.style.paddingBottom == "") {
                        avatar_bar.style.paddingBottom = "0px";
                        setTimeout(deploy, 5);
                    }
                    else {
                        size = parseInt(avatar_bar.style.paddingBottom.slice(0, -2));
                        if (size < 70) {
                            avatar_bar.style.paddingBottom = (size+10)+"px";
                            setTimeout(deploy, 5);
                        }
                    }
                }
            }
        }
    }
}

function updatePlayButtons() {
    if (scores[avatar][2] == 1) {
        continue_button.style.display = "none";
        document.getElementById("new-button").textContent = "Jouer";
    }
    else {
        continue_button.style.display = "block";
        document.getElementById("new-button").textContent = "Nouvelle partie";
    }
}

function updateAvatarBar() {
    if (avatar_bar_deploy) {
        retract();
        avatar_bar_deploy = false;
    }
    else {
        avatar_bar.style.display = "flex";
        deploy();
        avatar_bar_deploy = true;
    }
}

getData();

window.addEventListener("load", () => {
    screen = 0;
    document.getElementById("delete-button").addEventListener("click", () => {fadeInElement(popup_valid_delete);})
    document.getElementById("valid-delete").addEventListener("click", () => {
        deleteData();
        updateAvatar();
        updateSounds();
        playAmbiance();
        continue_button.style.display = "none"
        document.getElementById("new-button").textContent = "Jouer";
        fadeOutElement(popup_valid_delete);
        fadeInElement(confirm_area);
    });
    document.getElementById("cancel-delete").addEventListener("click", () => {fadeOutElement(popup_valid_delete);});
    updatePlayButtons();
    document.getElementById("button-ok").addEventListener("click", () => {fadeOutElement(confirm_area);});
    document.getElementById("avatar-button").addEventListener("click", updateAvatarBar);
    for (let i = 0; i < characters.length; i++) {
        avatar_bar.children[i].firstElementChild.addEventListener("click", () => {
            avatar = characters[i];
            localStorage.setItem("avatar", avatar);
            updateAvatar();
            updateAvatarBar();
            updatePlayButtons();
        })
    }
    updateAvatar();
})