// Section to modify
var clientId      = "";
var clientSecret  = "";
var username      = "";
var password      = "";

// Don't modify this section
var ac = require('../../node-ambiclimate'),
    client;

client = new ac(clientId, clientSecret, username, password);

client.devices().then(console.log, console.error)
