// ==UserScript==
// @name         Remove useless lobbys
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description
// @author       Brian Ardiles
// @match        https://gamersclub.com.br/lobby
// @icon         https://www.google.com/s2/favicons?domain=gamersclub.com.br
// @grant        none
// ==/UserScript==
window.onload = function() {
    // wait gc ws connection
    setTimeout(() => {
        init();
    }, 5000);

};

function init() {
    'use strict';
    let target = document.querySelector('.list-avaliable-teams');
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            let lobbys = document.getElementsByClassName('lobby-room-list-item')
            for (let lobby of lobbys) {
                let lobbySelected = lobby.querySelector('span:nth-child(2)')
                if (!checkAllowedCountry(lobbySelected)) {
                    lobby.style.display = "none"
                }
            }
        });
    });
    let config = {
        childList: true
    };
    observer.observe(target, config);
};

// Delete lobby if the country is not equal to the allowed list :D
function checkAllowedCountry(lobby) {
    const allowedList = ["Argentina", "Uruguai", "Chile"]
    return allowedList.includes(lobby.title)
}
