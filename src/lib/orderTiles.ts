import { ITile } from "../types";

/**
 * Sorts the tiles by their coordinates
 *
 * @param tiles
 */
export default function orderTiles(tiles: ITile[]) {
    return tiles.sort((a: ITile, b: ITile) => {
         if(a.coord.x === b.coord.x) {
             return a.coord.y - b.coord.y
         }

         return a.coord.x - b.coord.x
    })
}