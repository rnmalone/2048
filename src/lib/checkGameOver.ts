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
    if(input.some(({ toRemove }) => toRemove)) {
        return false
    }

    const tiles = orderTiles(input)
    if (tiles.length < 16) {
        return false
    }

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
