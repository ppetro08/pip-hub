var express = require('express');
var app = express();
var fs = require("fs");

var hue = require("node-hue-api");
var hueApi = require("node-hue-api").HueApi;

var hueUsername;
var lightStateOn = hue.lightState.create().on();
var lightStateOff = hue.lightState.create().off();

var getApi = function () {
    return hue.nupnpSearch().then(function (results) {
        return new hueApi(results[0].ipaddress, hueUsername);
    });
}

var setLightState = function (api, state, lightName) {
    api.lights(function (err, lights) {
        for (var light of lights["lights"]) {
            if (light.name === lightName || !lightName) {
                api.setLightState(light["id"], state);
            }
        }
    });
}

var turnAllLightsOn = function (api) {
    setLightState(api, lightStateOn);
    return api;
}

var turnAllLightsOff = function (api) {
    setLightState(api, lightStateOff);
    return api;
}

app.get('/tooglepower', function (req, res) {
   
    res.end();
})

app.get('/lightsoff', function (req, res) {
    getApi().then(turnAllLightsOff).done();
    res.end();
})

app.get('/', function (req, res) {
    getApi().then(turnAllLightsOff).then(api => setLightState(api, lightStateOn, "Bedside Table Lamp")).done();
    res.end();
})

var server = app.listen(38069, function () {

})