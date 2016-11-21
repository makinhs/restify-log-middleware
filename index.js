'use strict';
var uuid = require('uuid'),
    LogService = require('./services/log.service');


function createLogMiddleware(moduleName, options) {
    return function (req, res, next) {
        try{
            var log = LogService.createLogger(options);
            console.log(log);
            log = log.child({reqId: uuid.v1(), module: moduleName});
            log.trace('Created log for module: ', moduleName);
            req.log = log;
            return next();
        }catch(err){
            console.log(err);
            return res.send(500, err);
        }
    }
}

module.exports.createLogMiddleware = createLogMiddleware;