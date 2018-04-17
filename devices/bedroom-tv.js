"use strict"

var irslinger = require("services/irslinger");

bedroomTV.irSling = function() {
   irslinger.sling({
      program: "aircon",
      code: "10001110011100011010010001011011111"
   });
}

module.exports = bedroomTV;