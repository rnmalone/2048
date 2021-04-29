import { ITile } from "../types/Tile";
import orderTiles from "./orderTiles";

/**
 * Checks if the tiles can be moved again
 *
 * If not then the game is over
 *
 * @param input
 */
export default function checkGameOver(input: ITile[]): boolean {
    const tiles = input

    let canMove = tiles.length < 16;

    let i = 0
    while(!canMove) {
        const offset = i > 0 ? (i * 4) - 1 : 0;
        try {
            canMove = (
                /** x **/ tiles[i + offset]?.value === (i < 4 ? tiles[i + offset + 4]?.value : -1) ||
                /** y **/ tiles[i + offset]?.value === (i < 4 ? tiles[i + offset + 1]?.value : -1)
            )
        } finally {
            i++;
        }

        if(i === 4) break;
    }

    console.log(tiles)


    return !canMove
}
