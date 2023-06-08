import * as $ from 'jquery';

var makeMenuItem = function (name: string, path: string) {
    var item = document.createElement('div');
    item.className = "item"
    item.innerHTML = `<a href=\"${path}\">${name}</a>`
    item.addEventListener("mouseover", function () {
        item.style.opacity = String(1.0);
    });
    item.addEventListener("mouseout", function () {
        item.style.opacity = String(0.5);
    });
    return item
}

export function initMenu() {
    document.addEventListener('DOMContentLoaded', (event) => {

        var menu = document.createElement('div');
        menu.setAttribute("class", "left menu");
        menu.appendChild(makeMenuItem("Home", "/"))
        menu.appendChild(makeMenuItem("    Moon-Earth model", "/spheres.html"))
        menu.appendChild(makeMenuItem("    Newgrange", "/newgrange.html"))
        menu.appendChild(makeMenuItem("    Roofbox", "/roofbox.html"))
        menu.appendChild(makeMenuItem("    Trees with faces", "/trees-with-faces.html"))
        menu.appendChild(makeMenuItem("    Audio Journaling", "/audio-journal.html"))
        menu.appendChild(makeMenuItem("    Places on the Internet", "/places-on-the-internet.html"))
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

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.ACCESS_KEY;
AWS.config.secretAccessKey = process.env.SECRET_ACCESS_KEY;
AWS.config.region = "us-east-1";
var s3 = new AWS.S3();

export function generateImageLinks(pageName: string) {
    document.addEventListener('DOMContentLoaded', (event) => {
        Array.from(document.querySelectorAll(".image-container")).forEach(function (item) {
            const resourceName = item.getAttribute("resource-name");
            var imageUrl = s3.getSignedUrl('getObject', {
                Bucket: 'pacificsnail-site',
                Key: `${pageName}/${resourceName}.jpeg`,
            });
            item.className = "item"
            item.innerHTML = `
        <img data-enlargable
             src="${imageUrl}">
`
        })
    })
}