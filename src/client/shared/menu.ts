import * as $ from 'jquery';

var makeMenuItem = function (name: string, path: string) {
    var item = document.createElement('div');
    item.className = "item"
    item.innerHTML = `<a href=\"${path}\">${name}</a>`
    return item
}

export function initMenu() {
    document.addEventListener('DOMContentLoaded', (event) => {

        var menu = document.createElement('div');
        menu.setAttribute("class", "left menu");
        menu.appendChild(makeMenuItem("Home", "/"))
        menu.appendChild(makeMenuItem("    Moon-Earth model", "/spheres.html"))
        menu.appendChild(makeMenuItem("    Trees with faces", "/trees-with-faces.html"))
        menu.appendChild(makeMenuItem("    Audio Journaling", "/audio-journal.html"))
        menu.appendChild(makeMenuItem("    Places on the Internet (webring)", "/places-on-the-internet.html"))
        menu.appendChild(makeMenuItem("    Letters", "/letters.html"))
        var firstNode = document.body.getElementsByTagName("div").item(0);
        if (firstNode === null) {
            console.log("no children in the DOM")
            document.body.appendChild(menu);
        } else {
            document.body.insertBefore(menu, firstNode);
        }
    })
}