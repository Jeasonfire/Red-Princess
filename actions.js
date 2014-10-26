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
var FIREBALL_SPEED = 1500;

function fireProjectile(parent, xOffset, yOffset, direction, name) {
    var projectile = game.add.sprite(0, 0, name);
    projectile.anchor.setTo(0.5, 0.5);
    game.physics.enable(projectile, Phaser.Physics.ARCADE);
    projectile.body.gravity.y = -GRAVITY;
    projectile.checkWorldBounds = true;
    projectile.outOfBoundsKill = true;
    projectile.reset(parent.body.x + xOffset, parent.body.y + yOffset);
    projectile.anchor.setTo(0.5, 0.5);
    if (direction == "left") {
        projectile.body.velocity.x = -FIREBALL_SPEED;
    }
    if (direction == "right") {
        projectile.body.velocity.x = FIREBALL_SPEED;
    }
}