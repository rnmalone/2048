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

    console.log(input)

    const tiles = orderTiles(input)


    return !tiles.some(({ value }, i, arr) => {
        const xPrev = i - 4;
        const xNext = i + 4;
        const yPrev = i - 1;
        const yNext = i + 1;

        console.log(xPrev, xNext, yPrev, yNext,
            (i % 4 ? arr[xPrev]?.value : 0) === value,
            (xNext % 4 > 0 ? arr[xNext]?.value : 0) === value,
            arr[yPrev]?.value === value,
            arr[yNext]?.value === value)

        return (
            (i % 4 ? arr[xPrev]?.value : 0) === value ||
            (xNext % 4 ? arr[xNext]?.value : 0) === value ||
            arr[yPrev]?.value === value ||
            arr[yNext]?.value === value
        )
    })

}
