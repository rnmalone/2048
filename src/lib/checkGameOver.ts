import {ITile} from "../@types/Tile";

export default function checkGameOver(tiles: ITile[]): boolean {
    return Array(4)
        .fill(null)
        .every((_: any, x: number) => Array(4)
            .fill(null)
            .every((_: any, y:number ) =>
                tiles.some((tile: ITile) => tile.coord.x === x && tile.coord.y === y)
        ))
}
