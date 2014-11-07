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

/* When player is pressing space, set gravity to 1/2 of normal gravity. This makes it so the player jumps higher when space is held, gives a gliding effect and much more realistic jumps when holding space (no linear "going-up" phases) */

var Player = function(game) {
    this.game = game;
    this.player = null;
};

Player.prototype = {
    create: function() {
        this.player = this.game.add.sprite(0, 0, "player");
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    }
};
