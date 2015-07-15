var Node = require('famous/core/node');
var PhysicsEngine = require('famous/physics/PhysicsEngine'); 

var Align = require('famous/components/Align');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Position = require('famous/components/Position');
var Rotation = require('famous/components/Rotation');
var DOT_SIZE = 80;

// the footer will hold the nav buttons
function Project (data) {
    // subclass Node
  Node.call(this);
  this.data = data;
  this.trigger = data.id;
  this.eventTrigger = "Project";
	var html = '<img src='+data.image+'></img>';
	this
        .setMountPoint(0.5, 0.5, 0.5)
        .setAlign(0.5, 0.5, 0.5)
        .setSizeMode('absolute', 'absolute', 'absolute')
        .setAbsoluteSize(DOT_SIZE+2, DOT_SIZE+2, DOT_SIZE+2);
        // .setContent(html)
	
	this.el = new DOMElement(this)
              // .setProperty('lineHeight', '100px')
              .setProperty('font-size', '12px')
              .setProperty('border', '1px solid #333')
              .setContent(html);

              this.position = new Position(this);
              this.rotation = new Rotation(this);
  this.addUIEvent('click');
   
}

// subclass Node
Project.prototype = Object.create(Node.prototype);


// Project.prototype.onReceive = function onReceive(type,ev){
//   // debugger;
//    if(ev.node.eventTrigger == "Project"){
//     // debugger;
//       this.emit('showDetail');
//       return;
//    }
// };

module.exports = Project;