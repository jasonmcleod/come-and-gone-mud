var colors = require('colors');

var logger = require('tracer').colorConsole({
    format : '{{message}}'.white + '\n└[ {{path}}:{{line}} ]'.grey
});

module.exports = logger;