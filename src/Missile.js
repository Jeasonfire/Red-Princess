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

var MISSILE_SPEED = 700;
var NUM_OF_MISSILES = 20;
var MISSILE_FLYING_TIME = 2000;
var missiles;

function initMissiles(game) {
    missiles = [];
    for (var i = 0; i < NUM_OF_MISSILES; i++) {
        var missile = new Missile(game);
        missile.create();
        missiles[i] = missile;
    }
}

function launchMissile(direction, x, y) {
    var missile;
    for (var i = 0; i < NUM_OF_MISSILES; i++) {
        if (!missiles[i].sprite.alive) {
            missile = missiles[i];
            continue;
        }
    }
    if (missile === null || missile === undefined) {
        return;
    }
    missile.init(direction, x, y);
    if (Math.random() > 0.5) {
        audio.sfxFire0.play();
    } else {
        audio.sfxFire1.play();
    }
}

function updateMissiles(layerCollision) {
    for (var i = 0; i < NUM_OF_MISSILES; i++) {
        missiles[i].update(layerCollision);
    }
}

var Missile = function(game) {
    this.game = game;
    this.sprite = null;
    this.emitter = null;
    this.killTime = 0;
    this.damage = 20;
};

Missile.prototype = {
    create: function() {
        this.sprite = game.add.sprite(0, 0, "particleFireball");
        this.sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.gravity.y = -GRAVITY;
        this.sprite.body.velocity.x = MISSILE_SPEED;
        this.emitter = game.add.emitter(0, 0, 20);
        this.emitter.makeParticles("particleFire");
        this.emitter.setScale(1.5);
        this.emitter.gravity = -GRAVITY;
        this.emitter.width = 30;
        this.emitter.height = 30;
        this.emitter.setAlpha(1, 0.5);
        this.sprite.kill();
    },

    init: function(direction, x, y) {
        this.sprite.revive();
        this.sprite.reset(x, y);
        this.sprite.angle = direction;
        this.sprite.body.velocity.x = Math.cos(direction * Math.PI / 180) * MISSILE_SPEED;
        this.sprite.body.velocity.y = Math.sin(direction * Math.PI / 180) * MISSILE_SPEED;
        this.emitter.on = true;
        this.emitter.x = x;
        this.emitter.y = y;
        this.emitter.start(false, 80, 20, 0, true);

        this.killTime = this.game.time.now + MISSILE_FLYING_TIME;
    },

    update: function(layerCollision) {
        this.emitter.x = this.sprite.x;
        this.emitter.y = this.sprite.y;
        if (this.game.time.now > this.killTime && this.emitter.on) {
            this.explode();
        }
        this.game.physics.arcade.collide(this.sprite, layerCollision, this.explode, null, this);
    },

    explode: function(sprite, layer) {
        if (Math.random() > 0.5) {
            audio.sfxExplosion0.play();
        } else {
            audio.sfxExplosion1.play();
        }
        this.emitter.start(true, 500, 0, 20);
        this.sprite.kill();
    }
};
