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
}

MainMenu.prototype = {
    create: function() {
        var title = this.add.sprite(WIDTH / 2, 20, "mmTitle");
        title.anchor.setTo(0.5, 0);
        var play = this.add.button(WIDTH, 220, "mmPlay", this.play, this);
        var playTween = this.add.tween(play);
        playTween.to({x: 80}, 1000,
            Phaser.Easing.Cubic.Out, true, 200, false);
    },

    play: function() {
        this.game.state.start("Game");
    }
}