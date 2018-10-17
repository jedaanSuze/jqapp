'use strict';

var path = require('path');
var _ = require('lodash');

var all = {
    /*startEnvironment*/
    env: 'local',//local //'development', //production
    publicRoot: "/build/public",
    /*endEnvironment*/
    root: path.normalize(process.cwd()),
    port: process.env.PORT || 9000,
    ip: '',

};

module.exports = all;
