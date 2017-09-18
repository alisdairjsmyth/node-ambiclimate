// Section to modify
var clientId      = "";
var clientSecret  = "";
var username      = "";
var password      = "";
var room_name     = "";
var location_name = "";

// Don't modify this section
var ac = require('../../node-ambiclimate'),
    client;

client = new ac(clientId, clientSecret, username, password);

client.mode({
        room_name: room_name,
        location_name: location_name
    },
    function (err, data) {
        console.log("err: "+JSON.stringify(err))
        if (err) {
            console.error(err);
            return;
        }
        console.log("data: "+JSON.stringify(data))
    }
);
