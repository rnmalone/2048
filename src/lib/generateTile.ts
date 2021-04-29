import { ITile } from "../types/Tile";
import { v4 } from 'uuid'


/**
 * Generates a new tile in a random unfilled position.
 *
 * This makes a new tile appear after a move has been made.
 *
 * @param tiles
 * @param gridSize
 */
export default function generateTile(tiles: ITile[], gridSize: number) {
    const random = () => Math.floor(Math.random() * gridSize);
    let newCoord = {
        x: random(),
        y: random()
    };

    while (tiles.some((tile) => newCoord.x === tile.coord.x && newCoord.y === tile.coord.y)) {
        newCoord = {
            x: random(),
            y: random()
        }
    }

    return {
        id: v4(),
        coord: newCoord,
        value: 2,
        toRemove: false
    }
}
