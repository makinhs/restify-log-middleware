'use strict';
const bunyan = require('bunyan');
const Elasticsearch = require('bunyan-elasticsearch');

function createLogger(options) {
    var streams = [];
    if(options.elasticSearchConfig){
        var esStream = new Elasticsearch(options.elasticSearchConfig);
        esStream.on('error', function (err) {
            console.log('Elasticsearch Stream Error:', err.stack);
        });
        streams.push({ stream: esStream });
    }

    if(options.withstdout){
        streams.push({ stream: process.stdout })
    }

    return bunyan.createLogger({
        name: options.logName,
        level: options.logLevel,
        streams: streams,
        serializers: bunyan.stdSerializers
    });
}

module.exports.createLogger = createLogger;