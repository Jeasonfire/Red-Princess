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

var Level = function(game) {
    this.game = game;
    this.map = null;
};

Level.prototype = {
    create: function() {
        this.map = this.game.add.tilemap("map");
        map.addTilesetImage("tileset");
    },

    update: function(player) {
        this.game.physics.arcade.collide(player/*, layer*/);
    }
};
