//Setting variables//
var Level = 0; //used to determine the map
var gamestate = 0; //used to switch between menu/single-player/COOP and VS modes
var Location = 3; //position of goal
var Location2 = 10; //position of the second goal in VS mode
var Players =1; //used to determine which sprite to load (1 is blue 2 is red)
var locationset =true; //used to tell the game when to reset the position of the players
var counter=0; //used to ensure that the entire map is checked for filling
var counter2 =0; //used to add a delay before the map changes
//initial functions//
//starts music on startup
function Music(){
	var sound = document.getElementById("myAudio").autoplay;
	sound.loop = true;
}	
//loads all sprites:
Game.load = function () {
	//console.log(Game.level);
		return [
			Loader.loadImage('tiles', '../assets/tiles.png'),
			Loader.loadImage('tiles2', '../assets/tiles2.png'),
			Loader.loadImage('tiles3', '../assets/tiles3.png'),
			Loader.loadImage('tiles4', '../assets/tiles4.png'),
			Loader.loadImage('tiles5', '../assets/tiles5.png'),
			Loader.loadImage('hero', '../assets/character.png'),
			Loader.loadImage('Player2', '../assets/Player2.png'),
			Loader.loadImage('Menu', '../assets/Menu.png')
		];


};
//Creates the two player and begins listening for inputs
Game.init = function () {
	Keyboard.listenForEvents(
		[Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN, Keyboard.E, Keyboard.ESC, Keyboard.LEFT2, Keyboard.RIGHT2, Keyboard.UP2, Keyboard.DOWN2, Keyboard.E2]);
	this.tileAtlas = Loader.getImage('Menu');
	var heroX = 3*map.tsize - map.tsize/2;
	var heroY = 3*map.tsize - map.tsize/2;
	var Player2X = 9*map.tsize - map.tsize/2;
	var Player2Y = 3*map.tsize - map.tsize/2;
	Music();
	this.hero = new Hero(map, heroX, heroY);
	this.player2 = new Hero(map, Player2X, Player2Y);
	this.camera = new Camera(map, 768, 768);
	this.camera.follow(this.hero);
};
//levels://
//the "map" is here to ensure that errors are not popping up, it is because the name "map" is everywhere
//these are the levels which get loaded
var map = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 16, 2, 2, 2, 17, 2, 2, 2, 2, 2, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 5, 5, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 5, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
var map1 = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 16, 2, 17, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 6, 9, 4, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 3, 4, 8, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 3, 9, 8, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 3, 8, 9, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
var map2 = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 16, 2, 2, 17, 2, 2, 2, 2, 2, 2, 2,
	2, 6, 8, 4, 3, 0, 0, 0, 0, 0, 0, 2,
	2, 4, 4, 7, 6, 0, 0, 0, 0, 0, 0, 2,
	2, 3, 4, 6, 9, 0, 0, 0, 0, 0, 0, 2,
	2, 6, 7, 4, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 4, 3, 7, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 9, 8, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
var map3 = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 16, 2, 2, 2, 2, 2, 2, 2, 2, 17, 2,
	2, 9, 6, 4, 6, 8, 3, 3, 9, 4, 6, 2,
	2, 3, 9, 6, 7, 6, 8, 6, 8, 3, 7, 2,
	2, 8, 3, 4, 6, 7, 9, 4, 4, 3, 9, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
var map4 = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 16, 2, 2, 2, 2, 2, 2, 2, 2, 17, 2,
	2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2,
	2, 4, 4, 0, 0, 0, 0, 0, 0, 9, 7, 2,
	2, 9, 7, 0, 0, 0, 0, 0, 0, 4, 8, 2,
	2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2,
	2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2,
	2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2,
	2, 8, 6, 4, 0, 0, 0, 0, 9, 6, 8, 2,
	2, 6, 7, 3, 9, 3, 6, 4, 6, 4, 3, 2,
	2, 3, 4, 7, 8, 0, 0, 9, 8, 9, 3, 2,
	2, 8, 6, 4, 0, 0, 0, 0, 4, 3, 8, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
var map5 = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 16, 2, 2, 2, 17, 2, 2, 2, 2, 2, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 5, 5, 7, 7, 7, 5, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 5, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 5, 7, 5, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
var Menumap = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0,  3, 4, 5, 6, 5, 7, 7, 0, 0, 2,
	2, 0, 0,  8, 9, 10, 11, 12, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 18,  16, 13, 6, 3, 14, 5, 15, 0, 2,
	2, 0, 18, 0, 0, 20, 1, 1, 13, 0, 0, 2,
	2, 0, 18, 0, 0, 0, 17, 7, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
