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
var JUMP_RESET_TIME = 75;

var Player = function(game) {
    this.game = game;
    this.sprite = null;

    this.WALK_SPEED = 400;
    this.RUN_SPEED = 800;

    this.FIRING_RECOIL_Y = -100;
    this.FIRING_RECOIL_X = 450;
    this.FIRING_FPS = 6;

    this.OVERLOAD_AMT_FIREBALL = 6;
    this.OVERLOAD_AMT_JUMP = 2;

    this.EXPLOSION_MISSILE_AMT = NUM_OF_MISSILES / 1.5;
    this.EXPLOSION_FPS = 4;
    this.explosionTime = 0;
    this.exploded = false;
    this.canExplode = true;

    this.JUMP_SPEED = -700;
    this.JUMP_AMOUNT = 3;
    this.MAX_JUMP_AMOUNT = 3;
    this.JUMP_PARTICLE_AMT = 25;

    this.MAX_HEALTH = 100;
    this.health = this.MAX_HEALTH;

    this.OVERLOAD_CAP = 100;
    this.overload = 0;

    this.speed = this.WALK_SPEED;
    this.direction = "right";
    this.isRunning = false;
    this.onFloor = false;
    this.isMoving = false;

    this.jumps = this.JUMP_AMOUNT;
    this.jumpTime = 0;

    this.firing = false;
    this.firingAnim = false;
    this.firingTime = 0;
    this.fired = false;

    this.emitterJump = null;
};

Player.prototype = {
    create: function(x, y) {
        this.sprite = this.game.add.sprite(x, y, "player");
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
        this.sprite.animations.add("explode", [20, 21], this.EXPLOSION_FPS, false);

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.maxVelocity.setTo(MAX_VEL, MAX_VEL);
        this.sprite.body.setSize(36, 88, 30, 8);
        this.sprite.body.drag.x = 2000;

        this.emitterJump = this.game.add.emitter(0, 0, this.MAX_JUMP_AMOUNT * this.JUMP_PARTICLE_AMT);
        this.emitterJump.makeParticles("particleFire");
        this.emitterJump.setScale(0.5);
    },

    update: function(layer) {
        this.game.physics.arcade.collide(this.sprite, layer);
        this.updateInput();
        this.updateHUD();
        this.updateAnimation();
        this.updateEmitters();
    },

    updateInput: function() {
        if (this.game.time.now < this.explosionTime) {
            return;
        }

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
        if (this.onFloor && this.jumps < this.JUMP_AMOUNT) {
            this.jumps = this.JUMP_AMOUNT;
            this.game.hud.showJumps(2000);
        }
        if (input.justPressedUp() && (this.onFloor || this.jumps > 0) && this.game.time.now > this.jumpTime) {
            if (Math.random() > 0.5) {
                audio.sfxJump0.play();
            } else {
                audio.sfxJump1.play();
            }
            this.jumpTime = this.game.time.now + JUMP_RESET_TIME;
            this.sprite.body.velocity.y = this.JUMP_SPEED;
            if (!this.onFloor) {
                this.emitterJump.start(true, 600, null, this.JUMP_PARTICLE_AMT);
                this.jumps--;
                this.game.hud.showJumps(2000);
                this.overload += this.OVERLOAD_AMT_JUMP;
                this.game.hud.showOverload(2000);
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
                launchMissile(180, this.sprite.x + 30, this.sprite.y + 43);
                this.sprite.body.velocity.x = this.FIRING_RECOIL_X;
                if (!this.onFloor) {
                    this.sprite.body.velocity.x += this.FIRING_RECOIL_X;
                    this.sprite.body.velocity.y = this.FIRING_RECOIL_Y;
                }
            } else {
                launchMissile(0, this.sprite.x + 66, this.sprite.y + 43);
                this.sprite.body.velocity.x = -this.FIRING_RECOIL_X;
                if (!this.onFloor) {
                    this.sprite.body.velocity.x -= this.FIRING_RECOIL_X;
                    this.sprite.body.velocity.y = this.FIRING_RECOIL_Y;
                }
            }
            this.overload += this.OVERLOAD_AMT_FIREBALL;
            this.game.hud.showOverload(2000);
            this.fired = true;
            this.firingTime = this.game.time.now + 1000 / (this.FIRING_FPS);
        }

        if (this.overload >= this.OVERLOAD_CAP && input.pressedOverload() && !this.firingAnim) {
            this.firingAnim = true;
            this.explodeAnim();
        } else if (this.overload > this.OVERLOAD_CAP) {
            this.overload = this.OVERLOAD_CAP;
        }
    },

    updateHUD: function() {
        this.game.hud.cropHealth(this.health / this.MAX_HEALTH);
        this.game.hud.cropJumps(this.jumps / this.JUMP_AMOUNT);
        this.game.hud.cropOverload(this.overload / this.OVERLOAD_CAP);
    },

    updateAnimation: function() {
        if (this.game.time.now < this.explosionTime && !this.exploded) {
            this.exploded = true;
            this.sprite.animations.play("explode");
        } else if (this.game.time.now < this.explosionTime) {
            if (this.game.time.now > this.explosionTime - 1000 / this.EXPLOSION_FPS * 0.5 && this.canExplode) {
                this.explode();
                this.canExplode = false;
            }
            return;
        } else if (this.exploded) {
            this.exploded = false;
            this.canExplode = true;
            this.sprite.body.gravity.y = 0;
            return;
        }
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
    },

    explodeAnim: function() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.body.gravity.y = -GRAVITY;
        this.explosionTime = this.game.time.now + 1000 / this.EXPLOSION_FPS * 2;
        this.exploded = false;
        audio.sfxPExplode.play();
    },

    explode: function() {
        this.health -= 10;
        this.overload -= this.OVERLOAD_CAP;
        this.game.hud.showHealth(2000);
        this.game.hud.showOverload(2000);
        for (var i = 0; i < this.EXPLOSION_MISSILE_AMT; i++) {
            var angle = 360 / this.EXPLOSION_MISSILE_AMT * i;
            launchMissile(angle, this.sprite.x + 66, this.sprite.y + 43);
        }
        this.firingAnim = false;
        audio.sfxExplosion0.play();
    }
};
