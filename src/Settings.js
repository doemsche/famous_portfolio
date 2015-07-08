var Node = require('famous/core/node');
var DOMElement = require('famous/dom-renderables/DOMElement');

// the footer will hold the nav buttons
function Settings () {
	Node.call(this);
	this.el = new DOMElement(this, {
		classes:['settings']
	});

	this.arrow = this.addChild();
	this.arrowEl = new DOMElement(this.arrow).setProperty('textAlign', 'center')
                                             .setProperty('lineHeight', '100px')
                                             .setProperty('background-color', '#444')
                                             .setProperty('box-shadow', '1px 3px 3px #333')
                                             .setProperty('color', 'white')
                                             .setProperty('padding-left', '25px')
                                             .setProperty('position', 'fixed')
                                             .setContent('>');
}

// subclass Node
Settings.prototype = Object.create(Node.prototype);

module.exports = Settings;