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

var Load = function(game) {
}

Load.prototype = {
    preload: function() {
        // Set loading bar
        var loadingBar = this.add.sprite(WIDTH / 2, HEIGHT / 2, "loadingBar");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);

        // Load files
        this.game.load.image("mmTitle", "assets/gfx/mainmenu/title.png");
        this.game.load.image("mmPlay", "assets/gfx/mainmenu/play.png");
    },

    create: function() {
        this.game.state.start("MainMenu");
    }
}