var Node = require('famous/core/node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var KeyboardEvent = require('famous/dom-renderers/events/KeyboardEvent');
var Position = require('famous/components/Position');
var Curves = require('famous/transitions/Curves');
var Vector3 = require('famous/math/Vec3');

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
                                             // .setProperty('position', 'fixed');
     this.position = new Position(this);
     _addButtons.call(this);
}


// subclass Node
SettingsWindow.prototype = Object.create(Node.prototype);



function _addButtons(){
    var labels = ['X', 'XY', 'XYZ', 'Sine','GiantWheel'];
     for(var i= 0; i < 5; i ++){
          this.addChild()
          .setSizeMode(1,1)
          .setPosition(50,i*25+50,301)
          .setAbsoluteSize(200, 20)
          .addChild(new SettingsButton(i,labels[i]),this.axis);
     }
};

function SettingsButton(num,label){
  Node.call(this);
 
  this.action = {
    active: false,
    type: label
  };
  this.addUIEvent('click');
  this.eventTrigger = 'SettingsButton';
  var content = '<div style="color:white; line-height:30px;"><input style="width:13px; margin-left:10px; height:13px;" type="checkbox" name="vehicle" value="Bike">'+label+'</div><br/>';
  this.el = new  DOMElement(this).setContent(content);

}

SettingsButton.prototype = Object.create(Node.prototype);


SettingsButton.prototype.onReceive = function onReceive(event,payload){
  if(event === "click"){
    this.action.active ? this.action.active = false : this.action.active = true;
  }
};

SettingsWindow.prototype.onMount = function onMount(){
    this.position.set(-1000, 0,0);
};


SettingsWindow.prototype.show = function show(){
      this.position.set(-200, 0,0, {duration: 500, curve:Curves.outElastic});
};

SettingsWindow.prototype.hide = function hide(){
      this.position.set(0-1000, 0,0, {duration: 200, curve:Curves.inOutQuart});
};


module.exports = SettingsWindow;