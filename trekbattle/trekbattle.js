//set main namespace
goog.provide('trekbattle');
//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('trekbattle.Starsystem');
goog.require('trekbattle.Ship');
goog.require('trekbattle.moveButton');

//entrypoint
trekbattle.start = function() {

	//game object
	var gameObj = {
		width : 1024,
		height : 768,
		tile_size : 45,
		num_tiles_x : 2,
		num_tiles_y : 2,
		turn : 1
	}

	//player object
	var playerObj = {
		name : '',
		faction : '',
		crystals : 0,
		isHuman : false
	}

	var planets = []

	var planetObj = {
		crystals : 0,
		faction : 'unaffiliated',
		ships : [],
		maxCrystals : 0,
		regenRate : 0
	}

	var shipObj = {
		name : '',
		faction : '',
		speed : 0,
		hasMoved : false,
		type : '',
		power : 0,
		shield : 0,
		hull : 0,
		maxShield : 0,
		maxHull : 0,
		miningRate : 0
	}

	var director = new lime.Director(document.body, gameObj.width, gameObj.height);
	director.makeMobileWebAppCapable();
	director.setDisplayFPS(false);

	gameObj.director = director;

	var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
	var planetLayer = new lime.Layer().setAnchorPoint(0, 0);
	var infoLayer = new lime.Layer().setAnchorPoint(0, 0);

	gameScene.appendChild(planetLayer);
	gameScene.appendChild(infoLayer);

	var infoArea = new lime.Sprite().setAnchorPoint(0, 0).setPosition(0, 568).setSize(1024, 200).setFill('#996699')
	infoLayer.appendChild(infoArea);

	var crystalStatic = new lime.Label().setText('Crystals: ').setFontColor('#E8FC08').setPosition(10, 600).setFontSize(32).setAlign('Left');
	infoLayer.appendChild(crystalStatic);

	var factionStatic = new lime.Label().setText('Faction: ').setFontColor('#E8FC08').setPosition(10, 640).setFontSize(32).setAlign('Left');
	infoLayer.appendChild(factionStatic);

	var maxCrystalsStatic = new lime.Label().setText('Max Crystals: ').setFontColor('#E8FC08').setPosition(10, 680).setFontSize(32).setAlign('Left');
	infoLayer.appendChild(maxCrystalsStatic);

	var regenRateStatic = new lime.Label().setText('Regen Rate: ').setFontColor('#E8FC08').setPosition(10, 720).setFontSize(32).setAlign('Left');
	infoLayer.appendChild(regenRateStatic);

	var crystalLabel = new lime.Label().setText('----').setFontColor('#E8FC08').setPosition(240, 600).setFontSize(32).setAlign('Left');
	infoLayer.appendChild(crystalLabel);

	var factionLabel = new lime.Label().setText('----').setFontColor('#E8FC08').setPosition(240, 640).setFontSize(32).setAlign('Left');
	infoLayer.appendChild(factionLabel);

	var maxCrystalsLabel = new lime.Label().setText('----').setFontColor('#E8FC08').setPosition(240, 680).setFontSize(32).setAlign('Left');
	infoLayer.appendChild(maxCrystalsLabel);

	var regenRateLabel = new lime.Label().setText('----').setFontColor('#E8FC08').setPosition(240, 720).setFontSize(32).setAlign('Left');
	infoLayer.appendChild(regenRateLabel);

	var planetInfoButton = new lime.GlossyButton().setColor('#133242').setText('Planet Info').setPosition(800, 650).setSize(80, 40).setHidden(true);
	infoLayer.appendChild(planetInfoButton);

	var endTurnButton = new lime.GlossyButton().setColor('#133242').setText('End Turn').setPosition(800, 750).setSize(80, 40);
	infoLayer.appendChild(endTurnButton);

	var endTurnScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
	var endTurnLayer = new lime.Layer().setAnchorPoint(0, 0);
	var endTurnReport = new lime.Label().setText('End of Turn Report').setFontColor('#E8FC08').setFontSize(32);
	var endTurnContinueButton = new lime.GlossyButton().setColor('#133242').setText('Continue').setPosition(800, 750).setSize(80, 40);
	endTurnLayer.appendChild(endTurnContinueButton);
	endTurnLayer.appendChild(endTurnReport);
	endTurnScene.appendChild(endTurnLayer);
	goog.events.listen(endTurnContinueButton, ['mousedown', 'touchstart'], function(e) {
		director.replaceScene(gameScene);
	});

	var movingShip = new lime.Label().setText('Moving ship to...').setFontColor('#E8FC08').setPosition(540, 720).setFontSize(20).setAlign('Left');
	movingShip.setHidden(true);
	infoLayer.appendChild(movingShip);

	//Create the planets
	var randomnumber = Math.floor(Math.random() * 11)//Random number betweeen 1 and 10

	var planetObj1 = {
		crystals : 10,
		faction : 'unaffiliated',
		ships : {
			'defiant' : new trekbattle.Ship(gameObj, shipObj)
		},
		maxCrystals : 50,
		regenRate : 4,
		name : 'System1'
	}
	var planetObj2 = {
		crystals : 20,
		faction : 'unaffiliated',
		ships : {
			'intrepid' : new trekbattle.Ship(gameObj, shipObj).setFill('images/intrepid.png')
		},
		maxCrystals : 60,
		regenRate : 6,
		name : 'System2'
	}
	var planetObj3 = {
		crystals : 30,
		faction : 'unaffiliated',
		ships : {
			'galaxy' : new trekbattle.Ship(gameObj, shipObj).setFill('images/galaxy.png')
		},
		maxCrystals : 80,
		regenRate : 8,
		name : 'System3'
	}
	var planetObj4 = {
		crystals : 20,
		faction : 'unaffiliated',
		ships : {
			'mining' : new trekbattle.Ship(gameObj, shipObj).setFill('images/mining.png')
		},
		maxCrystals : 30,
		regenRate : 5,
		name : 'System4'
	}

	planetObj1.connections = [planetObj2, planetObj3];
	planetObj2.connections = [planetObj1, planetObj4];
	planetObj3.connections = [planetObj1, planetObj4];
	planetObj4.connections = [planetObj2, planetObj3];

	planetObj1.ships['defiant'].name = 'defiant';
	planetObj2.ships['intrepid'].name = 'intrepid';
	planetObj3.ships['galaxy'].name = 'galaxy';
	planetObj4.ships['mining'].name = 'mining';

	planets.push(planetObj1);
	planets.push(planetObj2);
	planets.push(planetObj3);
	planets.push(planetObj4);

	var planetSprites = [];

	//create initial ships
	// var ship = new trekbattle.Ship(gameObj, shipObj);
	// ship.setPosition(30, 30);
	// planetLayer.appendChild(ship);
	// var movingDialog = false;

	//create planet elements
	var planetCount = 0;
	for (var i = 0; i < gameObj.num_tiles_x; i++) {
		for (var j = 0; j < gameObj.num_tiles_y; j++) {
			var planet = new trekbattle.Starsystem(gameObj, planets[planetCount]);
			planet.setPosition(i * gameObj.tile_size * 3, j * gameObj.tile_size * 3);
			//display planet info on click
			(function(planet, i) {
				goog.events.listen(planet, ['mousedown', 'touchstart'], function(e) {
					crystalLabel.setText(planet.crystals);
					factionLabel.setText(planet.faction);
					maxCrystalsLabel.setText(planet.maxCrystals);
					regenRateLabel.setText(planet.regenRate);

					//gameScene.appendChild(trekbattle.drawShips(planet, gameObj, shipObj));
					//director.replaceScene(gameScene);
					//director.replaceScene(trekbattle.drawShips(planet, gameObj, shipObj, gameScene));

					planetInfoButton.setHidden(false);
					goog.events.listen(planetInfoButton, ['mousedown', 'touchstart'], function(e) {
						planetInfoButton.setHidden(true);
						director.replaceScene(trekbattle.drawShips(planet, gameObj, shipObj, gameScene));
					});

					// if (movingDialog) {
					// ship.setPosition(planet.getPosition().x + 30, planet.getPosition().y + 30);
					// movingShip.setHidden(true);
					// movingDialog = false;
					// }

				});
			})(planet, i);

			planetLayer.appendChild(planet);
			planetSprites.push(planet);
			planetCount++;
		}
	}

	director.replaceScene(gameScene);

	//	goog.events.listen(ship, ['mousedown', 'touchstart'], function(e) {
	//		movingShip.setHidden(!movingShip.getHidden());
	//		movingDialog = true;
	//	});

	//End of turn cleanup
	goog.events.listen(endTurnButton, ['mousedown', 'touchstart'], function(e) {
		for (var i = 0; i < planetSprites.length; i++) {
			planetSprites[i].crystals = planetSprites[i].crystals + planetSprites[i].regenRate;
			if (planetSprites[i].crystals > planetSprites[i].maxCrystals) {
				planetSprites[i].crystals = planetSprites[i].maxCrystals;
			}
			for (var key in planetSprites[i].ships) {
				planetSprites[i].ships[key].hasMoved = false;
				planetSprites[i].ships[key].setOpacity(1);
			}

		}
		gameObj.turn++;
		director.replaceScene(endTurnScene);
	});

}

