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

var Guard = function(game) {
    Enemy.call(this, game, "guard");
};

Guard.prototype = Object.create(Enemy.prototype, {
    init: {
        value: function() {
            // Set animations for the guard
            this.sprite.animations.add("still", [0], 1, true);
            this.sprite.animations.add("left", [1, 2], 6, true);
            this.sprite.animations.add("right", [2, 1], 6, true);
            this.sprite.animations.add("block", [3], 1, true);
            this.sprite.animations.add("dead", [4, 5], 3, false);
            // Set variables for the guard
            this.block = false;
            this.moveTime = this.game.time.now + 3000;
            this.SPEED = 250;
            this.moveSpeed = 0;
            this.onFloor = true;
            this.paralyzeTime = 0;
            // Set hitbox for the guard
            this.sprite.body.setSize(66, 81, 15, 15);
        }
    },

    updateAI: {
        value: function() {
            // Update guard AI
            if (this.game.time.now < this.paralyzeTime) {
                return;
            }

            if (this.game.time.now > this.moveTime) {
                this.moveTime = this.game.time.now + 1000;
                if (Math.random() >= 0.5) {
                    this.block = true;
                    this.moveSpeed = 0;
                } else {
                    this.block = false;
                    if (Math.abs(this.moveSpeed) != this.SPEED) {
                        this.moveSpeed = this.SPEED;
                    }
                    var rand = Math.floor(Math.random() + 0.5) * 2 - 1;
                    this.moveSpeed *= rand;
                }
            }
            // Check if the guard used to be on floor but is now falling
            if (this.sprite.body.velocity.y > 0 && this.onFloor) {
                this.sprite.body.velocity.y = -400;
                this.moveSpeed *= -1;
            }
            this.onFloor = this.sprite.body.onFloor();
            this.sprite.body.velocity.x = this.moveSpeed;
        }
    },

    updateAnim: {
        value: function() {
            // Animate guard
            if (this.killed && !this.sprite.animations.getAnimation("dead").isPlaying && !this.sprite.animations.getAnimation("dead").isFinished) {
                this.sprite.animations.play("dead");
                this.sprite.body.setSize(96, 36, 0, 60);
                var tween = this.game.add.tween(this.sprite);
                tween.to({alpha: 0}, 3000, Phaser.Easing.Cubic.Out);
                tween.onComplete.add(this.sprite.kill);
                tween.start();
            } else if (this.killed) {
                return;
            } else if (this.block) {
                this.sprite.animations.play("block");
            } else {
                if (this.sprite.body.velocity.x < 0) {
                    this.sprite.animations.play("left");
                } else if (this.sprite.body.velocity.x > 0) {
                    this.sprite.animations.play("right");
                } else {
                    this.sprite.animations.play("still");
                }
            }
        }
    },

    updateMissileCollision: {
        value: function() {
            for (var i = 0; i < missiles.length; i++) {
                if (this.game.physics.arcade.collide(this.sprite, missiles[i].sprite)) {
                    if (!this.block) {
                        this.takeDmg(missiles[i].damage);
                        this.moveTime = this.game.time.now + 2000;
                        if (missiles[i].sprite.body.velocity.x > 0) {
                            this.moveSpeed = -this.SPEED * 1.5;
                            this.sprite.body.velocity.x = 400;
                        } else {
                            this.moveSpeed = this.SPEED * 1.5;
                            this.sprite.body.velocity.x = -400;
                        }
                        this.sprite.body.velocity.y = -300;
                        this.paralyzeTime = this.game.time.now + 800;
                    } else {
                        this.block = false;
                        this.moveTime = this.game.time.now + 2000;
                        if (missiles[i].sprite.body.velocity.x > 0) {
                            this.moveSpeed = -this.SPEED * 1.5;
                            this.sprite.body.velocity.x = 400;
                        } else {
                            this.moveSpeed = this.SPEED * 1.5;
                            this.sprite.body.velocity.x = -400;
                        }
                        this.sprite.body.velocity.y = -300;
                        this.paralyzeTime = this.game.time.now + 800;
                    }
                    missiles[i].explode();
                    this.game.hud.setHUDValue(HUD_ELEMENT_RIGHT_PRIMARY, this.health / this.maxHealth);
                    this.game.hud.showHUD(HUD_ELEMENT_RIGHT_PRIMARY);
                }
            }
        }
    }
});
Guard.prototype.constructor = Guard;
