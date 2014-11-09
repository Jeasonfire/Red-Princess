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
    this.loadingBar = null;
};

Load.prototype = {
    preload: function() {
        // Set loading bar
        this.loadingBar = this.add.sprite(WIDTH / 2, HEIGHT / 2, "loadingBar");
        this.loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.loadingBar);

        // Setup input
        input.create();

        // Load files
        this.load.image("mmTitle", "assets/gfx/mainmenu/title.png");
        this.load.image("mmPlay", "assets/gfx/mainmenu/play.png");

        this.load.image("tileset", "assets/gfx/map/tileset.png");
        this.load.tilemap("map", 'assets/levels/map.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.spritesheet("player", "assets/gfx/player/player.png", 96, 96);

        this.load.image("particleFire", "assets/gfx/particles/fire.png");
        this.load.image("particleFireball", "assets/gfx/particles/fireball.png");

        this.load.audio("sfxFire0", "assets/sfx/fire.wav");
        this.load.audio("sfxFire1", "assets/sfx/fire1.wav");
        this.load.audio("sfxExplosion0", "assets/sfx/explosion.wav");
        this.load.audio("sfxExplosion1", "assets/sfx/explosion1.wav");

        this.load.audio("musTest", "assets/music/test.wav");
    },

    create: function() {
        var tween = this.add.tween(this.loadingBar);
        //tween.to({x: WIDTH + this.loadingBar.width / 2}, 750, Phaser.Easing.Cubic.In, true, 100, false, false);
        // Change the next line to the commented line above when deploying to public, the line below has smaller delays for faster testing purposes, but it looks worse.
        tween.to({x: WIDTH + this.loadingBar.width / 2}, 100, Phaser.Easing.Cubic.In, true, 0, false, false);
        tween.onComplete.add(this.goToMenu);
    },

    goToMenu: function() {
        this.game.state.start("MainMenu");
    }
};
