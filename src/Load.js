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

var audio;
var input;

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
        input = new Input(this);
        input.create();

        // Setup audio
        audio = new Audio(this);
        audio.create();

        // Load files
        // Main menu
        this.load.image("mmBackground", "assets/gfx/mainmenu/background.png");
        this.load.image("mmTitle", "assets/gfx/mainmenu/title.png");
        this.load.image("mmPlay", "assets/gfx/mainmenu/play.png");

        // Maps/tilesets
        this.load.image("tileset", "assets/gfx/map/tileset.png");
        this.load.tilemap("map", 'assets/levels/map.json', null, Phaser.Tilemap.TILED_JSON);

        // Game objects (ie. player, enemies)
        this.load.spritesheet("player", "assets/gfx/player/player.png", 96, 96);
        this.load.spritesheet("guard", "assets/gfx/enemies/guard.png", 96, 96);

        // Particles & missiles
        this.load.image("particleFire", "assets/gfx/particles/fire.png");
        this.load.image("particleFireball", "assets/gfx/particles/fireball.png");

        // HUD
        this.load.image("hudElementLeftBack", "assets/gfx/hud/barLeft.png");
        this.load.image("hudElementRightBack", "assets/gfx/hud/barRight.png");
        this.load.image("hudElementMidBack", "assets/gfx/hud/barMid.png");
        this.load.image("hudElementLeftPrimary", "assets/gfx/hud/barLeftPrimary.png");
        this.load.image("hudElementLeftSecondary", "assets/gfx/hud/barLeftSecondary.png");
        this.load.image("hudElementRightPrimary", "assets/gfx/hud/barRightPrimary.png");
        this.load.image("hudElementRightSecondary", "assets/gfx/hud/barRightSecondary.png");
        this.load.image("hudElementMidPrimary", "assets/gfx/hud/barMidPrimary.png");

        // Sound effects
        this.load.audio("sfxFire0", "assets/sfx/fire.wav");
        this.load.audio("sfxFire1", "assets/sfx/fire1.wav");
        this.load.audio("sfxExplosion0", "assets/sfx/explosion.wav");
        this.load.audio("sfxExplosion1", "assets/sfx/explosion1.wav");
        this.load.audio("sfxJump0", "assets/sfx/jump.wav");
        this.load.audio("sfxJump1", "assets/sfx/jump1.wav");
        this.load.audio("sfxPExplode", "assets/sfx/playerExplode.wav");

        // Music
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
