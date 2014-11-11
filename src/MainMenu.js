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
        this.add.sprite(0, 0, "mmBackground");
        this.title = this.add.sprite(WIDTH / 2, 160, "mmTitle");
        this.title.anchor.setTo(0.5, 1);
        this.title.alpha = 0;
        var titleTweenIn = this.add.tween(this.title);
        //titleTweenIn.to({y: this.title.height - 20}, 800, Phaser.Easing.Bounce.Out, true, 0, false);
        // Change the next line to the commented line above when deploying to public, the line below has smaller delays for faster testing purposes, but it looks worse.
        titleTweenIn.to({alpha: 1}, 150, Phaser.Easing.Cubic.In, true);

        this.playButton = this.add.button(WIDTH / 2, 250, "mmPlay", this.clickPlay, this);
        this.playButton.anchor.setTo(0.5, 0);
        this.playButton.alpha = 0;
        var playTweenIn = this.add.tween(this.playButton);
        //playTweenIn.to({x: 80}, 1000, Phaser.Easing.Cubic.Out, true, 200, false);
        // Change the next line to the commented line above when deploying to public, the line below has smaller delays for faster testing purposes, but it looks worse.
        playTweenIn.to({alpha: 1}, 150, Phaser.Easing.Cubic.In, true);
    },

    clickPlay: function() {
        var titleTweenIn = this.add.tween(this.title);
        titleTweenIn.to({alpha: 0}, 100, Phaser.Easing.Cubic.In, true);
        var playTweenOut = this.add.tween(this.playButton);
        //playTweenOut.to({x: -this.playButton.width}, 300, Phaser.Easing.Cubic.In, true, 0, false);
        // Change the next line to the commented line above when deploying to public, the line below has smaller delays for faster testing purposes, but it looks worse.
        playTweenOut.to({alpha: 0}, 100, Phaser.Easing.Cubic.In, true);
        playTweenOut.onComplete.add(this.play);
    },

    play: function() {
        this.game.state.start("Game");
    }
};