trekbattle.drawShips = function(planet, gameObj, shipObj, gameScene) {
	var ships = planet.ships;
	var listShips = [];
	for (var key in ships) {
		listShips.push(ships[key]);
	}
	var selectedShips = [];

	var shipScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
	var shipLayer = new lime.Layer().setAnchorPoint(200, 200).setPosition(200, 200);

	shipScene.appendChild(shipLayer);

	var shipArea = new lime.Sprite().setAnchorPoint(0, 0).setPosition(0, 0).setSize(300, 300).setFill('#249DAB');
	shipLayer.appendChild(shipArea);

	for (var i = 0; i < listShips.length; i++) {
		var ship = listShips[i];
		ship.setPosition(i * 100 + 25, 25);
		shipLayer.appendChild(ship);

		var quantityLabel = new lime.Label().setText('----').setFontColor('#E8FC08').setPosition(i * 100 + 25, 75).setFontSize(16).setAlign('Left');
		shipLayer.appendChild(quantityLabel);

		if (!ship.hasMoved) {
			(function(ship, i) {
				goog.events.listen(ship, ['mousedown', 'touchstart'], function(e) {
					selectedShips.push(ship);
					ship.setOpacity(0.6);
				});
			})(ship, i);
		}
	}

	for (var i = 0; i < planet.connections.length; i++) {
		var connection = planet.connections[i];
		var moveButton = new trekbattle.moveButton(connection).setPosition(220, i * 40 + 150);
		shipLayer.appendChild(moveButton);

		(function(moveButton, i) {
			goog.events.listen(moveButton, ['mousedown', 'touchstart'], function(e) {
				for (var j = 0; j < selectedShips.length; j++) {
					var ship = selectedShips[j];
					delete planet.ships[ship.name];
					moveButton.starsystem.ships[ship.name] = ship;
					ship.hasMoved = true;
					//ship.setOpacity(1);
				}
				gameObj.director.replaceScene(gameScene);
			});
		})(moveButton, i);

	}
	var backToMapButton = new lime.GlossyButton().setColor('#133242').setText('Return to Map').setPosition(220, 260).setSize(80, 40);
	shipLayer.appendChild(backToMapButton);

	goog.events.listen(backToMapButton, ['mousedown', 'touchstart'], function(e) {
		gameObj.director.replaceScene(gameScene);
	});

	return shipScene;
}

