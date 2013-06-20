goog.provide('trekbattle.moveButton');
goog.require('lime.GlossyButton');


trekbattle.moveButton = function(starSystemObj) {
	goog.base(this);
	this.setSize(80, 40);
	this.setColor('#133242')
	this.setText('Move to '+starSystemObj.name);
	this.starsystem = starSystemObj;
}

goog.inherits(trekbattle.moveButton, lime.GlossyButton);