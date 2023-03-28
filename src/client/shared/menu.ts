var makeMenuItem = function (name: string, path: string) {
    var item = document.createElement('div');
    item.className = "item"
    item.innerHTML = `<a href=\"${path}\">${name}</a>`
    return item
}

export function init() {
    document.addEventListener('DOMContentLoaded', (event) => {
        var menu = document.createElement('div');
        menu.className = "menu"
        menu.appendChild(makeMenuItem("Home", "/"))
        var firstNode = document.body.getElementsByTagName("script").item(0);
        // if (firstNode === null) {
        //     console.log("no children in the DOM")
        //     document.body.appendChild(menu);
        // } else {
        //     var before = firstNode.nextSibling;
        //     document.body.insertBefore(before, menu);
        // }
    })
}
