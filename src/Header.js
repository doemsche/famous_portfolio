var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Align = require('famous/components/Align');
var Opacity = require('famous/components/Opacity');
var Position = require('famous/components/Position');
var Curves = require('famous/transitions/Curves');
function Header(){
	Node.call(this);
    this.data =null;
	this.el = new DOMElement(this, {
		classes:['header']
	});

	this.title = this.addChild();
	this.titleEl = new DOMElement(this.title).setProperty('textAlign', 'center')
                                             .setProperty('lineHeight', '100px')
                                             .setProperty('background-color', '#BFDE63')
                                             .setProperty('fontSize', '30px')
                                             .setProperty('color', 'white')
                                             .setProperty('text-shadow', '1px 1px #444')
                                             .setContent('Portfolio');

    this.position = new Position(this);
    this.position.set(0, -700,0)
    this.titleAlign = new Align(this.title);
}

Header.prototype = Object.create(Node.prototype);

Header.prototype.swapData = function swapData(data){
    this.titleEl.setContent(data.id);

    this.descr = this.addChild();
    this.descr.setSizeMode('relative','absolute','absolute')
              .setAbsoluteSize(undefined,80,0)
    this.descrEl = new DOMElement(this.descr).setContent(data.descr)
                                            .setProperty('background-color', '#333')
                                             // .setProperty('fontSize', '30px')
                                             .setProperty('color', 'white')
                                             .setProperty('text-shadow', '1px 1px #444')
    this.descrPosition = new Position(this.descr)
    this.descrOpacity = new Opacity(this.descr);
    this.descrOpacity.set(0);
    this.descrPosition.set(0,100,0,{duration:1000})
    this.descrOpacity.set(0.4,{duration:1000})

        this.descr2 = this.addChild();
    this.descr2.setSizeMode('relative','absolute','absolute')
              .setAbsoluteSize(undefined,80,0)
    this.descrEl2 = new DOMElement(this.descr2).setContent(data.descr)
                                            .setProperty('background-color', '#333')
                                             // .setProperty('fontSize', '30px')
                                             .setProperty('color', 'white')
                                             .setProperty('text-shadow', '1px 1px #444')


        this.descrPosition2 = new Position(this.descr2)
    this.descrOpacity2 = new Opacity(this.descr2);
    this.descrOpacity2.set(0);
    this.descrPosition2.set(0,200,0,{duration:1000})
    this.descrOpacity2.set(0.8,{duration:1400}, function(){
        this.showCancelBtn();
    }.bind(this))
};

Header.prototype.showCancelBtn = function showCancelBtn(){
    this.cancelBtn = this.addChild();
    this.cancelBtn.addUIEvent('click');
    this.cancelBtn.eventTrigger = "Cancel";
    this.cancelBtnEl = new DOMElement(this.cancelBtn).setContent('<img width="50px" src="images/cancel.png"/>');
    this.cancelPosition = new Position(this.cancelBtn);
    this.cancelPosition.set(800,80,307, {duration:500, curve: Curves.outElastic})
};

Header.prototype.extend = function extend(data){
    this.data = data;
    console.log(this.data)
    this.position.set(0,0,305, {duration:1700, curve: Curves.outElastic}, function(){
        this.swapData(this.data);
    }.bind(this));
};
// Header.prototype.onReceive = function onReceive (event, payload) {
//     if (event === 'changeSection') {
//     	 this.changeSection(payload.to);
//         // we will uncomment this in the next section
//         //this.changeSection(payload.to);
//     }
// };

// Header.prototype.changeSection = function changeSection(to){
//     this.titleAlign.set(0, -1, 0, {duration: 250}, function () {
//         // while the title is off screen
//         // change the content
//         this.titleEl.setContent(to);

//         // align 0, 0, 0 places the title back into its parent
//         // exactly
//         this.titleAlign.set(0, 0, 0, {duration: 250});
//     }.bind(this));
// }

module.exports = Header;