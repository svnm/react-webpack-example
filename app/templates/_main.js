// main.js

'use strict';

console.log('\'Allo \'Allo!');

<% if (moduleLoader === 'requirejs') { %>
define(function (require) {
    var logger = require('./logger');
    logger.logTheShirt();
});
<% } %>

<% if (moduleLoader === 'browserify') { %>

var _ = require('underscore');

var _ = require('underscore'),
  names = ['blue t-shirt', 'yellow t-shirt', 'green t-shirt'];
 
_.each(names, function(n) {
	console.log(n);
});

<% } %>


