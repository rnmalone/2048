import { ITile } from "../types";

/**
 * Sorts the tiles by their coordinates
 *
 * @param tiles
 */
export default function orderTiles(tiles: ITile[]) {
    return tiles.sort((a: ITile, b: ITile) => {
        const aValue = Number(`${a.coord.x}${a.coord.y}`)
        const bValue = Number(`${b.coord.x}${b.coord.y}`)

        return aValue - bValue
    })
}