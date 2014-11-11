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

var PLAYER_CAMERA_DIST = 200;
var GRAVITY = 1500;

var Game = function(game) {
    this.level = null;
    this.hud = null;
    this.music = null;
};

Game.prototype = {
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = GRAVITY;
        this.deltaCap = 0.032;

        this.level = new Level(this);
        this.level.create();

        this.hud = new HUD(this);
        this.hud.create();

        initMissiles(this);

        this.music = this.add.audio("musTest", 0.05, true);
        //this.music.play();
    },

    update: function() {
        // Update player
        this.level.update();
        this.hud.update();
        updateMissiles(this.level.layerCollision);
    }
};
