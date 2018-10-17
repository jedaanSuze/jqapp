'use strict';
let constants = require('../config/app/constants');
let Router = require('express').Router;
let router = new Router();
let viewRender = require('../viewsrenders/index');
router.get('/', function (req, res) {
    let appData = constants.appConstantsAsJSON;
    let renderer = viewRender.hasOwnProperty('rootRenderer') ? viewRender['rootRenderer'] : viewRender;
    const reactComponent = renderer(appData,req,res);
    let allData = Object.assign(appData, reactComponent);
    res.render('index', allData);

}, function (err) {
    console.log("setting controller : err", err);
    res.render('index', {});
});

module.exports = router;

