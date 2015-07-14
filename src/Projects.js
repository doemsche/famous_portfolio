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
    var toggle = ev.node.action.active;
    switch(ev.node.action.type){
        case 'X':
            this.addAnimationX(toggle);
        break;
        case 'XY':
            this.addAnimationXY(toggle);
        break;
        case 'XYZ':
            this.addAnimationXYZ(toggle);
        break;
        case 'Sine':
            this.addAnimationSineWave(toggle);
        break;
        case 'GiantWheel':
            this.addAnimationGiantWheel(toggle);
        break;
    }
    
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
    // debugger;
    var width =  window.innerWidth;
    var offset = - (width / 2);

    for(var i = 0; i < this.projects.length; i++) {
        var p = this.projects[i];
        // p.setAlign(00.5,02
        var x = offset+280;
        // var x = 0;
        console.log(x)
        p.position.set(x+i*100,0,0,{duration:800, curve: Curves.outElastic});

    }
};

Projects.prototype.addAnimationX = function addAnimationX(toggle){
    if(toggle){
        for(var i = 0; i < this.projects.length; i++) {
            var p = this.projects[i];
            p.setOrigin(.5,.5,.5)
            p.position.set(p.getPosition()[0],p.getPosition()[1],p.getPosition()[2])
            p.addComponent( new SpinnerX(p) );
        }
    }
    else {
        for(var i = 0; i < this.projects.length; i++) {
            var p = this.projects[i];

            p.removeComponent(p.getComponents()[5])
        }
    }
}

Projects.prototype.addAnimationXY = function addAnimationXY(toggle){
    if(toggle){
        for(var i = 0; i < this.projects.length; i++) {
            var p = this.projects[i];
            p.setOrigin(.5,.5,.5)
            p.position.set(p.getPosition()[0],p.getPosition()[1],p.getPosition()[2])
            p.addComponent( new SpinnerXY(p) );
        }
    }
    else {
        for(var i = 0; i < this.projects.length; i++) {
            var p = this.projects[i];

            p.removeComponent(p.getComponents()[5])
        }
    }
}

Projects.prototype.addAnimationXYZ = function addAnimationXYZ(toggle){
    if(toggle){
        for(var i = 0; i < this.projects.length; i++) {
            var p = this.projects[i];
            p.setOrigin(.5,.5,.5)
            p.position.set(p.getPosition()[0],p.getPosition()[1],p.getPosition()[2])
            p.addComponent( new SpinnerXYZ(p) );
        }
    }
    else {
        for(var i = 0; i < this.projects.length; i++) {
            var p = this.projects[i];

            p.removeComponent(p.getComponents()[5])
        }
    }
}

Projects.prototype.addAnimationSineWave = function addAnimationSineWave(toggle){
    if(toggle){
        for(var i = 0; i < this.projects.length; i++) {
            var p = this.projects[i];
            // p.setOrigin(.5,.5,.5)
            p.position.set(p.getPosition()[0],p.getPosition()[1],p.getPosition()[2])
            p.addComponent( new SineWaver(p,i) );
        }
    }
    else {
        for(var i = 0; i < this.projects.length; i++) {
            var p = this.projects[i];

            p.removeComponent(p.getComponents()[5])
        }
    }
}
Projects.prototype.addAnimationGiantWheel = function addAnimationGiantWheel(toggle){
    if(toggle){
        for(var i = 0; i < this.projects.length; i++) {
            var p = this.projects[i];
            // p.setOrigin(.5,.5,.5)
            p.position.set(p.getPosition()[0],p.getPosition()[1],p.getPosition()[2])
            p.addComponent( new GiantWheel(p,i) );
        }
    }
    else {
        for(var i = 0; i < this.projects.length; i++) {
            var p = this.projects[i];

            p.removeComponent(p.getComponents()[5])
        }
    }
}



function SpinnerX(node){
    this.node = node;
    this.id = this.node.addComponent(this);
    this.node.requestUpdate(this.id);

}

SpinnerX.prototype.onUpdate = function(time){
    var val = time /1000;
    this.node.setRotation(val, 0, 0);
    this.node.requestUpdate(this.id);
}


function SpinnerXY(node){
    this.node = node;
    this.id = this.node.addComponent(this);
    this.node.requestUpdate(this.id);

}

SpinnerXY.prototype.onUpdate = function(time){
    var val = time /1000;
    this.node.setRotation(val, val, 0);
    this.node.requestUpdate(this.id);
}

function SpinnerXYZ(node){
    this.node = node;
    this.id = this.node.addComponent(this);
    this.node.requestUpdate(this.id);

}

SpinnerXYZ.prototype.onUpdate = function(time){
    var val = time /1000;
    this.node.setRotation(val, val, val);
    this.node.requestUpdate(this.id);
}

function SineWaver(node,i){
    this.node = node;
    this.angle = 0;
    this.speed = i*2+.2;
    this.id = this.node.addComponent(this);
    this.node.requestUpdate(this.id);
} 

SineWaver.prototype.onUpdate = function(time){
    this.node.position.setY(Math.sin(this.angle)*this.speed);
    this.angle += .1;
    this.node.requestUpdate(this.id);
};

function GiantWheel(node,i){
    this.node = node;
    this.angle = 0;

    // this.centerX = 200;
    // this.centerY = 200; 
    this.radius = 200;
    this.speed = i*0.01/20+0.02;
    this.id = this.node.addComponent(this);
    this.node.requestUpdate(this.id);
}

GiantWheel.prototype.onUpdate = function(time){
    this.node.position.set(Math.sin(this.angle)*this.radius,+Math.cos(this.angle)*this.radius,0)
    this.angle += this.speed;
    this.node.requestUpdate(this.id);
      // ball.x = centerX + Math.sin(angle) * radius;
      //                 ball.y = centerY + Math.cos(angle) * radius;
      //                 angle += speed;
};



Array.prototype.shuffle = function shuffle(){
    for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
}


module.exports = Projects;