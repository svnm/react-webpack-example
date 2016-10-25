require('babel-register');
require('css-modules-require-hook/preset');

var env = process.env.NODE_ENV || 'prod'
var app = require("./serverProd.js");
