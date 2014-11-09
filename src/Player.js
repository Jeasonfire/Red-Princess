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

var MAX_VEL = 950;
var JUMP_RESET_TIME = 100;

var Player = function(game) {
    this.game = game;
    this.sprite = null;

    this.WALK_SPEED = 400;
    this.RUN_SPEED = 600;
    this.JUMP_SPEED = -900;
    this.FIRING_RECOIL_Y = -200;
    this.FIRING_RECOIL_X = 450;
    this.FIRING_FPS = 6;

    this.speed = this.WALK_SPEED;
    this.direction = "right";
    this.isRunning = false;
    this.onFloor = false;
    this.isMoving = false;
    this.canDoubleJump = true;
    this.jumpTime = 0;
    this.firing = false;
    this.firingAnim = false;
    this.firingTime = 0;
    this.fired = false;

    this.emitterJump = null;
};

Player.prototype = {
    create: function() {
        this.sprite = this.game.add.sprite(0, 0, "player");
        this.sprite.animations.add("standright", [0], 1, true);
        this.sprite.animations.add("standleft", [1], 1, true);
        this.sprite.animations.add("walkright", [2, 4], 6, true);
        this.sprite.animations.add("walkleft", [3, 5], 6, true);
        this.sprite.animations.add("runright", [2, 4], 10, true);
        this.sprite.animations.add("runleft", [3, 5], 10, true);
        this.sprite.animations.add("jumpright", [16], 1, true);
        this.sprite.animations.add("jumpleft", [17], 1, true);
        this.sprite.animations.add("upright", [6], 1, true);
        this.sprite.animations.add("upleft", [7], 1, true);
        this.sprite.animations.add("downright", [8], 1, true);
        this.sprite.animations.add("downleft", [9], 1, true);
        this.sprite.animations.add("fireright", [10, 12], this.FIRING_FPS, false);
        this.sprite.animations.add("fireleft", [11, 13], this.FIRING_FPS, false);
        this.sprite.animations.add("firewalkright", [10, 14], this.FIRING_FPS, false);
        this.sprite.animations.add("firewalkleft", [11, 15], this.FIRING_FPS, false);
        this.sprite.animations.add("firejumpright", [16, 18], this.FIRING_FPS, false);
        this.sprite.animations.add("firejumpleft", [17, 19], this.FIRING_FPS, false);

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.maxVelocity.setTo(MAX_VEL, MAX_VEL);
        this.sprite.body.setSize(36, 88, 30, 8);
        this.sprite.body.drag.x = 2000;

        this.emitterJump = this.game.add.emitter();
        this.emitterJump.makeParticles("particleFire");
        this.emitterJump.setScale(0.5);
    },

    update: function(layer) {
        this.game.physics.arcade.collide(this.sprite, layer);
        this.updateInput();
        this.updateAnimation();
        this.updateEmitters();
    },

    updateInput: function() {
        var speed = this.WALK_SPEED;
        if (input.pressedRun() && this.onFloor) {
            speed = this.RUN_SPEED;
            this.isRunning = true;
        } else if (input.pressedRun() && !this.onFloor && this.isRunning) {
            speed = this.RUN_SPEED;
        } else if (!input.pressedRun()) {
            this.isRunning = false;
        }

        this.isMoving = true;
        if (input.pressedLeft() && !input.pressedRight() && !this.fired) {
            this.speed = -speed;
            this.sprite.body.velocity.x = this.speed;
            this.direction = "left";
        } else if (input.pressedRight() && !input.pressedLeft() && !this.fired) {
            this.speed = speed;
            this.sprite.body.velocity.x = this.speed;
            this.direction = "right";
        } else if (!this.fired) {
            this.isMoving = false;
        }

        this.onFloor = this.sprite.body.onFloor();
        if (this.onFloor) {
            this.canDoubleJump = true;
        }
        if (input.justPressedUp() && (this.onFloor || this.canDoubleJump) && this.game.time.now > this.jumpTime) {
            this.jumpTime = this.game.time.now + JUMP_RESET_TIME;
            this.sprite.body.velocity.y = this.JUMP_SPEED;
            if (!this.onFloor) {
                this.emitterJump.start(true, 600, null, 25);
                this.canDoubleJump = false;
            }
        }

        if (this.firingAnim && this.fired && this.game.time.now > this.firingTime) {
            this.firingAnim = false;
            this.firing = false;
            this.fired = false;
        }
        if (input.pressedFire() && !this.firing) {
            this.firing = true;
            this.firingTime = this.game.time.now + 1000 / (this.FIRING_FPS);
        }
        if (this.firingAnim && this.game.time.now > this.firingTime && !this.fired) {
            if (this.direction == "left") {
                launchMissile(this.direction, this.sprite.x + 30, this.sprite.y + 43);
                this.sprite.body.velocity.x = this.FIRING_RECOIL_X;
                if (!this.onFloor) {
                    this.sprite.body.velocity.x += this.FIRING_RECOIL_X;
                    this.sprite.body.velocity.y = this.FIRING_RECOIL_Y;
                }
            } else {
                launchMissile(this.direction, this.sprite.x + 66, this.sprite.y + 43);
                this.sprite.body.velocity.x = -this.FIRING_RECOIL_X;
                if (!this.onFloor) {
                    this.sprite.body.velocity.x -= this.FIRING_RECOIL_X;
                    this.sprite.body.velocity.y = this.FIRING_RECOIL_Y;
                }
            }
            this.fired = true;
            this.firingTime = this.game.time.now + 1000 / (this.FIRING_FPS);
        }
    },

    updateAnimation: function() {
        if (this.onFloor) {
            if (this.isMoving) {
                if (this.isRunning) {
                    this.sprite.animations.play("run" + this.direction);
                } else {
                    if (this.firing && !this.firingAnim) {
                        this.sprite.animations.play("firewalk" + this.direction);
                        this.firingAnim = true;
                    } else if (!this.firingAnim) {
                        this.sprite.animations.play("walk" + this.direction);
                    }
                }
            } else {
                if (this.firing && !this.firingAnim) {
                    this.sprite.animations.play("fire" + this.direction);
                    this.firingAnim = true;
                } else if (!this.firingAnim) {
                    this.sprite.animations.play("stand" + this.direction);
                }
            }
        } else {
            if (this.firing && !this.firingAnim) {
                this.sprite.animations.play("firejump" + this.direction);
                this.firingAnim = true;
            } else if (!this.firingAnim) {
                if (this.sprite.body.velocity.y > 0) {
                    this.sprite.animations.play("down" + this.direction);
                } else if (this.sprite.body.velocity.y > this.JUMP_SPEED / 10 * 7) {
                    this.sprite.animations.play("up" + this.direction);
                } else {
                    this.sprite.animations.play("jump" + this.direction);
                }
            }
        }
    },

    updateEmitters: function() {
        this.emitterJump.x = this.sprite.x + this.sprite.width / 2;
        this.emitterJump.y = this.sprite.y + this.sprite.height;
    }
};
