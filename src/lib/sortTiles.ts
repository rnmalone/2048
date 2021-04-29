import { IPosition, ITile } from "../types/Tile";

export default function sortTiles(sortKey: keyof IPosition) {
    return (a: ITile, b: ITile) => {
        return a.coord[sortKey] - b.coord[sortKey]
    }
}
