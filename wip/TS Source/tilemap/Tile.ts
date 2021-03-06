/// <reference path="../_definitions.ts" />

/**
* Phaser - Tile
*
* A Tile is a single representation of a tile within a Tilemap
*/

module Phaser {

    export class Tile {

        /**
         * Tile constructor
         * Create a new <code>Tile</code>.
         *
         * @param tilemap {Tilemap} the tilemap this tile belongs to.
         * @param index {number} The index of this tile type in the core map data.
         * @param width {number} Width of the tile.
         * @param height number} Height of the tile.
         */
        constructor(game: Phaser.Game, tilemap: Phaser.Tilemap, index: number, width: number, height: number) {

            this.game = game;
            this.tilemap = tilemap;
            this.index = index;

            this.width = width;
            this.height = height;
            this.allowCollisions = Types.NONE;

        }

        /**
         * Local reference to Game.
         */
        public game: Phaser.Game;

        /**
         * You can give this Tile a friendly name to help with debugging. Never used internally.
         * @type {string}
         */
        public name: string;

        /**
         * The virtual mass of the tile.
         * @type {number}
         */
        public mass: number = 1.0;

        /**
         * Tile width.
         * @type {number}
         */
        public width: number;

        /**
         * Tile height.
         * @type {number}
         */
        public height: number;

        /**
         * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating collision directions.
         * @type {number}
         */
        public allowCollisions: number;

        /**
         * Indicating collide with any object on the left.
         * @type {bool}
         */
        public collideLeft: bool = false;

        /**
         * Indicating collide with any object on the right.
         * @type {bool}
         */
        public collideRight: bool = false;

        /**
         * Indicating collide with any object on the top.
         * @type {bool}
         */
        public collideUp: bool = false;

        /**
         * Indicating collide with any object on the bottom.
         * @type {bool}
         */
        public collideDown: bool = false;

        /**
         * Enable separation at x-axis.
         * @type {bool}
         */
        public separateX: bool = true;

        /**
         * Enable separation at y-axis.
         * @type {bool}
         */
        public separateY: bool = true;

        /**
         * A reference to the tilemap this tile object belongs to.
         * @type {Tilemap}
         */
        public tilemap: Phaser.Tilemap;

        /**
         * The index of this tile type in the core map data.
         * For example, if your map only has 16 kinds of tiles in it,
         * this number is usually between 0 and 15.
         * @type {number}
         */
        public index: number;

        /**
         * Clean up memory.
         */
        public destroy() {

            this.tilemap = null;

        }

        /**
         * Set collision configs.
         * @param collision {number} Bit field of flags. (see Tile.allowCollision)
         * @param resetCollisions {bool} Reset collision flags before set.
         * @param separateX {bool} Enable seprate at x-axis.
         * @param separateY {bool} Enable seprate at y-axis.
         */
        public setCollision(collision: number, resetCollisions: bool, separateX: bool, separateY: bool) {

            if (resetCollisions)
            {
                this.resetCollision();
            }

            this.separateX = separateX;
            this.separateY = separateY;

            this.allowCollisions = collision;

            if (collision & Phaser.Types.ANY)
            {
                this.collideLeft = true;
                this.collideRight = true;
                this.collideUp = true;
                this.collideDown = true;
                return;
            }

            if (collision & Phaser.Types.LEFT || collision & Phaser.Types.WALL)
            {
                this.collideLeft = true;
            }

            if (collision & Phaser.Types.RIGHT || collision & Phaser.Types.WALL)
            {
                this.collideRight = true;
            }

            if (collision & Phaser.Types.UP || collision & Phaser.Types.CEILING)
            {
                this.collideUp = true;
            }

            if (collision & Phaser.Types.DOWN || collision & Phaser.Types.CEILING)
            {
                this.collideDown = true;
            }

        }

        /**
         * Reset collision status flags.
         */
        public resetCollision() {

            this.allowCollisions = Phaser.Types.NONE;
            this.collideLeft = false;
            this.collideRight = false;
            this.collideUp = false;
            this.collideDown = false;

        }

        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the object.
        **/
        public toString(): string {

            return "[{Tile (index=" + this.index + " collisions=" + this.allowCollisions + " width=" + this.width + " height=" + this.height + ")}]";

        }

    }

}