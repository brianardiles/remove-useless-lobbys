// ==UserScript==
// @name         Remove useless lobbys
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description
// @author       Brian Ardiles
// @match        https://gamersclub.com.br/lobby
// @icon         https://www.google.com/s2/favicons?domain=gamersclub.com.br
// @grant        none
// ==/UserScript==
window.onload = function() {
    setTimeout(() => {
        init();
    }, 5000);

};

function init() {
    let target = document.querySelector('.list-avaliable-teams');
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            let lobbys = document.getElementsByClassName('sala-card-advertisement')
            for (let lobby of lobbys) {
                const parent = lobby.parentElement.parentElement
                let lobbySelected = parent.querySelector('span:nth-child(2)')
                if (lobbySelected && !checkAllowedCountry(lobbySelected)) {
                    parent.style.display = "none"
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
