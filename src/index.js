var Camera = require('famous/components/Camera');
var Portfolio = require('./Portfolio');
var FamousEngine = require('famous/core/FamousEngine');
// start the Engine
FamousEngine.init();
// create the app and pass in the target element
var scene = FamousEngine.createScene();
var camera = new Camera(scene);
camera.setDepth(3000);

scene.addChild(new Portfolio());