var P1Win = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 13, 6, 3, 14, 5, 15, 16,0,0, 2,
	2, 0, 0,  0, 22, 23, 24, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 18,  0, 25, 5, 24, 26, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
var P2Win = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 13, 6, 3, 14, 5, 15, 27,0,0, 2,
	2, 0, 0,  0, 22, 23, 24, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 18,  0, 25, 5, 24, 26, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
var Win = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 14, 1, 26, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 22, 23, 24, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 18,  0, 25, 5, 24, 26, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
var Coopmap = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 16, 2, 2, 2, 2, 2, 2, 2, 2, 17, 2,
	2, 7, 3, 6, 6, 9, 6, 9, 8, 3, 9, 2,
	2, 8, 4, 3, 9, 3, 5, 8, 6, 9, 6, 2,
	2, 4, 6, 8, 6, 3, 6, 5, 6, 7, 6, 2,
	2, 6, 3, 5, 7, 7, 5, 8, 9, 8, 8, 2,
	2, 4, 6, 4, 8, 5, 3, 5, 3, 7, 9, 2,
	2, 9, 3, 3, 7, 6, 5, 9, 3, 6, 8, 2,
	2, 8, 4, 6, 5, 9, 3, 9, 5, 6, 6, 2,
	2, 4, 6, 4, 9, 5, 4, 5, 4, 3, 3, 2,
	2, 7, 3, 4, 9, 4, 4, 9, 7, 8, 9, 2,
	2, 9, 7, 9, 4, 3, 8, 6, 6, 7, 8, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
var VSmap = {
cols: 12,
rows: 12,
tsize: 64,
layers: [[
	2, 17, 2, 2, 2, 2, 2, 2, 2, 2, 17, 2,
	2, 9, 6, 6, 3, 9, 9, 3, 6, 6, 9, 2,
	2, 9, 7, 6, 7, 8, 8, 7, 8, 8, 6, 2,
	2, 8, 3, 9, 8, 7, 6, 6, 9, 9, 3, 2,
	2, 3, 3, 3, 8, 3, 9, 7, 5, 6, 6, 2,
	2, 3, 6, 8, 5, 3, 6, 8, 9, 8, 5, 2,
	2, 8, 9, 3, 8, 8, 9, 7, 6, 9, 3, 2,
	2, 6, 8, 8, 8, 8, 5, 5, 3, 9, 6, 2,
	2, 3, 8, 6, 8, 8, 6, 3, 8, 7, 3, 2,
	2, 6, 7, 9, 3, 6, 5, 6, 6, 9, 5, 2,
	2, 7, 8, 8, 9, 9, 8, 8, 3, 6, 9, 2,
	2, 2, 2, 2, 2, 16, 2, 2, 2, 2, 2, 2

], [
	2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

]],
getTile: function (layer, col, row) {
	return this.layers[layer][row * map.cols + col];
},
isSolidTileAtXY: function (x, y) {
	var col = Math.floor(x / this.tsize);
	var row = Math.floor(y / this.tsize);
	// tiles 2, 16 and 17 are solid -- the rest are walkable
	// loop through all layers and return TRUE if any tile is solid
	return this.layers.reduce(function (res, layer, index) {
		var tile = this.getTile(index, col, row);
		var isSolid = tile === 2 || tile === 16 || tile === 17;
		return res || isSolid;
	}.bind(this), false);
},
getCol: function (x) {
	return Math.floor(x / this.tsize);
},
getRow: function (y) {
	return Math.floor(y / this.tsize);
},
getX: function (col) {
	return col * this.tsize;
},
getY: function (row) {
	return row * this.tsize;
}
};
//this loads the menu as the first map//
this.map.layers = this.Menumap.layers;
//resets everything//
function ResetAll()
{
	location.reload(); //reloads the page
}
//game://
//camera functions:// (since the map and camera are the same size there si no movement but if the map was bigger the camera would move)
function Camera(map, width, height) {
	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = height;
	this.maxX = map.cols * map.tsize - width;
	this.maxY = map.rows * map.tsize - height;
}
Camera.prototype.follow = function (sprite) {
	this.following = sprite;
	sprite.screenX = 0;
	sprite.screenY = 0;
};
Camera.prototype.update = function () {
	// assume followed sprite should be placed at the center of the screen
	// whenever possible
	this.following.screenX = this.width / 2;
	this.following.screenY = this.height / 2;

	// make the camera follow the sprite
	this.x = this.following.x - this.width / 2;
	this.y = this.following.y - this.height / 2;
	// clamp values
	this.x = Math.max(0, Math.min(this.x, this.maxX));
	this.y = Math.max(0, Math.min(this.y, this.maxY));

	// in map corners, the sprite cannot be placed in the center of the screen
	// and we have to change its screen coordinates

	// left and right sides
	if (this.following.x < this.width / 2 ||
		this.following.x > this.maxX + this.width / 2) {
		this.following.screenX = this.following.x - this.x;
	}
	// top and bottom sides
	if (this.following.y < this.height / 2 ||
		this.following.y > this.maxY + this.height / 2) {
		this.following.screenY = this.following.y - this.y;
	}
};
//Menu functions://
function Select(Choose, fx, fy)
{
	//converts the x and y into the map position
		var positionX =  (fx + map.tsize/2) /map.tsize;
		var positionY= (fy + map.tsize/2) /map.tsize;
		var position;
		position = positionY*12 -12 + positionX -1;
		//checks against the map and does a corresponding action
		if (Choose == 1)
		{
			if (position == 62)
			{
				gamestate = 1;
				locationset = true;
				this.Location = 3;
				this.Level = 1;
				this.map.layers = this.map1.layers;
				this.Game.tileAtlas = Loader.getImage('tiles');
			}
			else if(position == 74)
			{
				gamestate = 2;
				locationset = true;
				this.Location = 10;
				this.map.layers = this.Coopmap.layers;
				this.Level = 6;
				this.Game.tileAtlas = Loader.getImage('tiles');
			}
			else if(position == 86)
			{
				gamestate = 2;
				locationset = true;
				this.Location = 1;
				this.Level = 7;				
				this.map.layers = this.VSmap.layers;
				this.Game.tileAtlas = Loader.getImage('tiles');
			}
			else if(position == 98)
			{
				this.Level = 0;
				this.map.layers = this.Menumap.layers;
				this.Game.tileAtlas = Loader.getImage('Menu');
				this.Location = 0;	
				counter2=0;
				gamestate = 0; 	
				ResetAll();
			}
		}
	}
