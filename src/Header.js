var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Align = require('famous/components/Align');
var Position = require('famous/components/Position');
var Curves = require('famous/transitions/Curves');
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
                                             .setContent('Portfolio');

    this.position = new Position(this);
    this.position.set(0, -700,0)
    this.titleAlign = new Align(this.title);
}

Header.prototype = Object.create(Node.prototype);

Header.prototype.extend = function extend(){
    this.position.set(0,0,305, {duration:2300, curve: Curves.outElastic})
};
// Header.prototype.onReceive = function onReceive (event, payload) {
//     if (event === 'changeSection') {
//     	 this.changeSection(payload.to);
//         // we will uncomment this in the next section
//         //this.changeSection(payload.to);
//     }
// };

// Header.prototype.changeSection = function changeSection(to){
//     this.titleAlign.set(0, -1, 0, {duration: 250}, function () {
//         // while the title is off screen
//         // change the content
//         this.titleEl.setContent(to);

//         // align 0, 0, 0 places the title back into its parent
//         // exactly
//         this.titleAlign.set(0, 0, 0, {duration: 250});
//     }.bind(this));
// }

module.exports = Header;