var Node = require('famous/core/Node');
var Project = require('./Project');
// var ProjectDetail = require('./ProjectDetail');
var SettingsWindow = require('./SettingsWindow');
var Node = require('famous/core/node');
var Align = require('famous/components/Align');
var Size = require('famous/components/Size');
var Position = require('famous/components/Position');
var MountPoint = require('famous/components/MountPoint');
var projectData = require('./data/ProjectData');
var FamousEngine = require('famous/core/FamousEngine');
var Vector3 = require('famous/math/Vec3');
var Curves = require('famous/transitions/Curves');
var DOMElement = require('famous/dom-renderables/DOMElement');
var COLORS = [ [151, 131, 242], [47, 189, 232] ];
var COLOR_STEPS = 18;
var DOT_SIZE = 45;


var PhysicsEngine = require('famous/physics/PhysicsEngine');
var Gravity3D = require('famous/physics/forces/Gravity3D');
var Sphere = require('famous/physics/bodies/Sphere');
var Vec3 = require('famous/math/Vec3');

// the footer will hold the nav buttons
function Projects () {
    // subclass Node
    Node.call(this);
    this.root = this;
    // object to store the buttons
this.projectData = projectData;
   this.items= [];
}


// subclass Node
Projects.prototype = Object.create(Node.prototype);

Projects.prototype.startPhysicsEngine = function startPhysicsEngine(){
    var demo = new Demo(this);
};


function Demo (root) {
  // this.scene = FamousEngine.createScene('body');

  // this.camera = new Camera(this.scene);
  // this.camera.setDepth(1000);

  this.simulation = new PhysicsEngine();
  this.items = [];

  for (var i = 0; i < 9; i++) {
    var node = root.addChild();
    var size = new Size(node).setMode(1, 1);
    var position = new Position(node);
    if (i === 0) {
      createLogo.call(this, node, size, position);
    }
    if (i !== 0) {
      node.id = i;
      createSatellites.call(this, node, size, position,i);
    }
  }
  FamousEngine.requestUpdateOnNextTick(this);
}

Demo.prototype.onUpdate = function(time) {
  this.simulation.update(time);
  if(this.items.length > 0) {
    for(var i = 0; i < this.items.length; i++) {
      var itemPosition = this.simulation.getTransform(this.items[i][0]).position;
      this.items[i][1].set(itemPosition[0], itemPosition[1], itemPosition[2]);
    }
  }
  FamousEngine.requestUpdateOnNextTick(this);
};

function createLogo(node, size, position) {
  size.setAbsolute(80, 80);
  var mp = new MountPoint(node).set(0.5, 0.5);
  var el = new DOMElement(node, {
    tagName: 'img',
    attributes: {
      src: './images/vw.png'
    }
  })
  el.setProperty('border-radius','100%').setProperty('border-color','red').setProperty('border','5px solid red');
  var sphere = new Sphere({
    radius: 100,
    mass: 10000,
    restrictions: ['xy'],
    position: new Vec3(window.innerWidth / 2, window.innerHeight / 2, -5)
  });

  this.gravity = new Gravity3D(sphere);
  this.simulation.add(sphere, this.gravity);
  this.items.push([sphere, position]);

}

function createSatellites(node, size, position, i,j) {
    // debugger;
  size.setAbsolute(80, 80);
  var radius = 200;
  var x = Math.floor(Math.random() * radius * 2) - radius;
  var y = (Math.round(Math.random()) * 2 - 1) * Math.sqrt(radius * radius - x * x);
  var color = 'rgb(' + Math.abs(x) + ',' + Math.abs(Math.round(y)) + ',' + (255 - node.id) + ')';
 var el = new DOMElement(node, {
    tagName: 'img',
    attributes: {
      src: './'+projectData.projects[i].image
    }
  }).setProperty('border-radius', '100%')
    .setProperty('border','1px solid '+color);
// var el = new DOMElement(node, {}).setContent('<img src='+projectData.projects[i].image+'></img>')
    
  var satellite = new Sphere({
    radius: 20,
    mass: 5,
    position: new Vec3(x + window.innerWidth / 2, y + window.innerHeight / 2, -y / 2)
  });
  // console.log(color);
  satellite.setVelocity(-y / Math.PI, -x / Math.PI / 2, y / 2);
  this.gravity.addTarget(satellite);
  this.simulation.add(satellite);
  this.items.push([satellite, position]);
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
   // debugger;
   // if(type === 'click' && ev.node.eventTrigger === 'Project'){
   //      var projectName = ev.node.trigger;
   //      // debugger;
   //      this.projectDetail.swapContent(projectName);
   //      this.projectDetail.show();
   //      return;
   // }
   var arrangement = ev.node.name;
   switch(arrangement){
       
        case 'Start Physics Engine':
            this.startPhysicsEngine();
        break;
        default:
            return;
            console.log('arrangement has not been defined');
   }
};




module.exports = Projects;