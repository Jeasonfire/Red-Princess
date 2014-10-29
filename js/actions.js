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

// Include all actions used by objects ingame eg. player firing a fireball

// Fireball init
var FIREBALL_SPEED = 400;
var NUM_OF_PARTICLES = 5;

// Particle animations
var fireballs;d

function initActions() {
    fireballs = game.add.group();
    for (var i = 0; i < NUM_OF_PARTICLES; i++) {
        var particle = game.add.sprite(0, 0, "fireball");
        particle.animations.add("right", [0, 1, 2, 3, 4, 5, 6, 7], 48, true);
        particle.animations.add("left", [8, 9, 10, 11, 12, 13, 14, 15], 48, true);
        fireballs.add(particle);
        particle.kill();
    }
}

function fireProjectile(parent, xOffset, yOffset, direction, name) {
    var projectile;
    if (name == "fireball") {
        projectile = fireballs.getFirstDead();
        if (projectile === null || projectile === undefined) {
            fireballs.getFirstAlive().kill();
            fireProjectile(parent, xOffset, yOffset, direction, name);
            return;
        }
        projectile.revive();
    } else {
        projectile = game.add.sprite(0, 0, name);
    }
    projectile.anchor.setTo(0.5, 0.5);
    game.physics.enable(projectile, Phaser.Physics.ARCADE);
    projectile.body.gravity.y = -GRAVITY;
    projectile.checkWorldBounds = true;
    projectile.outOfBoundsKill = true;
    projectile.reset(parent.body.x + xOffset, parent.body.y + yOffset);
    if (direction == "left") {
        projectile.body.velocity.x = -FIREBALL_SPEED;
    }
    if (direction == "right") {
        projectile.body.velocity.x = FIREBALL_SPEED;
    }
    projectile.animations.play(direction);
}