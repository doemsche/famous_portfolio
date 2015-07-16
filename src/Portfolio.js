var Node = require('famous/core/Node');
var projectData = require('./data/ProjectData');
var Curves = require('famous/transitions/Curves');

var Header = require('./Header');
var Footer = require('./Footer');
var Projects = require('./Projects');

function Portfolio(mount) {
    // Extend Node
    Node.call(this);
    this.currentArrangement = 'linear';

    makeHeader.call(this);
    makeFooter(this);
    makeProjects.call(this);
}

function makeHeader () {
    //child node extending from Twitterus
   this.header = new Header();
   this.addChild()
        .setSizeMode('default', 'absolute')
        // .setPosition(null,-700)
        .addChild(this.header);
}


function makeProjects() {
    this.projects = new Projects(projectData);
    this.addChild()
        .setDifferentialSize(null, -200, null)
        .setPosition(0, 100)
        .addChild(this.projects);
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
    if(ev.node.eventTrigger == "Cancel"){
        this.header.title.removeChild(ev.node);
        // delete this.header.cancelBtn;
        this.header.position.set(0,-700,0,{duration:500,curve: Curves.outElastic});
        this.projects.setPosition(0,0,0);
        this.header.titleEl.setContent('Portfolio');
        return;
    }
    if(ev.node.eventTrigger == "NavButton"){
        this.emit("changeArrangement", ev);
    }
    else if(ev.node.eventTrigger == "Project"){
        var data = ev.node.data;
        this.projects.setPosition(0,800,0);
        this.header.extend(data);

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