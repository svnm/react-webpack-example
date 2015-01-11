// logger.js

'use strict';

define(function (require) {
    var shirt = require('./shirt');

    return {
        logTheShirt: function () {
            console.log('color: ' + shirt.color + ', size: ' + shirt.size);
        }
    };
});
