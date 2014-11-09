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

var SCALE = 0.75;
var TWEEN_HEALTH = false;
var TWEEN_JUMPS = false;
var TWEEN_OVERLOAD = false;

var HUD = function(game) {
    this.game = game;
    this.barHealthWidth = 0;
    this.barHealth = null;
    this.groupHealth = null;

    this.barJumpsWidth = 0;
    this.barJumps = null;
    this.groupJumps = null;

    this.barOverloadWidth = 0;
    this.barOverload = null;
    this.groupOverload = null;

    this.visibleHealth = true;
    this.visibleJumps = true;
    this.visibleOverload = true;
    this.visibleHealthTime = 0;
    this.visibleJumpsTime = 0;
    this.visibleOverloadTime = 0;
};

HUD.prototype = {
    create: function() {
        var back0 = this.game.add.sprite(8, HEIGHT - 8, "barBack");
        back0.y -= back0.height * SCALE;
        back0.fixedToCamera = true;
        back0.scale.setTo(SCALE * 1.1, SCALE * 1.1);
        this.barHealth = this.game.add.sprite(8, HEIGHT - 8, "barHealth");
        this.barHealthWidth = this.barHealth.width * SCALE;
        this.barHealth.y -= this.barHealth.height * SCALE;
        this.barHealth.fixedToCamera = true;
        this.barHealth.scale.setTo(SCALE, SCALE);
        this.groupHealth = this.game.add.group();
        this.groupHealth.add(back0);
        this.groupHealth.add(this.barHealth);

        var back1 = this.game.add.sprite(WIDTH - 8, HEIGHT - 8, "barBackMirror");
        back1.anchor.setTo(1, 0);
        back1.y -= back1.height * SCALE;
        back1.fixedToCamera = true;
        back1.scale.setTo(SCALE * 1.1, SCALE * 1.1);
        this.barJumps = this.game.add.sprite(WIDTH - 8, HEIGHT - 8, "barJumps");
        this.barJumps.anchor.setTo(1, 0);
        this.barJumpsWidth = this.barJumps.width * SCALE;
        this.barJumps.y -= this.barJumps.height * SCALE;
        this.barJumps.fixedToCamera = true;
        this.barJumps.scale.setTo(SCALE, SCALE);
        this.groupJumps = this.game.add.group();
        this.groupJumps.add(back1);
        this.groupJumps.add(this.barJumps);

        var back2 = this.game.add.sprite(WIDTH / 2, 8, "barBackOverload");
        back2.anchor.setTo(0.5, 0);
        back2.fixedToCamera = true;
        back2.scale.setTo(SCALE * 1.1, SCALE * 1.1);
        this.barOverload = this.game.add.sprite(WIDTH / 2, 8, "barOverload");
        this.barOverload.anchor.setTo(0.5, 0);
        this.barOverloadWidth = this.barOverload.width * SCALE;
        this.barOverload.fixedToCamera = true;
        this.barOverload.scale.setTo(SCALE, SCALE);
        this.groupOverload = this.game.add.group();
        this.groupOverload.add(back2);
        this.groupOverload.add(this.barOverload);
    },

    update: function() {
        if (this.game.time.now > this.visibleHealthTime && this.visibleHealth) {
            this.hideHealth();
        }
        if (this.game.time.now > this.visibleJumpsTime && this.visibleJumps) {
            this.hideJumps();
        }
        if (this.game.time.now > this.visibleOverloadTime && this.visibleOverload) {
            this.hideOverload();
        }
    },

    cropHealth: function(f) {
        this.barHealth.width = this.barHealthWidth * f;
        this.barHealth.update();
    },

    cropJumps: function(f) {
        this.barJumps.width = this.barJumpsWidth * f;
        this.barJumps.update();
    },

    cropOverload: function(f) {
        this.barOverload.width = this.barOverloadWidth * f;
        this.barOverload.update();
    },

    showHealth: function(time) {
        TWEEN_HEALTH = true;
        this.visibleHealth = true;
        this.visibleHealthTime = this.game.time.now + time;
        var tween = this.game.add.tween(this.groupHealth);
        tween.to({x: 0, alpha: 1}, time / 4, Phaser.Easing.Cubic.In, true, 0);
        tween.onComplete.add(function() {TWEEN_HEALTH = false;});
    },

    showJumps: function(time) {
        TWEEN_JUMPS = true;
        this.visibleJumps = true;
        this.visibleJumpsTime = this.game.time.now + time;
        var tween = this.game.add.tween(this.groupJumps);
        tween.to({x: 0, alpha: 1}, time / 4, Phaser.Easing.Cubic.In, true, 0);
        tween.onComplete.add(function() {TWEEN_JUMPS = false;});
    },

    showOverload: function(time) {
        TWEEN_OVERLOAD = true;
        this.visibleOverload = true;
        this.visibleOverloadTime = this.game.time.now + time;
        var tween = this.game.add.tween(this.groupOverload);
        tween.to({y: 0, alpha: 1}, time / 4, Phaser.Easing.Cubic.In, true, 0);
        tween.onComplete.add(function() {TWEEN_OVERLOAD = false;});
    },

    hideHealth: function() {
        if (!this.visibleHealth || TWEEN_HEALTH) {
            return;
        }
        TWEEN_HEALTH = true;
        this.visibleHealth = false;
        var tween = this.game.add.tween(this.groupHealth);
        tween.to({x: -this.barHealth.width - 8, alpha: 0}, 2000, Phaser.Easing.Cubic.In, true, 0);
        tween.onComplete.add(function() {TWEEN_HEALTH = false;});
    },

    hideJumps: function() {
        if (!this.visibleJumps || TWEEN_JUMPS) {
            return;
        }
        TWEEN_JUMPS = true;
        this.visibleJumps = false;
        var tween = this.game.add.tween(this.groupJumps);
        tween.to({x: this.barJumps.width + 8, alpha: 0}, 2000, Phaser.Easing.Cubic.In, true, 0);
        tween.onComplete.add(function() {TWEEN_JUMPS = false;});
    },

    hideOverload: function() {
        if (!this.visibleOverload || TWEEN_OVERLOAD) {
            return;
        }
        TWEEN_OVERLOAD = true;
        this.visibleOverload = false;
        var tween = this.game.add.tween(this.groupOverload);
        tween.to({y: -this.barOverload.height - 8, alpha: 0}, 2000, Phaser.Easing.Cubic.In, true, 0);
        tween.onComplete.add(function() {TWEEN_OVERLOAD = false;});
    }
};
