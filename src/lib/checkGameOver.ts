import { ITile } from "../types";
import orderTiles from "./orderTiles";

/**
 * Checks if the tiles can be moved again
 *
 * If not then the game is over
 *
 * @param input
 */
export default function checkGameOver(input: ITile[]): boolean {
    const tiles = orderTiles(input)
    let canMove = tiles.length < 16;

    let i = 0
    while (!canMove) {
        const offset = i > 0 ? (i * 4) - 1 : 0;

        canMove = (
            tiles[i + offset]?.value === (i < 4 ? tiles[i + offset + 4]?.value : -1) ||
            tiles[i + offset + 1]?.value === (i < 4 ? tiles[i + offset + 4 + 1]?.value : -1) ||
            tiles[i + offset + 2]?.value === (i < 4 ? tiles[i + offset + 4 + 2]?.value : -1) ||
            tiles[i + offset + 3]?.value === (i < 4 ? tiles[i + offset + 4 + 3]?.value : -1) ||
            tiles[i + offset]?.value === (i < 4 ? tiles[i + offset + 1]?.value : -1) ||
            tiles[i + offset + 1]?.value === (i < 4 ? tiles[i + offset + 1 + 1]?.value : -1) ||
            tiles[i + offset + 2]?.value === (i < 4 ? tiles[i + offset + 1 + 2]?.value : -1) ||
            tiles[i + offset + 3]?.value === (i < 4 ? tiles[i + offset + 1 + 3]?.value : -1)
        )
        i++;

        if (i === 3) break;
    }

    return !canMove
}
