goog.provide('trekbattle.Starsystem');
goog.require('lime.Sprite');


trekbattle.Starsystem = function(gameObj, planetObj) {
	goog.base(this);
	this.setAnchorPoint(0, 0);
	this.setSize(gameObj.tile_size, gameObj.tile_size);
	this.setFill('images/planet.png');
	this.state = this.EMPTY;
	
	this.name = planetObj.name;
	this.crystals = planetObj.crystals;
	this.faction = planetObj.faction;
	this.maxCrystals = planetObj.maxCrystals;
	this.regenRate = planetObj.regenRate;
	this.ships = planetObj.ships;
	this.connections = planetObj.connections;
}

goog.inherits(trekbattle.Starsystem, lime.Sprite);