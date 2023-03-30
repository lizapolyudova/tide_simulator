import * as $ from "jquery";
import {setupMenu} from "./shared/menu";


var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.ACCESS_KEY;
AWS.config.secretAccessKey = process.env.SECRET_ACCESS_KEY;
AWS.config.region = "us-east-1";
var s3 = new AWS.S3();


function init() {
    interface galleryItem {
        name: string,
        audio: boolean,
        description: string,
    }

    function makeGalleryItem(data: galleryItem) {
        var imageUrl = s3.getSignedUrl('getObject', {
            Bucket: 'pacificsnail-site',
            Key: `trees-with-faces/${data.name}.jpg`,
        });

        var audioUrl = s3.getSignedUrl('getObject', {
            Bucket: 'pacificsnail-site',
            Key: `trees-with-faces/${data.name}.mp3`,
        });

        var item = document.createElement('div');
        item.className = "item"
        item.innerHTML = `
        <img data-enlargable
             src="${imageUrl}">
        ${
            (enable => enable ? `<audio controls="controls">
            <source src="${audioUrl}"
                    type="audio/mp3">
        </audio>` : ``)(data.audio)
        }
    ${data.description}
`
        return item
    }

    document.addEventListener('DOMContentLoaded', (event) => {

        var gallery = document.getElementsByClassName('gallery')[0];
        // todo: move this into a json file or a sqlite database
        const data = `[
  {
    "name": "moores-hall-2023-03-24",
    "audio": true,
    "description": "Gazing solemnly into the lake across it. Invisible from other sides, the face emerges."
  },
  {
    "name": "killarney-2023-03-27",
    "description": "Derpy lil' dude, really wants to be helpful. Spotted slightly off trail in a grove surrounded by his mossy buddies."
  },
  {
    "name": "brussels-2023-02-10",
    "description": "Telescoping insect-looking eyes mischievously looking into different sideways."
  },
  {
    "name": "toronto-2022-10-02",
    "description": "Cyclop tree. Nightmare fuel. Surprisingly friednly during the day. Hiding in the middle of Toronto botanical garden, just waiting for you to turn away."
  }
]`
        if (data != null) {
            let items: Array<galleryItem> = JSON.parse(data);
            for (var item of items) {
                gallery.appendChild(makeGalleryItem(item));
            }
        } else {
            console.log("failed to read data");
        }
    });
    setupMenu();
}

$(document).ready(function () {
    $('img[data-enlargable]').addClass('img-enlargable').click(function () {
        console.log("function triggered");
        var src = $(this).attr('src');
        $('<div>').css({
            background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',
            backgroundSize: 'contain',
            width: '100%', height: '100%',
            position: 'fixed',
            zIndex: '10000',
            top: '0', left: '0',
            cursor: 'zoom-out'
        }).click(function () {
            $(this).remove();
        }).appendTo('body');
    });
});

init();