// makes the menu look nicer by changing the sprite temporarily
function Hover(Choose, Gx, Gy)
{
	var HoverpositionX =  (Gx + map.tsize/2) /map.tsize;
	var HoverpositionY= (Gy + map.tsize/2) /map.tsize;
	var Hoverposition;
	Hoverposition = HoverpositionY*12 -12 + HoverpositionX -1;
	//console.log(Hoverposition);
	if (this.map.layers[0][Hoverposition]==18){this.map.layers[0][Hoverposition]=19;}
	for (var i=0; i<144; i++)
	{
		if (this.map.layers[0][i]==19 && i != Hoverposition){this.map.layers[0][i]=18;}
	}

}
//rotates pipes://
function rotation(turn, fx, fy)
{
	//converts the x and y into the map position
	var positionX =  (fx + map.tsize/2) /map.tsize;
	var positionY= (fy + map.tsize/2) /map.tsize;
	var position;
	//console.log(positionY)
	//checks the position of the player and rotates the pipe they are on
	if (turn == 1)
	{	
		position = positionY*12 -12 + positionX -1;
		//console.log(this.map.layers[0][position]);
		if (this.map.layers[0][position]==3)
		{
			this.map.layers[0][position] = 6;
			//console.log(position);
		}
		else if(this.map.layers[0][position]==6)
		{
			this.map.layers[0][position] = 3;
			//console.log(position);
		}
		else if (this.map.layers[0][position]==4)
		{
			this.map.layers[0][position] = 9;
			//console.log("t");
		}
		else if (this.map.layers[0][position]==9)
		{
			this.map.layers[0][position] = 8;
			//console.log("t");
		}
		else if (this.map.layers[0][position]==8)
		{
			this.map.layers[0][position] = 7;
			//console.log("t");
		}
		else if (this.map.layers[0][position]==7)
		{
			this.map.layers[0][position] = 4;
			//console.log("t");
		}
		else if (this.map.layers[0][position]==11)
		{
			this.map.layers[0][position] = 3;
			//console.log("t");
		}
		else if (this.map.layers[0][position]==10)
		{
			this.map.layers[0][position] = 6;
			//console.log("t");
		}
		else if (this.map.layers[0][position]==12)
		{
			this.map.layers[0][position] = 9;
			//console.log("t");
		}
		else if (this.map.layers[0][position]==13)
		{
			this.map.layers[0][position] = 4;
			//console.log("t");
		}
		else if (this.map.layers[0][position]==14)
		{
			this.map.layers[0][position] = 7;
			//console.log("t");
		}
		else if (this.map.layers[0][position]==15)
		{
			this.map.layers[0][position] = 8;
			//console.log("t");
		}
		else if (this.map.layers[0][position]==5)
		{
			this.map.layers[0][position] = 5;
			//console.log("t");
		}
	}
}
//clears the map of water //(used to get rid of pipes with no connection)
function Empty()
{
	for (var i=0; i<144; i++)
	{
		if(this.map.layers[0][i]==11)
		{
			this.map.layers[0][i] = 6;
		}
		if(this.map.layers[0][i]==10)
		{
			this.map.layers[0][i] = 3;
		}
		if(this.map.layers[0][i]==12)
		{
			this.map.layers[0][i] = 4;
		}
		if(this.map.layers[0][i]==13)
		{
			this.map.layers[0][i] = 7;
		}
		if(this.map.layers[0][i]==14)
		{
			this.map.layers[0][i] = 8;
		}
		if(this.map.layers[0][i]==15)
		{
			this.map.layers[0][i] = 9;
		}
		if(this.map.layers[0][i]==19)
		{
			this.map.layers[0][i] = 5;
		}
		if(this.map.layers[0][i]==20)
		{
			this.map.layers[0][i] = 5;
		}
		if(this.map.layers[0][i]==21)
		{
			this.map.layers[0][i] = 5;
		}
	}

}
//checks if water her reached the end//
function WinCheck()
{
	if (this.map.layers[0][this.Location+12]  == 10||this.map.layers[0][this.Location+12]  == 13 ||this.map.layers[0][this.Location+12]  == 14||this.map.layers[0][this.Location+12]  == 19||this.map.layers[0][this.Location+12]  == 21)
	{
		//changes the map and sprites when needed
		if (counter2 > 99) //delay
			{
			//console.log(this.map.layers[0][2]);
			if (this.Level == 1)
			{
				this.Level = 2;
				this.map.layers = this.map2.layers;
				this.Game.tileAtlas = Loader.getImage('tiles2');
				this.Location = 4;
				counter2=0;
			}
			else if(this.Level == 2)
			{
				this.Level = 3;
				this.map.layers = this.map3.layers;
				this.Game.tileAtlas = Loader.getImage('tiles3');
				this.Location = 10;
				counter2=0;
			}
			else if(this.Level == 3)
			{
				this.Level = 4;
				this.map.layers = this.map4.layers;
				this.Game.tileAtlas = Loader.getImage('tiles4');
				this.Location = 10;
				counter2=0;
			}
			else if(this.Level == 4)
			{
				this.Level = 5;
				this.map.layers = this.map5.layers;
				this.Game.tileAtlas = Loader.getImage('tiles5');
				this.Location = 5;
				counter2=0;
			}
			else if(this.Level == 5)
			{
				this.Level = 1;
				this.map.layers = this.Win.layers;
				this.Game.tileAtlas = Loader.getImage('Menu');
				counter2=0;
				gamestate = 0;
				locationset = true;
			}
			else if(this.Level == 6)//coop win
			{
				gamestate = 0;
				locationset = true;
				this.Location = 0;
				this.Location2 = 0;		
				this.map.layers = this.Win.layers;
				this.level = 0;
				this.Game.tileAtlas = Loader.getImage('Menu');
			}
			else if(this.Level == 7) //vs win player 1
			{
				this.Level = 0;
				locationset = true;
				this.map.layers = this.P1Win.layers;
				this.Game.tileAtlas = Loader.getImage('Menu');
				this.Location = 0;
				this.Location2 = 0;					
				counter2=0;
				gamestate = 0; 	
			}
		}
		else{counter2++;}
	}//vs win player 2
	else if (Level == 7 && (this.map.layers[0][this.Location2+12]  == 10||this.map.layers[0][this.Location2+12]  == 13 ||this.map.layers[0][this.Location2+12]  == 14||this.map.layers[0][this.Location2+12]  == 19||this.map.layers[0][this.Location2+12]  == 21))
	{
			this.Level = 0;
			this.map.layers = this.P2Win.layers;
			this.Game.tileAtlas = Loader.getImage('Menu');
			counter2=0;
			gamestate = 0; 	
	}
	else
	{
		this.map.layers[0][Location]  = 17; //ensures that the goal is empty if it has no connection
	}
}
//stores the values for the two players
function Hero(map, x, y) {
	this.map = map;
	this.x = x;
	this.y = y;
	this.width = map.tsize;
	this.height = map.tsize;
	if (Players == 1)//loads the sprite for player 1
	{
		this.image = Loader.getImage('hero');
		Players++;
	}//loads the sprite for player 2
	else {this.image = Loader.getImage('Player2');}
	}
