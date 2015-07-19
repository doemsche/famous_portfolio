var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Align = require('famous/components/Align');

function Header(){
	Node.call(this);
	this.el = new DOMElement(this, {
		classes:['header']
	});

	this.title = this.addChild();
	this.titleEl = new DOMElement(this.title).setProperty('textAlign', 'center')
                                             .setProperty('lineHeight', '100px')
                                             .setProperty('background-color', '#BFDE63')
                                             .setProperty('fontSize', '30px')
                                             .setProperty('color', 'white')
                                             .setProperty('text-shadow', '1px 1px #444')
                                             .setContent('Header');



    this.titleAlign = new Align(this.title);
}

Header.prototype = Object.create(Node.prototype);

module.exports = Header;