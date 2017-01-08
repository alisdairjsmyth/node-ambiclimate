var request = require('request');
var Q = require('q');
var _ = require('lodash');

function Client(settings) {
    var defaults = {
        baseUrl: 'https://api.ambiclimate.com/api/v1',
        bearerToken: null
    };
    settings = settings || {};

    if (!settings.hasOwnProperty('bearerToken') || !settings.bearerToken.length) {
        throw new Error('Authentication token is required to use the API');
    }

    this.settings = _.merge(defaults, settings);

    return this;
}

Client.prototype.send = function(settings, cb) {
    var defaults = {
        qs: {},
        json: true,
        method: 'GET',
        baseUrl: this.settings.baseUrl,
        auth: {
            'bearer': this.settings.bearerToken
        }
    }

    settings = settings || {};
    settings = _.merge(defaults, settings);

    console.log(JSON.stringify(settings));

    request(settings, function(err, response, body) {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, body);
    });
}

Client.prototype.off = function(settings, cb) {
    var deferred = Q.defer();

    this.send({
        url: '/device/power/off',
        qs: settings
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
}

Client.prototype.comfort = function (settings, cb) {
    var deferred = Q.defer();

    this.send({
        url: '/device/mode/comfort',
        qs: settings
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
}

Client.prototype.feedback = function (settings, cb) {
    var deferred = Q.defer();

    this.send({
        url: '/user/feedback',
        qs: settings
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
}

Client.prototype.away_temperature_lower = function (settings, cb) {
    var deferred = Q.defer();

    this.send({
        url: '/device/mode/away_temperature_lower',
        qs: settings
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
}

Client.prototype.away_temperature_upper = function (settings, cb) {
    var deferred = Q.defer();

    this.send({
        url: '/device/mode/away_temperature_upper',
        qs: settings
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
}

Client.prototype.away_humidity_upper = function (settings, cb) {
    var deferred = Q.defer();

    this.send({
        url: '/device/mode/away_humidity_upper',
        qs: settings
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
}

module.exports = Client;
