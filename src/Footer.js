// var data = require('./Data');
var NavButton = require('./NavButton');
var Node = require('famous/core/Node');

// the footer will hold the nav buttons
function Footer (data) {
    // subclass Node
    Node.call(this);
    // object to store the buttons
    this.buttons = {};
    var numArrangements = data.arrangements.length;
    // for every section create a NavButton
    // and set its size and align
    data.arrangements.forEach(function (obj, i) {

    this.buttons[obj.id] = this.addChild(new NavButton(obj))
                                   .setProportionalSize(1 / numArrangements)
                                   .setAlign(i / numArrangements);
    }.bind(this));
}

// subclass Node
Footer.prototype = Object.create(Node.prototype);

module.exports = Footer;