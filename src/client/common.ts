import {init} from "./shared/menu";
import * as $ from 'jquery';

var AWS = require('aws-sdk');
var s3 = new AWS.S3();


function populateAudio(key: string) {
    var params = {Bucket: 'pacificsnail-site', Key: key};
    var url = s3.getSignedUrl('getObject', params);
    console.log('The URL is', url);
}


console.log("hello");
init();
populateAudio("trees-with-faces/our secret world.mp3")

$('img[data-enlargable]').addClass('img-enlargable').click(function () {
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