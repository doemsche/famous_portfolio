
var Node = require('famous/core/Node');
var Project = require('./Project');
var Node = require('famous/core/node');
var Align = require('famous/components/Align');
var projectData = require('./data/ProjectData');
var FamousEngine = require('famous/core/FamousEngine');
var Vector3 = require('famous/math/Vec3');
var Curves = require('famous/transitions/Curves');
var DOMElement = require('famous/dom-renderables/DOMElement');
var COLORS = [ [151, 131, 242], [47, 189, 232] ];
var COLOR_STEPS = 18;
var DOT_SIZE = 45;
// the footer will hold the nav buttons
function Projects () {
    // subclass Node
    Node.call(this);
    // object to store the buttons
    var count = 0,
     	rows = 3,
     	cols=3;

    this.projects = [];
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            var project = new Project(projectData.projects[count++]);
            this.addChild(project);
            this.projects.push(project);
        }
    }

    this
        .setMountPoint(0.5, 0.5, 0.5)
        .setAlign(0.5, 0.5, 0.5)
        .setOrigin(0.5, 0.5, 0.5)
        .setPosition(0, 0, 300);
   
}

// subclass Node
Projects.prototype = Object.create(Node.prototype);

module.exports = Projects;