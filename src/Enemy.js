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

var Enemy = function(game, name) {
    this.game = game;
    this.name = name;
    this.sprite = null;
};

Enemy.prototype = {
    create: function(x, y) {
        this.sprite = this.game.add.sprite(x, y, this.name);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.maxVelocity.setTo(MAX_VEL, MAX_VEL);
        this.init();
    },

    init: function() {
        // Override
    },

    update: function(layer) {
        this.game.physics.arcade.collide(this.sprite, layer);
        this.updateAI();
        this.updateAnim();
    },

    updateAI: function() {
        // Override
    },

    updateAnim: function() {
        // Override
    }
};
