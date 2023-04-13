import {init} from "./shared/menu";
import * as $ from 'jquery';


// 'use strict';
//
// var AWS = require('aws-sdk');
//
// var s3 = new AWS.S3();
//

console.log("hello");
export function initCommon() {
    console.log("hello");
    init();
    document.addEventListener('DOMContentLoaded', (event) => {
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
    });
}

initCommon();
