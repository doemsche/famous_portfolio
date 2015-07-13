var Node = require('famous/core/Node');
var Project = require('./Project');
var SettingsWindow = require('./SettingsWindow');
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
    this.axis = [false,false,false];
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
    _bindEvents.call(this);
    this
        .setMountPoint(0.5, 0.5, 0.5)
        .setAlign(0.5, 0.5, 0.5)
        .setOrigin(0.5, 0.5, 0.5)
        .setPosition(0, 0, 300);
        // debugger;
    this.settingsWindow = new SettingsWindow();
    _makeSettings.call(this);

    // debugger;
    var resizeComponent = {
        onSizeChange: function(x, y, z) {
            // console.log(x)
            if(x < 500){this.arrangeAsGrid()}
            if(x > 700){this.arrangeAsCircle()}

            //this.arrangeAsCircle()
            // console.log(arguments)
                // This will layout the dots whenever a resize occurs
                //this.layoutDots([x, y, z])
                // Size === [parent size, 20, parent size]
            }.bind(this)
    };

    // this.addComponent(resizeComponent);
   
}

function _makeSettings(){
    // debugger;
    this.addChild()
        .setSizeMode('absolute', 'absolute')
        .setAbsoluteSize(300, 300)
        .setMountPoint(0.5,0.5)
        .setPosition(undefined,undefined,300)
        .setAlign(0.5,0.5)
        .addChild( this.settingsWindow );
}

function _bindEvents() {
    this.addEventListener('keydown', function(e) {

        if (e.keyCode === 39) {this.settingsWindow.hide()}//hide
        if (e.keyCode === 37) {this.settingsWindow.show()}//show
    }.bind(this));   
}

function _bindEvents() {
   
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 39) {this.settingsWindow.show()}
        if (e.keyCode === 37) {this.settingsWindow.hide()}
    }.bind(this));
}

// subclass Node
Projects.prototype = Object.create(Node.prototype);

Projects.prototype.onReceive = function onReceive(type,ev){
   if(type === 'click' && ev.node.eventTrigger == 'SettingsButton'){

    this.addCraziness();
    
    return;
   };
   var arrangement = ev.node.name;
   switch(arrangement){
        case 'linear':
            this.arrangeAsLinear();
        break;        
        case 'grid':
            this.arrangeAsGrid();
        break;        
        case 'circle':
            this.arrangeAsCircle();
        break;
        default:
            return;
            console.log('arrangement has not been defined');
   }
};


Projects.prototype.arrangeAsGrid = function arrangeAsGrid(){
    this.projects.shuffle();
    if (this.current++ === 4) this.current = 0;

    var spacing = 10;

    var randomizePositionZ = 0;
    var duration = 1000;
    var curve = Curves.outElastic;

    var row = 0;
    var col = 0;
    var dimension = (spacing + 80);

    var bounds = [-(((dimension) * 3 / 2) - (dimension / 2)), -(((dimension) * 3 / 2) - (dimension / 2))];
    for (var i = 0; i < this.projects.length; i++) {

        var p = this.projects[i];
        var polarity = Math.random() < 0.5 ? -1 : 1;
        var x = bounds[0] + ((dimension) * col++);
        var y = bounds[1] + ((dimension) * row);
        var z = (randomizePositionZ) ? Math.floor(Math.random() * 80) * polarity : 0;
        p.position.set(x, y, z, {
            duration: i*10 + duration,
            curve: curve
        });
        if (col >= 3) {
            col = 0;
            row++;
        }
    }
};

Projects.prototype.arrangeAsCircle = function arrangeAsCircle(){
    this.projects.shuffle();

    var angle = 0;
    var step = (2*Math.PI) / this.projects.length;
    var radius = 150;

    for(var i = 0; i < this.projects.length; i++) {
        var p  = this.projects[i];
        var x =radius * Math.cos(angle);
        var y =radius * Math.sin(angle);
        angle += step;
        p.position.set(x, y,50,{duration:1000, curve: Curves.outElastic});
    }
};
Projects.prototype.arrangeAsLinear = function arrangeAsLinear(){
    this.projects.shuffle()

    var width = window.innerWidth;
    var offset = - (width / 2);

    for(var i = 0; i < this.projects.length; i++) {
        var p = this.projects[i];
        var x = offset+120;
        p.position.set(x+i*100,0,0,{duration:800, curve: Curves.outElastic});
    }
};


Projects.prototype.addCraziness = function addCraziness(){

}


Array.prototype.shuffle = function shuffle(){

    for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;

}



module.exports = Projects;