function Player2(map, x, y) {
	this.map = map;
	this.Player2x = x;
	this.Player2y = y;
	this.Player2width = map.tsize;
	this.Player2height = map.tsize;

	this.image = Loader.getImage('Player2');
}
//speed value set://
Hero.SPEED = 256; // pixels per second
Player2.SPEED = 256;

///movement and collision//
Hero.prototype.move = function (delta, dirx, diry) {
	// move hero
	this.x += dirx * map.tsize;
	this.y += diry * map.tsize;
	if (gamestate == 1 || gamestate == 0){sleep(50);}
	else if (gamestate == 2){sleep(50);}//adds a delay so that the players can be controlled
	//console.log(this.x);

	// check if we walked into a non-walkable tile
	this._collide(dirx, diry);

	// clamp values
	var maxX = this.map.cols * this.map.tsize;
	var maxY = this.map.rows * this.map.tsize;
	this.x = Math.max(0, Math.min(this.x, maxX));
	this.y = Math.max(0, Math.min(this.y, maxY));

	
};
Hero.prototype._collide = function (dirx, diry) {
	var row, col;
	var left = this.x - this.width / 2;
	var right = this.x + this.width / 2 - 1;
	var top = this.y - this.height / 2;
	var bottom = this.y + this.height / 2 - 1;

	// check for collisions on sprite sides
	var collision =
		this.map.isSolidTileAtXY(left, top) ||
		this.map.isSolidTileAtXY(right, top) ||
		this.map.isSolidTileAtXY(right, bottom) ||
		this.map.isSolidTileAtXY(left, bottom);
	if (!collision) { return; }

	if (diry > 0) {
		row = this.map.getRow(bottom);
		this.y = -this.height / 2 + this.map.getY(row);
	}
	else if (diry < 0) {
		row = this.map.getRow(top);
		this.y = this.height / 2 + this.map.getY(row + 1);
	}
	else if (dirx > 0) {
		col = this.map.getCol(right);
		this.x = -this.width / 2 + this.map.getX(col);
	}
	else if (dirx < 0) {
		col = this.map.getCol(left);
		this.x = this.width / 2 + this.map.getX(col + 1);
	}
};



