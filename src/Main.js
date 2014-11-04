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

var WIDTH = 960;
var HEIGHT = 540;
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, "gameDiv");

game.state.add("Boot", Boot);
game.state.add("Load", Load);
game.state.add("MainMenu", MainMenu);
game.state.add("Game", Game);
game.state.start("Boot");