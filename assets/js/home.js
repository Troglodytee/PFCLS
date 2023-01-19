const popup_valid_delete = document.getElementById("popup-valid-delete");
const continue_button = document.getElementById("continue-button");
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

window.addEventListener("load", () => {
    getData();
    document.getElementById("delete-button").addEventListener("click", () => {fadeInElement(popup_valid_delete);})
    document.getElementById("valid-delete").addEventListener("click", () => {
        deleteData();
        updateAvatar();
        continue_button.style.display = "none"
        document.getElementById("new-button").textContent = "Jouer";
        fadeOutElement(popup_valid_delete);
    });
    document.getElementById("cancel-delete").addEventListener("click", () => {fadeOutElement(popup_valid_delete);})
    if (n_rounds == 1) {
        continue_button.style.display = "none";
        document.getElementById("new-button").textContent = "Jouer";
    }
    else {document.getElementById("new-button").addEventListener("click", () => {
        localStorage.removeItem("n_rounds");
        localStorage.removeItem("robot_score");
        localStorage.removeItem("player_score");
    });}
    document.getElementById("avatar-button").addEventListener("click", updateAvatarBar);
    let avatars = ["sheldon", "leonard", "howard", "raj"];
    for (let i = 0; i < avatars.length; i++) {
        avatar_bar.children[i].firstElementChild.addEventListener("click", () => {
            avatar = avatars[i];
            localStorage.setItem("avatar", avatar);
            updateAvatar();
            updateAvatarBar();
        })
    }
    updateAvatar();
})