//This method deals with the movement of both players.//
Game.update = function (delta) {
	var dirx = 0;
	var diry = 0;
	var dirx2 = 0;
	var diry2 = 0;
	var turn = 0;
	//Player 1 movement
	if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1;}
	else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1;}
	else if (Keyboard.isDown(Keyboard.UP)) { diry = -1;}
	else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1;}
	//Player 2 movement
	if (Keyboard.isDown(Keyboard.LEFT2)) { dirx2 = -1;}
	else if (Keyboard.isDown(Keyboard.RIGHT2)) { dirx2 = 1;}
	else if (Keyboard.isDown(Keyboard.UP2)) { diry2 = -1;}
	else if (Keyboard.isDown(Keyboard.DOWN2)) { diry2 = 1;}
	//E and Enter inputs:
	if (Keyboard.isDown(Keyboard.E)){turn =1; rotateP=1;}
	if (Keyboard.isDown(Keyboard.E2)){turn =1;rotateP=2;}
	if (Keyboard.isDown(Keyboard.E2) && Keyboard.isDown(Keyboard.E)){turn =1;rotateP=3;}
	//calls movement function:
	this.player2.move(delta, dirx2, diry2);
	this.hero.move(delta, dirx, diry);
	//calls different function depending on the game state.
	if (gamestate == 0)
	{
		if (locationset ==true)//resets X and Y for both players
		{
		this.hero.x = 3*map.tsize - map.tsize/2;
		this.hero.y = 3*map.tsize - map.tsize/2;
		this.player2.x = 1*map.tsize - map.tsize/2;
		this.player2.y = 1*map.tsize - map.tsize/2;
		locationset = false;
		}
		//Menu functions:
		Hover(turn, this.hero.x, this.hero.y);
		Select(turn, this.hero.x, this.hero.y);
		this.camera.update();
	}
	else if (gamestate ==1)
	{
		if (locationset ==true)//resets X and Y for both players
		{
		this.hero.x = 3*map.tsize - map.tsize/2;
		this.hero.y = 3*map.tsize - map.tsize/2;
		this.player2.x = 1*map.tsize - map.tsize/2;
		this.player2.y = 1*map.tsize - map.tsize/2;
		locationset = false;
		}
		//Single player functions:
		if (rotateP==1){rotation(turn, this.hero.x,this.hero.y);rotateP=0;}
		else{}
		Empty();
		PipeCheck();
		this.camera.update();
		if (Keyboard.isDown(Keyboard.ESC)){Escape()}
	}
	else if (gamestate ==2)
	{
		if (locationset ==true)//resets X and Y for both players
		{
		this.hero.x = 3*map.tsize - map.tsize/2;
		this.hero.y= 3*map.tsize - map.tsize/2;
		this.player2.x=9*map.tsize - map.tsize/2;
		this.player2.y=3*map.tsize - map.tsize/2;
		locationset = false;
		}
		//COOP and VS functions:
		if (rotateP==1){rotation(turn, this.hero.x,this.hero.y);rotateP=0;}
		else if(rotateP==2) {rotation(turn, this.player2.x,this.player2.y);rotateP=0;}
		else
		{
			rotation(turn, this.player2.x,this.player2.y);rotateP=0;
			rotation(turn, this.hero.x,this.hero.y);rotateP=0
		}
		Empty();
		PipeCheck();
		this.camera.update();
		if (Keyboard.isDown(Keyboard.ESC)){Escape()}
	}
};
//goes back to the menu at any point
function Escape()
{
	this.Level = 0;
	this.map.layers = this.Menumap.layers;
	this.Game.tileAtlas = Loader.getImage('Menu');
	counter2=0;
	gamestate = 0;
	locationset = true;
	ResetAll();
}
//draws the game://
Game._drawLayer = function (layer) {
	var startCol = Math.floor(this.camera.x / map.tsize);
	var endCol = startCol + (this.camera.width / map.tsize);
	var startRow = Math.floor(this.camera.y / map.tsize);
	var endRow = startRow + (this.camera.height / map.tsize);
	var offsetX = -this.camera.x + startCol * map.tsize;
	var offsetY = -this.camera.y + startRow * map.tsize;

	for (var c = startCol; c <= endCol; c++) {
		for (var r = startRow; r <= endRow; r++) {
			var tile = map.getTile(layer, c, r);
			var x = (c - startCol) * map.tsize + offsetX;
			var y = (r - startRow) * map.tsize + offsetY;
			if (tile !== 0) { // 0 => empty tile
				this.ctx.drawImage(
					this.tileAtlas, // image
					(tile - 1) * map.tsize, // source x
					0, // source y
					map.tsize, // source width
					map.tsize, // source height
					Math.round(x),  // target x
					Math.round(y), // target y
					map.tsize, // target width
					map.tsize // target height
				);
			}
		}
	}
};

