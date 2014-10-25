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
 
function update() {
    // Physics
    game.physics.arcade.collide(player, layerPlayer);

    // Controls
    // Running
    var playerVel = PLAYER_SPEED;
    if (isRunKeyDown()) {
        playerVel = PLAYER_SPEED_RUN;
    }
    // Left/right movement
    if (isLeftKeyDown() && !isRightKeyDown()) {
        player.body.velocity.x = -playerVel;
    } else if (isRightKeyDown() && !isLeftKeyDown()) {
        player.body.velocity.x = playerVel;
    } else {
        player.body.velocity.x = 0;
    }
    // Jumping
    if (isUpKeyDown() && player.body.onFloor()) {
        player.body.velocity.y = PLAYER_JUMP_SPEED;
        playerJumpTime = game.time.now + PLAYER_JUMP_HOLD_TIME;
    }
    if (isUpKeyDown() && !player.body.onFloor() && game.time.now < playerJumpTime) {
        player.body.velocity.y = PLAYER_JUMP_SPEED;
    }

    // Animations
    var velX = player.body.velocity.x;
    var velY = player.body.velocity.y;
    var inAir = !player.body.onFloor();
    var lastPlayerDir = playerDir;

    if (velX < 0) {
        // Moving left
        if (playerDir != "moveLeft" && velX == -PLAYER_SPEED && !inAir) {
            playerDir = "moveLeft";
        } else if (playerDir != "runLeft" && velX == -PLAYER_SPEED_RUN && !inAir) {
            playerDir = "runLeft";
        } else if (playerDir != "jumpLeft" && velX == -PLAYER_SPEED && inAir) {
            playerDir = "jumpLeft";
        } else if (playerDir != "flyLeft" && velX == -PLAYER_SPEED_RUN && inAir) {
            playerDir = "flyLeft";
        }
    } else if (velX > 0) {
        // Moving right
        if (playerDir != "moveRight" && velX == PLAYER_SPEED && !inAir) {
            playerDir = "moveRight";
        } else if (playerDir != "runRight" && velX == PLAYER_SPEED_RUN && !inAir) {
            playerDir = "runRight";
        } else if (playerDir != "jumpRight" && velX == PLAYER_SPEED && inAir) {
            playerDir = "jumpRight";
        } else if (playerDir != "flyRight" && velX == PLAYER_SPEED_RUN && inAir) {
            playerDir = "flyRight";
        }
    } else {
        // Standing still
        if (playerDir != "standStill" && !inAir) {
            playerDir = "standStill";
        } else if (playerDir != "jumpStill" && inAir) {
            playerDir = "jumpStill";
        }
    }
    // If animation changed, play it
    if (lastPlayerDir != playerDir) {
        player.animations.play(playerDir);
    }

    // Focus camera on player
    game.camera.focusOnXY(player.body.x + 32, player.body.y + 32);
}