/**
 * MIT License
 *
 * Copyright (c) 2017 Alisdair Smyth
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/
"use strict";
var request = require("request");
var Q = require("q");
var _ = require("lodash");

function Client(clientId, clientSecret, username, password) {
  var ambiAuth = require("./ambi-auth");

  this.settings = {
    baseUrl: "https://api.ambiclimate.com/api/v1",
    bearerToken: null
  };

  this.auth = new ambiAuth(clientId, clientSecret, username, password);

  return this;
}

Client.prototype.send = function(settings, cb) {
  this.auth.getToken(token => {
    var defaults = {
      qs: {},
      json: true,
      method: "GET",
      baseUrl: this.settings.baseUrl,
      auth: {
        bearer: token
      }
    };

    settings = settings || {};
    settings = _.merge(defaults, settings);

    request(settings, function(err, response, body) {
      if (err) {
        cb(err, null);
        return;
      }
      // Compensation for issue with underlying API always returning success
      if (body.reason) {
        cb(body, null);
        return;
      }
      cb(null, body);
    });
  });
};

Client.prototype.off = function(settings, cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/device/power/off",
      qs: settings
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.comfort = function(settings, cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/device/mode/comfort",
      qs: settings
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.feedback = function(settings, cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/user/feedback",
      qs: settings
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.away_temperature_lower = function(settings, cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/device/mode/away_temperature_lower",
      qs: settings
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.away_temperature_upper = function(settings, cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/device/mode/away_temperature_upper",
      qs: settings
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.away_humidity_upper = function(settings, cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/device/mode/away_humidity_upper",
      qs: settings
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.temperature = function(settings, cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/device/mode/temperature",
      qs: settings
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.sensor_temperature = function(settings, cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/device/sensor/temperature",
      qs: settings
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.sensor_humidity = function(settings, cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/device/sensor/humidity",
      qs: settings
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.mode = function(settings, cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/device/mode",
      qs: settings
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.appliance_states = function(settings, cb) {
  var deferred = Q.defer();

  // Default limit and offset
  settings.limit = settings.limit ? settings.limit : 5;
  settings.offset = settings.offset ? settings.offset : 0;

  this.send(
    {
      url: "/device/appliance_states",
      qs: settings
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.devices = function(cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/devices"
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.ir_feature = function(settings, cb) {
  var deferred = Q.defer();

  this.send(
    {
      url: "/device/ir_feature"
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

Client.prototype.deployment = function(settings, cb) {
  var deferred = Q.defer();

  settings.method = "POST";
  this.send(
    {
      url: "/device/deployment"
    },
    function(err, data) {
      if (err) deferred.reject(err);
      else deferred.resolve(data);
    }
  );

  return deferred.promise.nodeify(cb);
};

module.exports = Client;
