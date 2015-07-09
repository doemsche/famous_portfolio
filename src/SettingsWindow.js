var Node = require('famous/core/node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var KeyboardEvent = require('famous/dom-renderers/events/KeyboardEvent');
var Position = require('famous/components/Position');
var Curves = require('famous/transitions/Curves');

// the footer will hold the nav buttons
function SettingsWindow () {
	Node.call(this);
	this.el = new DOMElement(this, {
		classes:['settings']
	});

	this.square = this.addChild();
	this.body = new DOMElement(this.square).setProperty('textAlign', 'center')
                                             .setProperty('lineHeight', '100px')
                                             .setProperty('background-color', '#444')
                                             .setProperty('box-shadow', '1px 3px 5px #333')
                                             .setProperty('color', 'white')
                                             .setProperty('padding-left', '25px')
                                             .setProperty('position', 'fixed');
     this.position = new Position(this);
     this.addUIEvent('click');
     _addButtons.call(this);

}


// subclass Node
SettingsWindow.prototype = Object.create(Node.prototype);


function _addButtons(){

     for(var i= 0; i < 9; i ++){
          // debugger;
          this.button = this.square.addChild();
          this.button.setSizeMode('relative', 'relative','relative')
          // this.button.setMountPoint(0.5,0.5,0.5)
          // this.button.setPosition(i*10, i*10);

          this.numEl = new DOMElement(this.button, {
               classes:['button']
          }).setContent(i).setProperty('color', 'white');
     }
     

};

SettingsWindow.prototype.click = function click(){

};

SettingsWindow.prototype.onMount = function onMount(){
    this.position.set(-1000, 0,0);
};


SettingsWindow.prototype.show = function show(){
      this.position.set(0, 0,0, {duration: 500, curve:Curves.outElastic});
};

SettingsWindow.prototype.hide = function hide(){
      this.position.set(-1000, 0,0, {duration: 200, curve:Curves.inOutQuart});
};


module.exports = SettingsWindow;