import * as $ from 'jquery';

var makeMenuItem = function (name: string, path: string) {
    var item = document.createElement('div');
    item.className = "item"
    item.innerHTML = `<a href=\"${path}\">${name}</a>`
    return item
}

$(function () {
    console.log("in the data-include function")
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = 'views/' + $(this).data('include') + '.html'
        $(this).load(file)
    })
})

export function setupMenu() {
    document.addEventListener('DOMContentLoaded', (event) => {

        var menu = document.createElement('div');
        menu.setAttribute("data-include", "menu");
        menu.setAttribute("class", "left");
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
