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

var SCALE = 1;
var HUD_TWEEN_TIME = 1500;
var HUD_OPEN_TIME = 1000;

var HUD_ELEMENT_LEFT_PRIMARY = 0;
var HUD_ELEMENT_LEFT_SECONDARY = 1;
var HUD_ELEMENT_RIGHT_PRIMARY = 2;
var HUD_ELEMENT_RIGHT_SECONDARY = 3;
var HUD_ELEMENT_MID_PRIMARY = 4;
var HUD_AMT_OF_ELEMENTS = 5;

var HUD_ELEMENT_SPRITES = [
    // Left primary
    {x: 8, y: HEIGHT - 8, anchorX: 0, anchorY: 1, name: "hudElementLeftPrimary", back: "hudElementLeftBack"},

    // Left secondary
    {x: 8, y: HEIGHT - 56, anchorX: 0, anchorY: 1, name: "hudElementLeftSecondary", back: "hudElementLeftBack"},

    // Right primary
    {x: WIDTH - 8, y: HEIGHT - 8, anchorX: 1, anchorY: 1, name: "hudElementRightPrimary", back: "hudElementRightBack"},

    // Right secondary
    {x: WIDTH - 8, y: HEIGHT - 56, anchorX: 1, anchorY: 1, name: "hudElementRightSecondary", back: "hudElementRightBack"},

    // Mid primary
    {x: WIDTH / 2, y: HEIGHT - 8, anchorX: 0.5, anchorY: 1, name: "hudElementMidPrimary", back: "hudElementMidBack"}
];

var HUD_ELEMENT_STATES = [
    // Left primary
    {tweening: false, hideTime: 0, hidden: false},

    // Left secondary
    {tweening: false, hideTime: 0, hidden: false},

    // Right primary
    {tweening: false, hideTime: 0, hidden: false},

    // Right secondary
    {tweening: false, hideTime: 0, hidden: false},

    // Mid primary
    {tweening: false, hideTime: 0, hidden: false}
];

var HUD = function(game) {
    this.game = game;
    this.hudBacks = [];
    this.hudElements = [];
    this.hudGroups = [];
    this.hudState = [];
};

HUD.prototype = {
    create: function() {
        for (var i = 0; i < HUD_AMT_OF_ELEMENTS; i++) {
            // Sprites
            this.hudBacks[i] = this.game.add.sprite(HUD_ELEMENT_SPRITES[i].x, HUD_ELEMENT_SPRITES[i].y,HUD_ELEMENT_SPRITES[i].back);
            this.hudBacks[i].anchor.setTo(HUD_ELEMENT_SPRITES[i].anchorX, HUD_ELEMENT_SPRITES[i].anchorY);

            this.hudElements[i] = this.game.add.sprite(HUD_ELEMENT_SPRITES[i].x, HUD_ELEMENT_SPRITES[i].y, HUD_ELEMENT_SPRITES[i].name);
            this.hudElements[i].anchor.setTo(HUD_ELEMENT_SPRITES[i].anchorX, HUD_ELEMENT_SPRITES[i].anchorY);

            // Group
            this.hudGroups[i] = this.game.add.group();
            this.hudGroups[i].add(this.hudBacks[i]);
            this.hudGroups[i].add(this.hudElements[i]);
            this.hudGroups[i].scale.setTo(SCALE, SCALE);
            this.hudGroups[i].fixedToCamera = true;

            // State
            this.hudState[i] = HUD_ELEMENT_STATES[i];
        }
    },

    update: function() {
        for (var i = 0; i < HUD_AMT_OF_ELEMENTS; i++) {
            if (this.game.time.now > HUD_ELEMENT_STATES[i].hideTime && !HUD_ELEMENT_STATES[i].hidden) {
                this.hideHUD(i);
            }
        }
    },

    setHUDValue: function(element, value) {
        this.hudElements[element].width = this.hudBacks[element].width * value;
    },

    showHUD: function(element) {
        if (HUD_ELEMENT_STATES[element].tweening) {
            return;
        }

        HUD_ELEMENT_STATES[element].hideTime = this.game.time.now + HUD_TWEEN_TIME + HUD_OPEN_TIME;
        if (!HUD_ELEMENT_STATES[element].hidden) {
            return;
        }
        HUD_ELEMENT_STATES[element].hidden = false;
        var tween = this.game.add.tween(this.hudGroups[element]);
        tween.to({alpha: 1}, HUD_TWEEN_TIME, Phaser.Easing.Cubic.Out);
        this.tween(tween, element);
    },

    hideHUD: function(element) {
        HUD_ELEMENT_STATES[element].hidden = true;
        var tween = this.game.add.tween(this.hudGroups[element]);
        tween.to({alpha: 0}, HUD_TWEEN_TIME, Phaser.Easing.Cubic.In);
        this.tween(tween, element);
    },

    tween: function(tween, element) {
        tween.start();
        HUD_ELEMENT_STATES[element].tweening = true;
        tween.onComplete.add(this.completeTween, HUD_ELEMENT_STATES[element]);
    },

    completeTween: function() {
        this.tweening = false;
    }
};
