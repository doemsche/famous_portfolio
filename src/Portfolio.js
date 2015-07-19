var Node = require('famous/core/Node');
var projectData = require('./data/ProjectData');

var Header = require('./Header');
var Footer = require('./Footer');
var Projects = require('./Projects');

function Portfolio(mount) {
    // Extend Node
    Node.call(this);
    this.currentArrangement = 'linear';

    makeHeader(this);
    makeFooter(this);
    makeProjects(this);
}

function makeHeader (node) {
    //child node extending from Twitterus
   node.addChild()
        .setSizeMode('default', 'absolute')
        .setAbsoluteSize(null, 100)
        .addChild(new Header());
}


function makeProjects (node) {
    node.addChild()
        .setDifferentialSize(null, -200, null)
        .setAlign(0.5,.5)
        .addChild(new Projects(projectData));
}

function makeFooter (node) {
    //child nodes will control layout
    node.addChild()
        .setSizeMode('default', 'absolute')
        .setAbsoluteSize(null, 100)
        .setMountPoint(0, 1)
        .setAlign(0, 1)
        .addChild(new Footer(projectData));
}


// Extend the prototype
Portfolio.prototype = Object.create(Node.prototype);


module.exports = Portfolio;