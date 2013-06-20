goog.provide('trekbattle.Ship');
goog.require('lime.Sprite');

trekbattle.Ship = function(gameObj, planetObj) {
	goog.base(this);
	this.setAnchorPoint(0, 0);
	this.setSize(gameObj.tile_size, gameObj.tile_size);
	this.setFill('images/defiant.png');
	this.state = this.EMPTY;
	
	
	this.name = planetObj.name;
	this.faction = planetObj.faction;
	this.speed = planetObj.speed;
	this.hasMoved = planetObj.hasMoved;
	this.type = planetObj.type;
	this.power = planetObj.power;
	this.shield = planetObj.shield;
	this.hull = planetObj.hull;
	this.maxShield = planetObj.maxShield;
	this.maxHull = planetObj.maxHull;
	this.miningRate = planetObj.miningRate;
}

goog.inherits(trekbattle.Ship, lime.Sprite);