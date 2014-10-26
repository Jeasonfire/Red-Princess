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

var projectileTime = 0;
var projectileFired = false;
var projectileDirection = "";
var projectileName = "";
var spawn = true;
var playerThrowingHand = 0;
var running = false;

function update() {
    if (spawn) {
        spawn = false;
        spawnPlayer();
    }

    // Physics
    game.physics.arcade.collide(player, layerPlayer);

    // Controls
    var canFire = true;
    // Running
    if (isRunKeyDown() && player.body.onFloor()) {
        playerSpeed = PLAYER_SPEED_RUN;
        running = true;
    } else if (player.body.onFloor()) {
    	playerSpeed = PLAYER_SPEED;
        running = false;
    }
    // Left/right movement
    if (isLeftKeyDown() && !isRightKeyDown()) {
        player.body.velocity.x = -playerSpeed;
    } else if (isRightKeyDown() && !isLeftKeyDown()) {
        player.body.velocity.x = playerSpeed;
    } else {
        player.body.velocity.x = 0;
    }
    // Jumping
    if (isUpKeyDown() && player.body.onFloor()) {
        player.body.velocity.y = PLAYER_JUMP_SPEED;
        playerJumpTime = game.time.now + PLAYER_JUMP_HOLD_TIME;
        canFire = false;
    }
    if (isUpKeyDown() && !player.body.onFloor() && game.time.now < playerJumpTime) {
        player.body.velocity.y = PLAYER_JUMP_SPEED;
        canFire = false;
    }
    // Firing
    var firingDirection = "notFiring";
    canFire &= isFireKeyDown() && player.body.onFloor() && !running && 
        (playerDir == "standStill" || playerDir == "moveRight" || 
        playerDir == "moveLeft" ||
        player.animations.getAnimation("fireLeft0").isFinished ||
        player.animations.getAnimation("fireRight0").isFinished ||
        player.animations.getAnimation("fireLeft1").isFinished ||
        player.animations.getAnimation("fireRight1").isFinished);
    var firingLeft = player.animations.getAnimation("fireLeft0").isPlaying ||
        player.animations.getAnimation("fireLeft1").isPlaying;
    var firingRight = player.animations.getAnimation("fireRight0").isPlaying ||
        player.animations.getAnimation("fireRight1").isPlaying;
    var firingMoveLeft = (player.animations.getAnimation("fireMoveLeft0").isPlaying ||
        player.animations.getAnimation("fireMoveLeft1").isPlaying);
    var firingMoveRight = (player.animations.getAnimation("fireMoveRight0").isPlaying ||
        player.animations.getAnimation("fireMoveRight1").isPlaying);
    if (canFire || firingLeft || firingRight || firingMoveLeft || firingMoveRight) {
        if (firingLeft || firingRight || firingMoveLeft || firingMoveRight) {
            if (firingLeft) {
                firingDirection = "fireLeft";
            }
            if (firingRight) {
                firingDirection = "fireRight";
            }
            if (firingMoveLeft) {
                firingDirection = "fireMoveLeft";
            }
            if (firingMoveRight) {
                firingDirection = "fireMoveRight";
            }
        } else {
            var angle = getAngleAtPointer(player.body.x - game.camera.x - 128, 
                    player.body.y - game.camera.y);
            if (angle < 90 || angle > 270) {
                if (playerDir == "moveRight" || playerDir == "moveLeft" ||
                        playerDir == "fireMoveRight0" || playerDir == "fireMoveRight1" ||
                        playerDir == "fireMoveLeft0" || playerDir == "fireMoveLeft1") {
                    firingDirection = "fireMoveRight";
                } else {
                    firingDirection = "fireRight";
                }
                projectileName = "fireball";
                projectileFired = true;
                projectileTime = game.time.now + 1000 / 12 * 3;
                projectileDirection = "right";
            } else {
                if (playerDir == "moveRight" || playerDir == "moveLeft" ||
                        playerDir == "fireMoveRight0" || playerDir == "fireMoveRight1" ||
                        playerDir == "fireMoveLeft0" || playerDir == "fireMoveLeft1") {
                    firingDirection = "fireMoveLeft";
                } else {
                    firingDirection = "fireLeft";
                }
                projectileName = "fireball";
                projectileFired = true;
                projectileTime = game.time.now + 1000 / 12 * 3;
                projectileDirection = "left";
            }
            changePlayerThrowingHand();
            playerDir = "placeholderSoTheAnimationWillRepeatWhenRapidFire";
        }
    }
    if (projectileFired && game.time.now > projectileTime) {
        projectileFired = false;
        if (projectileDirection == "right") {
            fireProjectile(player, 64, 43, "right", projectileName);
        } else {
            fireProjectile(player, 19, 43, "left", projectileName);
        }
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
        } else if (playerDir != "jumpLeft" && inAir) {
            playerDir = "jumpLeft";
        }
    } else if (velX > 0) {
        // Moving right
        if (playerDir != "moveRight" && velX == PLAYER_SPEED && !inAir) {
            playerDir = "moveRight";
        } else if (playerDir != "runRight" && velX == PLAYER_SPEED_RUN && !inAir) {
            playerDir = "runRight";
        } else if (playerDir != "jumpRight" && inAir) {
            playerDir = "jumpRight";
        }
    } else {
        // Standing still
        if (playerDir != "standStill" && !inAir) {
            playerDir = "standStill";
        } else if (playerDir != "jumpStill" && inAir) {
            playerDir = "jumpStill";
        }
    }
    if (firingDirection != "notFiring") {
    	playerDir = firingDirection + playerThrowingHand;
    }
    // If animation changed, play it
    if (lastPlayerDir != playerDir) {
        player.animations.play(playerDir);
    }

    // Focus camera on player
    game.camera.focusOnXY(player.body.x + 32, player.body.y + 32);
}

function getAngleAtPointer(x, y) {
    var angle = Math.atan2(y - game.input.activePointer.y, 
        x - game.input.activePointer.x) * 180 / Math.PI + 180;
    return angle;
}

function changePlayerThrowingHand() {
    if (playerThrowingHand == 0) {
        playerThrowingHand = 1;
    } else {
        playerThrowingHand = 0;
    }
    return playerThrowingHand;
}