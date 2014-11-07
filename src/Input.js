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

var Input = function(game) {
    this.game = game;
};

Input.prototype = {
    create: function() {
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.A,
            Phaser.Keyboard.D,
            Phaser.Keyboard.SPACE,
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.SHIFT,
            Phaser.Keyboard.DOWN
        ]);
    },

    pressedLeft: function() {
        var isDown = false;
        isDown = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) |
            this.game.input.keyboard.isDown(Phaser.Keyboard.A);
        return isDown;
    },

    pressedRight: function() {
        var isDown = false;
        isDown = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) |
            this.game.input.keyboard.isDown(Phaser.Keyboard.D);
        return isDown;
    },

    pressedUp: function() {
        var isDown = false;
        isDown = this.game.input.keyboard.isDown(Phaser.Keyboard.UP) |
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
        return isDown;
    },

    pressedRun: function() {
        var isDown = false;
        isDown = this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) |
            this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT);
        return isDown;
    }
};
