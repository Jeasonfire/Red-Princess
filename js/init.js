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
var layerKill;
var layerForeground;

// Player
var player;

// Constants
var PLAYER_MAX_FALLING_SPEED = 950;
var GRAVITY = 1500;

// Controls var leftButton; var rightButton; var jumpButton;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.time.deltaCap = 0.032;
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
    // Collide layer
    layerKill = map.createLayer("Kill", map.widthInPixels, map.heightInPixels);
    layerKill.fixedToCamera = false;
    game.physics.arcade.overlap(player, layerKill, playerDie);
    // Foreground layer
    layerForeground = map.createLayer("Foreground", map.widthInPixels, map.heightInPixels);
    layerForeground.fixedToCamera = false;

    // Player
    player = game.add.sprite(0, 0, "player");
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    // Basic anims
    player.animations.add("walkright", [0, 1, 2, 1], 6, true);
    player.animations.add("walkleft", [5, 4, 3, 4], 6, true);
    player.animations.add("standstill", [6], 10, true);
    player.animations.add("dead", [56, 57, 58], 5, false);
    // Jump anims
    player.animations.add("jumpright", [7, 8, 9, 8], 9, true);
    player.animations.add("jumpleft", [12, 11, 10, 11], 9, true);
    player.animations.add("jumpstill", [13, 14, 15], 9, true);
    // Run anims
    player.animations.add("runright", [16, 17, 18, 17], 11, true);
    player.animations.add("runleft", [21, 20, 19, 20], 11, true);
    // Fly anims
    player.animations.add("flyright", [22, 23, 24, 23], 11, true);
    player.animations.add("flyleft", [27, 26, 25, 26], 11, true);
    // Fire anims
    player.animations.add("fireright0", [28, 29, 30, 30, 31], 12, false);
    player.animations.add("fireright1", [32, 33, 34, 34, 35], 12, false);
    player.animations.add("fireleft0", [43, 42, 41, 41, 40], 12, false);
    player.animations.add("fireleft1", [39, 38, 37, 37, 36], 12, false);
    player.animations.add("firewalkright0", [44, 45, 46, 46, 47], 12, false);
    player.animations.add("firewalkright1", [48, 49, 50, 50, 51], 12, false);
    player.animations.add("firewalkleft0", [59, 58, 57, 57, 56], 12, false);
    player.animations.add("firewalkleft1", [55, 54, 53, 53, 52], 12, false);

    // Set player variables
    player.body.maxVelocity.y = PLAYER_MAX_FALLING_SPEED;
    player.body.setSize(36, 87, 30, 9);//(12, 29, 10, 3);
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