Game._drawGrid = function () {
		var width = map.cols * map.tsize;
	var height = map.rows * map.tsize;
	var x, y;
	for (var r = 0; r < map.rows; r++) {
		x = - this.camera.x;
		y = r * map.tsize - this.camera.y;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(width, y);
		this.ctx.stroke();
	}
	for (var c = 0; c < map.cols; c++) {
		x = c * map.tsize - this.camera.x;
		y = - this.camera.y;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x, height);
		this.ctx.stroke();
	}
};

Game.render = function () {

	// draw map background layer
	this._drawLayer(0);
	
	// draw main character
	this.ctx.drawImage(
		this.hero.image,
		this.hero.screenX - this.hero.width / 2,
		this.hero.screenY - this.hero.height / 2);
	this.ctx.drawImage(
		this.player2.image,
		this.player2.x - this.player2.width / 2,
		this.player2.y - this.player2.height / 2);
	// draw map top layer
	this._drawLayer(1);

	this._drawGrid();
};

//fills the pipes if there is a connection with water: (first to last)//
function PipeCheck()
{
	if (counter < 10){
	for (var i=0; i<200; i++)
	{	
		//console.log("left");
		//type6
		//left/right
		if (this.map.layers[0][i]==6 || this.map.layers[0][i]==11)
		{
			if (this.map.layers[0][i-1]==16)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i-1]==11)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i-1]==12)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i-1]==13)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==16)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==11)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==14)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==15)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i-1]==20)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==20)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i-1]==21)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==21)
			{
				this.map.layers[0][i] = 11;
			}
			else{
				this.map.layers[0][i] = 6;
			}
		}
		//type5
		//one fill
		if (this.map.layers[0][i]==5)
		{
			if (this.map.layers[0][i-1]==16)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i-1]==11)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i-1]==12)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i-1]==13)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i+1]==16)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i+1]==11)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i+1]==14)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i+1]==15)
			{
				this.map.layers[0][i] = 20;
			}
			if (this.map.layers[0][i-12]==16)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i-12]==10)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i-12]==12)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i-12]==15)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==16)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==10)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==13)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==14)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i-1]==21)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i+1]==21)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i-12]==21)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==21)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i-12]==19)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==19)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+1]==20)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i-1]==20)
			{
				this.map.layers[0][i] = 20;
			}
		}
		//both from 19
		if (this.map.layers[0][i]==19)
		{
			if (this.map.layers[0][i-1]==16)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-1]==11)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-1]==12)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-1]==13)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==16)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==11)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==14)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==15)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-1]==21)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==21)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==20)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-1]==20)
			{
				this.map.layers[0][i] = 21;
			}
		}
		//both from 20
		if (this.map.layers[0][i]==20)
		{
			if (this.map.layers[0][i-12]==16)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-12]==10)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-12]==12)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-12]==15)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==16)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==10)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==13)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==14)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-12]==21)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==21)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==19)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-12]==19)
			{
				this.map.layers[0][i] = 21;
			}
		}
		//type3
		//up/down
		if (this.map.layers[0][i]==3 ||this.map.layers[0][i]==10)
		{
			if (this.map.layers[0][i-12]==16)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i-12]==10)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i-12]==12)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i-12]==15)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12]==16)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12] == 10)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12]==13)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12]==14)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i-12]==19)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12]==19)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i-12]==21)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12]==21)
			{
				this.map.layers[0][i] = 10;
			}
			else{
				this.map.layers[0][i] = 3;
			}
		}
		//type4
		//down/right
		if (this.map.layers[0][i]==4 || this.map.layers[0][i]==12)
		{
			if (this.map.layers[0][i+12]==16)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+12]==10)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+12]==13)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+12]==14)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==16)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==11)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==14)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==15)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==21)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+12]==21)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==20)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+12]==19)
			{
				this.map.layers[0][i] = 12;
			}
			else
			{
				this.map.layers[0][i] = 4;
			}
		}
		//type7
		//up/right
		if (this.map.layers[0][i]==7 || this.map.layers[0][i]==13)
		{
			if (this.map.layers[0][i-12]==16)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i-12]==10)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i-12]==12)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i-12]==15)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==16)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==11)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==14)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==15)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==21)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i-12]==21)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==20)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i-12]==19)
			{
				this.map.layers[0][i] = 13;
			}
			else
			{
				this.map.layers[0][i] = 7;
			}
		}
		//type8
		//left/up
		if (this.map.layers[0][i]==8 || this.map.layers[0][i]==14)
		{
			if (this.map.layers[0][i-1]==16)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-1]==11)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-1]==12)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-1]==13)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==16)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==10)
			{	
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==12)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==15)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-1]==21)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==21)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-1]==20)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==19)
			{
				this.map.layers[0][i] = 14;
			}
			else
			{
				this.map.layers[0][i] = 8;
			}
		}
		//type9
		//down/left
		if (this.map.layers[0][i]==9 || this.map.layers[0][i]==15)
		{	
			//console.log(this.map.layers[0][i+12])
			if (this.map.layers[0][i+12]==16)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i+12]==10)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i+12]==13)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i+12]==14)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==16)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==11)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==12)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==13)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==21)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i+12]==21)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==20)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i+12]==19)
			{
				this.map.layers[0][i] = 15;
			}
			else
			{
				this.map.layers[0][i] = 9;
			}
		}
	}
	this.counter++;
	PipeC();
	}
	else
	{
		this.counter = 0;
	}
	WinCheck();
}
//fills the pipes from the last to first//
function PipeC()
{
for (var i=0; i<200; i++)
	{	
		//console.log("left");
		//type6
		//left/right
		if (this.map.layers[0][i]==6 || this.map.layers[0][i]==11)
		{
			if (this.map.layers[0][i-1]==16)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i-1]==11)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i-1]==12)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i-1]==13)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==16)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==11)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==14)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==15)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i-1]==20)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==20)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i-1]==21)
			{
				this.map.layers[0][i] = 11;
			}
			else if (this.map.layers[0][i+1]==21)
			{
				this.map.layers[0][i] = 11;
			}
			else{
				this.map.layers[0][i] = 6;
			}
		}
		//type5
		//one fill
		if (this.map.layers[0][i]==5)
		{
			if (this.map.layers[0][i-1]==16)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i-1]==11)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i-1]==12)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i-1]==13)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i+1]==16)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i+1]==11)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i+1]==14)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i+1]==15)
			{
				this.map.layers[0][i] = 20;
			}
			if (this.map.layers[0][i-12]==16)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i-12]==10)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i-12]==12)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i-12]==15)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==16)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==10)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==13)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==14)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i-1]==21)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i+1]==21)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i-12]==21)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==21)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i-12]==19)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+12]==19)
			{
				this.map.layers[0][i] = 19;
			}
			else if (this.map.layers[0][i+1]==20)
			{
				this.map.layers[0][i] = 20;
			}
			else if (this.map.layers[0][i-1]==20)
			{
				this.map.layers[0][i] = 20;
			}
		}
		//both from 19
		if (this.map.layers[0][i]==19)
		{
			if (this.map.layers[0][i-1]==16)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-1]==11)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-1]==12)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-1]==13)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==16)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==11)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==14)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==15)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-1]==21)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==21)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+1]==20)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-1]==20)
			{
				this.map.layers[0][i] = 21;
			}
		}
		//both from 20
		if (this.map.layers[0][i]==20)
		{
			if (this.map.layers[0][i-12]==16)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-12]==10)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-12]==12)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-12]==15)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==16)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==10)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==13)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==14)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-12]==21)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==21)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i+12]==19)
			{
				this.map.layers[0][i] = 21;
			}
			else if (this.map.layers[0][i-12]==19)
			{
				this.map.layers[0][i] = 21;
			}
		}
		//type3
		//up/down
		if (this.map.layers[0][i]==3 ||this.map.layers[0][i]==10)
		{
			if (this.map.layers[0][i-12]==16)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i-12]==10)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i-12]==12)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i-12]==15)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12]==16)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12] == 10)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12]==13)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12]==14)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i-12]==19)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12]==19)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i-12]==21)
			{
				this.map.layers[0][i] = 10;
			}
			else if (this.map.layers[0][i+12]==21)
			{
				this.map.layers[0][i] = 10;
			}
			else{
				this.map.layers[0][i] = 3;
			}
		}
		//type4
		//down/right
		if (this.map.layers[0][i]==4 || this.map.layers[0][i]==12)
		{
			if (this.map.layers[0][i+12]==16)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+12]==10)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+12]==13)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+12]==14)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==16)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==11)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==14)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==15)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==21)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+12]==21)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+1]==20)
			{
				this.map.layers[0][i] = 12;
			}
			else if (this.map.layers[0][i+12]==19)
			{
				this.map.layers[0][i] = 12;
			}
			else
			{
				this.map.layers[0][i] = 4;
			}
		}
		//type7
		//up/right
		if (this.map.layers[0][i]==7 || this.map.layers[0][i]==13)
		{
			if (this.map.layers[0][i-12]==16)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i-12]==10)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i-12]==12)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i-12]==15)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==16)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==11)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==14)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==15)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==21)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i-12]==21)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i+1]==20)
			{
				this.map.layers[0][i] = 13;
			}
			else if (this.map.layers[0][i-12]==19)
			{
				this.map.layers[0][i] = 13;
			}
			else
			{
				this.map.layers[0][i] = 7;
			}
		}
		//type8
		//left/up
		if (this.map.layers[0][i]==8 || this.map.layers[0][i]==14)
		{
			if (this.map.layers[0][i-1]==16)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-1]==11)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-1]==12)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-1]==13)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==16)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==10)
			{	
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==12)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==15)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-1]==21)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==21)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-1]==20)
			{
				this.map.layers[0][i] = 14;
			}
			else if (this.map.layers[0][i-12]==19)
			{
				this.map.layers[0][i] = 14;
			}
			else
			{
				this.map.layers[0][i] = 8;
			}
		}
		//type9
		//down/left
		if (this.map.layers[0][i]==9 || this.map.layers[0][i]==15)
		{	
			//console.log(this.map.layers[0][i+12])
			if (this.map.layers[0][i+12]==16)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i+12]==10)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i+12]==13)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i+12]==14)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==16)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==11)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==12)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==13)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==21)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i+12]==21)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i-1]==20)
			{
				this.map.layers[0][i] = 15;
			}
			else if (this.map.layers[0][i+12]==19)
			{
				this.map.layers[0][i] = 15;
			}
			else
			{
				this.map.layers[0][i] = 9;
			}
		}
	}
	PipeCheck();
}
