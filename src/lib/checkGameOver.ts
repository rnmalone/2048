import {ITile} from "../@types/Tile";

export default function checkGameOver(tiles: ITile[]): boolean {
    return Array(4)
        .fill(null)
        .every((_: any, i: number) => tiles.some(({coord}) => coord.x === i) && tiles.some(({coord}) => coord.y === i))
}
