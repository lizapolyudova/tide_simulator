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
        var firstNode = document.body.getElementsByTagName("div").item(0);
        if (firstNode === null) {
            console.log("no children in the DOM")
            document.body.appendChild(menu);
        } else {
            document.body.insertBefore(menu, firstNode);
        }
    })
}