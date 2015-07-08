var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
// The nav button class will show the name of a section
// and emit a click event when clicked
function NavButton (obj) {
    // Subclass node
    Node.call(this);

    // make and style an element
    this.el = makeEl(this);

    // hold the id of the section
    // this NavButton points to.
    this.name = obj.name;
    // set the content of the element
    // to the target section.
    // initialize the buttons as off
    this.addUIEvent('click', {name:'dominik'});
    this.el.setContent(obj.name)
       //note: we will remove this 'default' in the next step
       // .addClass('off')
}

NavButton.prototype = Object.create(Node.prototype);
NavButton.prototype.on = function on(){
    this.el.removeClass('off').addClass('on');
};
NavButton.prototype.off = function off(){
    this.el.removeClass('on').addClass('off');
};

NavButton.prototype.getName = function getName() {
    return this.name;
};
NavButton.prototype.onReceive = function onReceive (event, payload) {
    if(event === 'click'){
        var options = payload;
        this.emit('changeArrangement', options);
    }
};

// make and style an element
function makeEl (node) {
    return new DOMElement(node, {
        properties: {
            textAlign: 'center',
            lineHeight: '100px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#333',
            color: 'white'
        },
        classes: ['navigation']
    });
};

module.exports = NavButton;