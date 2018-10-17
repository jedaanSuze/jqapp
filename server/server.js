'use strict';
var express = require('express');
var config = require('./config/environment/index.js');
var compression = require('compression');
var path = require('path');
var bodyParser = require('body-parser');
var constants = require('./config/app/constants.js');
var app = express();
var env = config.env;
var http = require('http');
var setApplicationRoutes = require('./routes.js');

app.locals.constants = constants.asJSON;
app.locals.appData = constants.appConstantsAsJSON;


app.engine('.ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(compression());

var publicRoot = path.join(config.root, config.publicRoot);
app.use(express.static(publicRoot));
app.set('appPath', publicRoot);
app.set('views', publicRoot);

if (env === 'development' || env === 'test') {
    app.use(require('errorhandler')());
}

setApplicationRoutes(app);
var server = http.createServer(app);

server.listen(config.port, config.ip, function () {
    console.log('\nExpress server listening on %d, in %s mode', config.port, app.get('env'));
    console.log('Press Ctrl+C to quit.');

    if (env === 'development') {
        require('ripe').ready();
    } else {
        if (env === "local") {
            require('ripe').ready();
        }
    }
    server.emit("appStarted");
});

module.exports = server;
