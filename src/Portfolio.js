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
    makeSwapper(this);
}

function makeHeader (node) {
    //child node extending from Twitterus
   node.addChild()
        .setSizeMode('default', 'absolute')
        .setAbsoluteSize(null, 100)
        .addChild(new Header());
}


function makeSwapper (node) {
    node.addChild()
        .setDifferentialSize(null, -200, null)
        .setPosition(0, 100)
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
Portfolio.prototype.onReceive = function onReceive(type,ev){
    if(ev.node.eventTrigger == "NavButton"){
        this.emit("changeArrangement", ev);
    }
    else if(ev.node.eventTrigger == "Project"){
        
    }
    
};
// Twitterus.prototype.onReceive = function onReceive (event, payload) {
//     // if the event is click then we know
//     // that a NavButton was clicked
//     // (NavButtons are the only element)
//     // With the click event.
//     if (event === 'click') {
//         if(payload.node.eventTrigger == 'Project'){
//         //     var trigger = payload.node.trigger;
//             this.emit('changeScene', {trigger:payload.node.trigger});
//             return;
//         }
//         // get the id of the nav button
//         var to = payload.node.getName();
//         this.emit('changeArrangement', {
//             from: this.currentArrangement,
//             to: to
//         });
//         this.currentArrangement = to;
//     }

// };


module.exports = Portfolio;