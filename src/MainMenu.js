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

var MainMenu = function(game) {
    this.title = null;
    this.playButton = null;
};

MainMenu.prototype = {
    create: function() {
        this.title = this.add.sprite(WIDTH / 2, 0, "mmTitle");
        this.title.anchor.setTo(0.5, 1);
        var titleTweenIn = this.add.tween(this.title);
        titleTweenIn.to({y: this.title.height - 20}, 800, Phaser.Easing.Bounce.Out, true, 0, false);

        this.playButton = this.add.button(WIDTH, 300, "mmPlay", this.clickPlay, this);
        var playTweenIn = this.add.tween(this.playButton);
        playTweenIn.to({x: 80}, 1000,
            Phaser.Easing.Cubic.Out, true, 200, false);
    },

    clickPlay: function() {
        var titleTweenIn = this.add.tween(this.title);
        titleTweenIn.to({y: HEIGHT + this.title.height}, 300, Phaser.Easing.Cubic.In, true, 0, false);
        var playTweenOut = this.add.tween(this.playButton);
        playTweenOut.to({x: -this.playButton.width}, 300, Phaser.Easing.Cubic.In, true, 0, false);
        playTweenOut.onComplete.add(this.play);
    },

    play: function() {
        this.game.state.start("Game");
    }
};