//01 Sizing
'use strict';
var famous = require('famous');
var DOMElement = famous.domRenderables.DOMElement;
var FamousEngine = famous.core.FamousEngine;
var node = FamousEngine.createScene().addChild();

new DOMElement(node, { tagName: 'img' })
    .setAttribute('src', './images/famous-logo.svg');

node.setSizeMode('absolute','absolute','absolute');
node.setAbsoluteSize(100,100);

//node.setPosition(30,10)
node.setAlign(0.5,0.5);
node.setMountPoint(0.5,0.5);

FamousEngine.init();


//02
'use strict';

var famous = require('famous');
var DOMElement = famous.domRenderables.DOMElement;
var FamousEngine = famous.core.FamousEngine;
var Position = famous.components.Position;

var node = FamousEngine.createScene().addChild();

new DOMElement(node, { tagName: 'img' })
    .setAttribute('src', './images/famous-logo.svg');

node.setSizeMode('absolute','absolute','absolute');
node.setAbsoluteSize(100,100);

var position = new Position(node);

position.set(100,100,100,{duration: 1000})

FamousEngine.init();


//03
var famous = require('famous');
var DOMElement = famous.domRenderables.DOMElement;
var FamousEngine = famous.core.FamousEngine;
var Position = famous.components.Position;
var Transitionable = famous.transitions.Transitionable;

var node = FamousEngine.createScene().addChild();

new DOMElement(node, { tagName: 'img' })
    .setAttribute('src', './images/famous-logo.svg');

node.setSizeMode('absolute','absolute','absolute');
node.setAbsoluteSize(100,100);

//var position = new Position(node);

//position.set(100,100,100,{duration: 1000})

function SineWaver(node,i){
    this.node = node;
    this.angle = 0;
    this.speed = .2;
    this.id = this.node.addComponent(this);
    this.node.requestUpdate(this.id);
} 

SineWaver.prototype.onUpdate = function(time){
    this.node.position.setY(Math.sin(this.angle)*this.speed);
    this.angle += .1;
    this.node.requestUpdate(this.id);
};

var sineWaver = new SineWaver(node);



FamousEngine.init();


