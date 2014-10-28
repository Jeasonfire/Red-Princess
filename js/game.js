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

// Include all runtime things here

var firstUpdate = true;

function update() {
    handleFirstUpdate();
    handleCollisions();
    updateInputs();
    otherActions();
    animate();
    updateCamera();
}

function handleFirstUpdate() {
    if (!firstUpdate) {
        return;
    }
    firstUpdate = false;
    spawnPlayer();
}

function handleCollisions() {
    game.physics.arcade.collide(player, layerPlayer);
}

function updateInputs() {
    playerInput();
}

function otherActions() {
    playerUpdate();
}

function animate() {
    playerAnimate();
}

function updateCamera() {
    game.camera.focusOnXY(player.body.x + player.body.width / 2, player.body.y);
}