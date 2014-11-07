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
    this.sprite = null;

    this.WALK_SPEED = 300;
    this.RUN_SPEED = 600;
    this.JUMP_SPEED = -900;

    this.speed = this.WALK_SPEED;
    this.direction = "right";
    this.isRunning = false;
    this.onFloor = false;
    this.isMoving = false;
};

Player.prototype = {
    create: function() {
        this.sprite = this.game.add.sprite(0, 0, "player");
        this.sprite.animations.add("standright", [0], 1, true);
        this.sprite.animations.add("standleft", [2], 1, true);     this.sprite.animations.add("walkright", [0, 1], 8, true);
        this.sprite.animations.add("walkleft", [2, 3], 8, true);
        this.sprite.animations.add("runright", [4, 5], 12, true);
        this.sprite.animations.add("runleft", [6, 7], 12, true);
        this.sprite.animations.add("upright", [8, 9], 10, true);
        this.sprite.animations.add("upleft", [10, 11], 10, true);
        this.sprite.animations.add("downright", [12, 13], 10, true);
        this.sprite.animations.add("downleft", [14, 15], 10, true);

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    },

    update: function(layer) {
        this.game.physics.arcade.collide(this.sprite, layer);
        this.updateInput();
        this.updateAnimation();
    },

    updateInput: function() {
        var speed = this.WALK_SPEED;
        this.isRunning = false;
        if (input.pressedRun()) {
            speed = this.RUN_SPEED;
            this.isRunning = true;
        }

        this.isMoving = true;
        if (input.pressedLeft() && !input.pressedRight()) {
            this.speed = -speed;
            this.direction = "left";
        } else if (input.pressedRight() && !input.pressedLeft()) {
            this.speed = speed;
            this.direction = "right";
        } else {
            this.speed = 0;
            this.isMoving = false;
        }
        this.sprite.body.velocity.x = this.speed;

        this.onFloor = this.sprite.body.onFloor();
        if (input.pressedUp() && this.onFloor) {
            this.sprite.body.velocity.y = this.JUMP_SPEED;
        }
    },

    updateAnimation: function() {
        if (this.onFloor) {
            if (this.isMoving) {
                if (this.isRunning) {
                    this.sprite.animations.play("run" + this.direction);
                } else {
                    this.sprite.animations.play("walk" + this.direction);
                }
            } else {
                this.sprite.animations.play("stand" + this.direction);
            }
        } else {
            if (this.sprite.body.velocity.y > 0) {
                this.sprite.animations.play("down" + this.direction);
            } else {
                this.sprite.animations.play("up" + this.direction);
            }
        }
    }
};
