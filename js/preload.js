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

 // Load files here

function preload() {
    game.load.tilemap("level", "assets/levels/map.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("sheet", "assets/gfx/sheet.png", 64, 64);
    game.load.image("fireball", "assets/gfx/fireball.png");
    game.load.spritesheet("player", "assets/gfx/player.png", 128, 128);
};