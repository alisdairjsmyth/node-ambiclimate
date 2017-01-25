'use strict';
var request = require('request');
var simpleoauth2 = require('simple-oauth2');
var url = require('url');


class AmbiAuthorizationCode {

    // Requires from https://api.ambiclimate.com/
    //
    // Client ID
    // Client Secret
    //
    // AmbiClimate User e-mail
    // AmbiClimate User Password
    //
    // var api = new AmbiAuthorizationCode('id', 'secret', 'user@mail.com', 'pass');
    //
    // api.getToken( (token) => {
    //         console.log(token);
    //      });
    //

    constructor(clientid, clientsecret, username, password) {
        const credentials = {
            client: {
            id: clientid,
            secret: clientsecret,
        },
        auth: {
            tokenHost: 'https://api.ambiclimate.com',
            tokenPath: '/oauth2/token',
            authorizePath: '/oauth2/authorize',
        },
        http: {
            headers: { 'Accept': 'application/json' }
        }};

        this._oauth2 = simpleoauth2.create(credentials);

        this.auth = this.authenticate(username, password);
    }

    // Obtains the token once, caches, and refreshes if it has expired
    // callback(token):

    getToken(callback) {
        this.promiseToGetToken()
        .then((token) => {
              callback(token.token.access_token)
        })
    }


    promiseToGetToken() {
        return this.auth.then((token) => {
            if (token.expired()) {
                return token.refresh();
            }
                return token;
        })

    }

    // Authentication
    //

    authenticate(username, password) {
        this.auth = this.authenticate_auth_code_flow(username, password);
        return this.auth;
    };

    // Authentiate using OAuth2 authorization code flow

    authenticate_auth_code_flow(username, password) {

        const authorizationUri = this._oauth2.authorizationCode.authorizeURL({
             scope: 'email device_read ac_control',
             });

        const promiseToRequest = AmbiAuthorizationCode.promiseToRequest;
        const oauth2 = this._oauth2;

        // Need to retain a cookie during login process

        var j = request.jar();

        // First initiate an authorization request for this APP

        return promiseToRequest(authorizationUri)
        .then(function(response) {

              var loginRequest = {
                  url: 'https://api.ambiclimate.com/login',
                  method: 'POST',
                  jar: j,
                  form: {email: username, password: password}
              }

              // Then login to the ambiclimate API with the username and password

              return promiseToRequest(loginRequest);
            })

        .then(function(response) {


              var authRequest = {
                  uri: authorizationUri,
                  method: 'POST',
                  form: {confirm: 'yes'},
                  jar: j,
              }

              // Then confirm the user allows this app to access their ambiclimate units
              // which returns an authorization code

              return promiseToRequest(authRequest);
            })


        .then(function(response) {

              var code = url.parse(response.headers.location, true).query.code;

              // Get the access token object (the authorization code is given from the previous step).
              const tokenConfig = {
                  code: code,
                  redirect_uri: 'https://httpbin.org/get'
              };

              // Save the access token

              return oauth2.authorizationCode.getToken(tokenConfig)
            })

        .then((result) => {

              const token = oauth2.accessToken.create(result);
              return token;

            })

        .catch((error) => {
               console.log(error)
               console.log('Access Token Error', error.message);
               return nil
               });
    };

    // Create a promise to access a URL with associated options and headers
    // a status 200 or 302 will resolve the response
    // any other status will cause a rejection

    static promiseToRequest(options) {

        return new Promise(function(resolve, reject) {
           request(options, function (error, response, body) {
               if (!error && (response.statusCode == 200 || response.statusCode == 302)) {
                   resolve(response);
               } else {
                   reject(response);
               }
           })
       })
    };

}

module.exports = AmbiAuthorizationCode;
