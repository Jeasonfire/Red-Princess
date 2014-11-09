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

var Audio = function(game) {
    this.game = game;
    this.sfxExplosion0 = null;
    this.sfxExplosion1 = null;
    this.sfxFire0 = null;
    this.sfxFire1 = null;
    this.sfxJump0 = null;
    this.sfxJump1 = null;
    this.sfxPExplode = null;
};

Audio.prototype = {
    create: function() {
        this.sfxExplosion0 = this.game.add.audio("sfxExplosion0", 0.07);
        this.sfxExplosion1 = this.game.add.audio("sfxExplosion1", 0.07);
        this.sfxFire0 = this.game.add.audio("sfxFire0", 0.05);
        this.sfxFire1 = this.game.add.audio("sfxFire1", 0.05);
        this.sfxJump0 = this.game.add.audio("sfxJump0", 0.05);
        this.sfxJump1 = this.game.add.audio("sfxJump1", 0.05);
        this.sfxPExplode = this.game.add.audio("sfxPExplode", 0.08);
    }
}
