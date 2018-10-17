'use strict';
var indexController = require('./controllers/index.controller');
var config = require('./config/environment/index');
var express = require('express');
var path = require('path');
module.exports = function (app) {
    app.use(express.static(path.join(__dirname, config.publicRoot)));
    app.use('*', indexController);
    app.route('/:url(api|app|bower_components|assets)/*').get(function (req, res) {
        res.status(404).end();
    });
};
