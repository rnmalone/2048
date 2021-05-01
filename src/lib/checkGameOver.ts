import { ITile } from "../types";
import orderTiles from "./orderTiles";

/**
 * Iterates through the tiles to see if the tile at the next x/y position has the same value
 *
 * If there is a match then another move can be made and the game continues
 **
 * @param input
 */
export default function checkGameOver(input: ITile[]): boolean {
    if(input.some(({ toRemove }) => toRemove)) {
        return false
    }

    // Board is not filled
    if (input.length < 16) {
        return false
    }

    const tiles = orderTiles(input)


    return !tiles.some(({ value }, i, arr) => {
        const xPrev = i - 1;
        const xNext = i + 1;
        const yPrev = i - 4;
        const yNext = i + 4;

        return (
            arr[xPrev]?.value === value ||
            arr[xNext]?.value === value ||
            arr[yPrev]?.value === value ||
            arr[yNext]?.value === value
        )
    })

}
