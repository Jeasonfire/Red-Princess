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
            // Set animations for guard
            this.sprite.animations.add("still", [0], 1, true);
            this.sprite.animations.add("left", [1, 2], 6, true);
            this.sprite.animations.add("right", [2, 1], 6, true);
            this.sprite.animations.add("block", [3], 1, true);
            // Set variables for guard
            this.block = false;
            this.moveTime = this.game.time.now + 3000;
            this.speed = 250;
        }
    },

    updateAI: {
        value: function() {
            // Update guard AI
            if (this.game.time.now > this.moveTime) {
                this.moveTime = this.game.time.now + 3000;
                this.sprite.body.velocity.x = this.speed;
                this.sprite.body.velocity.x *= Math.max(0.5, Math.random()) * 2 - 1.5;
            }
        }
    },

    updateAnim: {
        value: function() {
            // Animate guard
            if (this.block) {
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
    }
});
Guard.prototype.constructor = Guard;
