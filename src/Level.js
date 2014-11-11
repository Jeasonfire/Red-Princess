/*
 * Project Red Princess is an action platformer game.
 * Copyright (C) 2014 Jens "Jeasonfire" Pitkänen
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var PLAYER_ID = 17;
var GUARD_ID = 18;

var Level = function(game) {
    this.game = game;
    this.map = null;
    this.layerBack = null;
    this.layerCollision = null;
    this.layerFront = null;
    this.objs = [];
    this.player = null;
};

Level.prototype = {
    create: function() {
        this.map = this.game.add.tilemap("map");
        this.map.addTilesetImage("tileset");
        this.map.setCollisionByExclusion([], true, "Mid");
        // Background layer
        this.layerBack = this.map.createLayer("Back", this.map.widthInPixels, this.map.heightInPixels);
        this.layerBack.fixedToCamera = false;
        // Collision layer
        this.layerCollision = this.map.createLayer("Mid", this.map.widthInPixels, this.map.heightInPixels);
        this.layerCollision.fixedToCamera = false;
        this.layerCollision.resizeWorld();
        // Foreground layer
        this.layerFront = this.map.createLayer("Front", this.map.widthInPixels, this.map.heightInPixels);
        this.layerFront.fixedToCamera = false;

        this.spawnObjects(this.layerCollision);
    },

    spawnObjects: function(layer) {
        //this.createPlayer(100, 100);
        for (var x = 0; x < this.map.width; x++) {
            for (var y = 0; y < this.map.height; y++) {
                this.spawnObject(x * this.map.tileWidth, y * this.map.tileHeight, this.map.getTile(x, y, layer, true).index, layer);
            }
        }
    },

    spawnObject: function(x, y, index, layer) {
        if (index == PLAYER_ID) {
            this.createPlayer(x, y);
            this.map.removeTile(x / this.map.tileWidth, y / this.map.tileHeight, layer);
        }
        if (index == GUARD_ID) {
            this.createEnemy(x, y, "guard");
            this.map.removeTile(x / this.map.tileWidth, y / this.map.tileHeight, layer);
        }
    },

    update: function() {
        for (var i = 0; i < this.objs.length; i++) {
            this.objs[i].update(this.layerCollision);
        }
    },

    createPlayer: function(x, y) {
        this.player = new Player(this.game);
        this.player.create(x, y);
        this.cameraFollow(this.player.sprite);
        this.objs.push(this.player);
    },

    createEnemy: function(x, y, name) {
        var enemy = new Guard(this.game);
        enemy.create(x, y, name);
        this.objs.push(enemy);
    },

    cameraFollow: function(obj) {
        this.game.camera.follow(obj, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
        this.game.camera.deadzone.height *= 0.75;
    }
};
