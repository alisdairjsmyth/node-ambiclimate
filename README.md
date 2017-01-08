# node-ambiclimate
[![npm version](https://badge.fury.io/js/node-ambiclimate.svg)](https://badge.fury.io/js/node-ambiclimate)

A thin Node.js wrapper of the Ambi Climate HTTP API.

## Installation

    npm install node-ambiclimate --save

## Bearer Token

A bearer token is mandatory to use the API.  A new token can be obtained in <a href="https://api.ambiclimate.com/" target="_new">Ambi Dev Portal</a> by following the steps on the Quick Start page.

## Usage

This wrapper uses a client for network communication, which in turn handles all requests against the underlying Ambi Climate API.

    var ac = require('node-ambiclimate'),
        client;

    client = new ac({
        bearerToken: '<your api token>'
    });

## Power Off
Power off your AC

    client.off(settings, [cb])

Option | Type | Description
------ | ---- | -----------
`settings` | Object | Object containing the attributes required by the underlying API: `room_name` and `location_name`
`cb` | function | `function(err, data) {}` Callback function which will be called when the HTTP request to the API is processed

**Usage example:**

    //Using callbacks
    client.off({
            room_name: 'Bedroom',
            location_name: 'Home'
        },
        function (err, data) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
        }
    );

    // Using promises
    client.off({
        room_name: 'Bedroom',
        location_name: 'Home'
    }).then(console.log, console.error);

## Comfort Mode
Enable Comfort mode on your AC

    client.comfort(settings, [cb])

Option | Type | Description
------ | ---- | -----------
`settings` | Object | Object containing the attributes required by the underlying API: `room_name` and `location_name`
`cb` | function | `function(err, data) {}` Callback function which will be called when the HTTP request to the API is processed

**Usage example:**

    //Using callbacks
    client.comfort({
            room_name: 'Bedroom',
            location_name: 'Home'
        },
        function (err, data) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
        }
    );

    // Using promises
    client.comfort({
        room_name: 'Bedroom',
        location_name: 'Home'
    }).then(console.log, console.error);

## Comfort Mode Feedback
Send feedback for Comfort mode

    client.feedback(settings, [cb])

Option | Type | Description
------ | ---- | -----------
`settings` | Object | Object containing the attributes required by the underlying API: `room_name`, `location_name` and `value`.  Supported comfort values: too_hot | too_warm | bit_warm | comfortable | bit_cold | too_cold | freezing
`cb` | function | `function(err, data) {}` Callback function which will be called when the HTTP request to the API is processed

**Usage example:**

    //Using callbacks
    client.feedback({
            room_name: 'Bedroom',
            location_name: 'Home',
            value: 'bit_warm'
        },
        function (err, data) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
        }
    );

    // Using promises
    client.feedback({
        room_name: 'Bedroom',
        location_name: 'Home',
        value: 'but_warm'
    }).then(console.log, console.error);
