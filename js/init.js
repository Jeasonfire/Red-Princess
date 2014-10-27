/*
 *  Red Princess is an action platformer game.
 *  Copyright (C) 2014 Jens "Jeasonfire" Pitkänen

 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.

 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.

 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

 // Initialize everything and start the game here

 // Map
var map;
var layerBackground;
var layerPlayer;
var layerForeground;

// Player
var player;

// Constants
var PLAYER_MAX_FALLING_SPEED = 900;
var GRAVITY = 2600;

// Controls var leftButton; var rightButton; var jumpButton;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#000000";

    // Map
    map = game.add.tilemap("level");
    map.addTilesetImage("sheet");
    map.setCollisionByExclusion([], true, "Player");
    // Background layer
    layerBackground = map.createLayer("Background", map.widthInPixels, map.heightInPixels);
    layerBackground.fixedToCamera = false;
    // Collide layer
    layerPlayer = map.createLayer("Player", map.widthInPixels, map.heightInPixels);
    layerPlayer.fixedToCamera = false;
    layerPlayer.resizeWorld();
    // Foreground layer
    layerForeground = map.createLayer("Foreground", map.widthInPixels, map.heightInPixels);
    layerForeground.fixedToCamera = false;

    // Player
    player = game.add.sprite(0, 0, "player");
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.animations.add("moveRight", [0, 1, 2, 1], 6, true);
    player.animations.add("moveLeft", [5, 4, 3, 4], 6, true);
    player.animations.add("standStill", [6], 10, true);
    player.animations.add("jumpRight", [7, 8, 9, 8], 9, true);
    player.animations.add("jumpLeft", [12, 11, 10, 11], 9, true);
    player.animations.add("jumpStill", [13, 14, 15], 9, true);
    player.animations.add("runRight", [16, 17, 18, 17], 11, true);
    player.animations.add("runLeft", [21, 20, 19, 20], 11, true);
    player.animations.add("flyRight", [22, 23, 24, 23], 11, true);
    player.animations.add("flyLeft", [27, 26, 25, 26], 11, true);
    player.animations.add("fireRight0", [28, 29, 30, 30, 31], 12, false);
    player.animations.add("fireRight1", [32, 33, 34, 34, 35], 12, false);
    player.animations.add("fireLeft0", [43, 42, 41, 41, 40], 12, false);
    player.animations.add("fireLeft1", [39, 38, 37, 37, 36], 12, false);
    player.animations.add("fireMoveRight0", [44, 45, 46, 46, 47], 12, false);
    player.animations.add("fireMoveRight1", [48, 49, 50, 50, 51], 12, false);
    player.animations.add("fireMoveLeft0", [59, 58, 57, 57, 56], 12, false);
    player.animations.add("fireMoveLeft1", [55, 54, 53, 53, 52], 12, false);
    player.body.setSize(48, 116, 40, 12);
    player.body.maxVelocity.y = PLAYER_MAX_FALLING_SPEED;
    player.frame = 6;

    // Gravity
    game.physics.arcade.gravity.y = GRAVITY;

    initInput();
}

function spawnPlayer() {
	var spawnTile = map.searchTileIndex(1, 0, false, layerPlayer);
	player.position.setTo(spawnTile.x * map.tileWidth, spawnTile.y * map.tileHeight);
	map.removeTile(spawnTile.x, spawnTile.y, layerPlayer);
}