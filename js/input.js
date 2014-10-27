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

// Include all input stuff here

function initInput() {
    game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.A,
        Phaser.Keyboard.D,
        Phaser.Keyboard.SPACEBAR,
        Phaser.Keyboard.SHIFT
    ]);
}

function isLeftKeyDown() {
    var isDown = false;
    isDown = game.input.keyboard.isDown(Phaser.Keyboard.A);
    return isDown;
}

function isRightKeyDown() {
    var isDown = false;
    isDown = game.input.keyboard.isDown(Phaser.Keyboard.D);
    return isDown;
}

function isUpKeyDown() {
    var isDown = false;
    isDown = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    return isDown;
}

function isRunKeyDown() {
    var isDown = false;
    isDown = game.input.keyboard.isDown(Phaser.Keyboard.SHIFT);
    return isDown;
}

function getMouseX() {
	var coord = 0;
	coord = game.input.x;
	return coord;
}

function getMouseY() {
	var coord = 0;
	coord = game.input.y;
	return coord;
}

function isFireKeyDown() {
	var isDown = false;
	isDown = game.input.activePointer.isDown;
	return isDown;
}