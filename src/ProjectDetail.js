var Node = require('famous/core/node');
// var PhysicsEngine = require('famous/physics/PhysicsEngine'); 
var Curves = require('famous/transitions/Curves');

// var Align = require('famous/components/Align');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Position = require('famous/components/Position');
// var Rotation = require('famous/components/Rotation');
// var DOT_SIZE = 80;

// the footer will hold the nav buttons
function ProjectDetail (name) {
    // subclass Node
    // console.log(name);
  Node.call(this);
	this
        // .setMountPoint(0.5, 0.5, 0.5)
        // .setAlign(0.5, 0.5, 0.5)
        // .setSizeMode('absolute', 'absolute', 'absolute')
        .setAbsoluteSize(500,500);
	
	this.el = new DOMElement(this)
              // .setProperty('lineHeight', '100px')
              .setProperty('font-size', '12px')
              .setProperty('border', '1px solid #333')
              .setProperty('background-color', '#333')
              .setProperty('color', 'white')
              .setContent(name);
  this.position = new Position(this);
  this.position.set(0,-900,100);
}

// subclass Node
ProjectDetail.prototype = Object.create(Node.prototype);

ProjectDetail.prototype.swapContent = function(name){
  this.el.setContent(name);
}

ProjectDetail.prototype.show = function(){
  // debugger;
  this.position.set(0,0,302,{duration:1000, curve:Curves.outElastic})
}

module.exports = ProjectDetail;