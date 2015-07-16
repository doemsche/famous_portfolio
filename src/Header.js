var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Align = require('famous/components/Align');
var Opacity = require('famous/components/Opacity');
var Position = require('famous/components/Position');
var Curves = require('famous/transitions/Curves');
function Header(){
	Node.call(this);
    this.data =null;
	this.container = this.addChild();
    this.container.setSizeMode('relative','absolute','absolute');
    this.container.setAbsoluteSize(undefined,800,0)
    // this.container.setMountPoint(0,undefined)

	this.containerEl = new DOMElement(this.container)
                                             .setProperty('background-color', '#BFDE63')
    this.position = new Position(this);
    this.position.set(0, -700,0)

    //Instantiate with Titel Portfolio
    this.title = this.container.addChild();
    this.title.setSizeMode('default','render','render')
    this.title.setProportionalSize(1,0,0)
    this.title.setAlign(0,0.9);
    // this.title.setPosition(null,20,10);
    // this.title.setMountPoint(.5,undefined);
    this.titleEl = new DOMElement(this.title,{
        properties: {
            textAlign: 'center',
            lineHeight: '100px',
            fontSize: '30px',
            cursor: 'pointer',
            //backgroundColor: '#333',
            color: 'white',
            textShadow: '1px 1px #444'
        }
    }).setContent('Portfolio')
                                

}

Header.prototype = Object.create(Node.prototype);

Header.prototype.swapData = function swapData(data){
    this.titleEl.setContent(data.id);
    this.showCancelBtn();
    this.showImages();
    this.showDescription();
};

Header.prototype.showCancelBtn = function showCancelBtn(){
    this.cancelBtn = this.title.addChild();
    this.cancelBtn.addUIEvent('click');
    this.cancelBtn.eventTrigger = "Cancel";

    this.cancelBtn.setSizeMode('absolute', 'absolute', 'absolute')

    this.cancelBtnEl = new DOMElement(this.cancelBtn).setContent('<img width=50px src="images/cancel.png"/>')
                                                    // .setProperty('background-color','red');
    this.cancelPosition = new Position(this.cancelBtn);
    this.cancelPosition.set(100,0,0,{duration:500,curve: Curves.outElastic})
};

Header.prototype.showImages = function showImage(){

    this.imagecontainer = this.addChild();
    for(var i= 0; i < this.data.pics.length; i++){
        var imgpath = this.data.pics[i]
        var image = this.imagecontainer.addChild();
        image.setSizeMode('absolute','absolute','absolute');
        image.setAbsoluteSize(100,100,0)
        image.position = new Position(image);
        image.opacity = new Opacity(image);
        image.opacity.set(0);
        image.opacity.set(1,{duration:i*300})
        image.position.set(i*150+80+i*10,200,0,{duration: i*180})
        var imageEl = new DOMElement(image)
                            .setContent('<img width=150px src='+imgpath+' />')    
    }
    this.imagecontainer.setAlign(0,.1)
    // this.imagecontainer.setMountPoint(.5,.5)
};

Header.prototype.showDescription = function showDescription(){
    this.descriptionContainer = this.addChild();
    this.descriptionContainer.setSizeMode('absolute','absolute','absolute');
    this.descriptionContainer.setAbsoluteSize(500,200);
    var descrposition = new Position(this.descriptionContainer);
    descrposition.set(90,430,0);
    var descriptionopacity = new Opacity(this.descriptionContainer)
    descriptionopacity.set(0);
    descriptionopacity.set(1,{duration: 1000})
    var descrEl = new DOMElement(this.descriptionContainer)
                                .setProperty('color', '#333')
                                .setProperty('font-size', '20px')
                                .setContent(this.data.descr);

};

Header.prototype.extend = function extend(data){
    this.data = data;
    console.log(this.data)
    this.position.set(0,0,307, {duration:1700, curve: Curves.outElastic}, function(){
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