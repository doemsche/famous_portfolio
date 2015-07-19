
var Node = require('famous/core/Node');
var Project = require('./Project');
var Node = require('famous/core/node');
var Align = require('famous/components/Align');
var projectData = require('./data/ProjectData');
var FamousEngine = require('famous/core/FamousEngine');
var Vector3 = require('famous/math/Vec3');
var Curves = require('famous/transitions/Curves');
var DOMElement = require('famous/dom-renderables/DOMElement');

var DOT_SIZE = 45;
// the footer will hold the nav buttons
function Projects () {
    // subclass Node
    Node.call(this);
    this.el = new DOMElement(this,{properties:{}}).setContent('Projects')
   
}

// subclass Node
Projects.prototype = Object.create(Node.prototype);

module.exports = Projects;