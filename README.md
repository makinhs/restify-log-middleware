# restify-log-middleware

This is a small middleware to use with restify to generate log inside req's using bunyan and elasticsearch modules.

## First thing

```
    npm install --save restify-log-middleware
```



## Full usage

```javascript
...
var logFactory = require('restify-log-middleware');


var options = {
    "elasticSearchConfig": {
        "indexPattern": "[logstash-]YYYY.MM.DD",
        "type": "logs",
        "host": "elasticSearchIp:port"
    },
    "logLevel": 10,
    "logName": "myLogName",
    "withstdout" : true
};


...
//in your routes config
...
var logMiddleware = logFactory.createLogMiddleware('myModuleName', options);
server.post('/some-endpoint', [
        logMiddleware,
        myController.post
    ]);
...
//or
...
server.post('/some-endpoint', [
        logFactory.createLogMiddleware('myModuleName', options),
        myController.post
    ]);
...
//or to use with before all routes
server.use(logFactory.createLogMiddleware('myModuleName', options));

//it will generate an req.log object. You can use it like this:
myController(req, res){
    var log = req.log
    log = log.child(module: 'controller-module'});
    log.trace('Controller started!');
    ...
    log.info('Some info');
    ...
    log.warn('Some warning');
    ...
}

```

## OPTIONS

You need to use at least:
 - logLevel //as number (try 10)
 - logName //as string

As optional, you can set up your own elasticSearch configuration like this:
```javascript
 elasticSearchConfig: {
        "indexPattern": "[logstash-]YYYY.MM.DD",
        "type": "logs",
        "host": "elasticSearchIp:port"
    }
```

If you don't need to use `process.stdout`, just turn off this option:
```javascript
    "withstdout" : false
```

