import { ITile } from "../types/Tile";

const blankTiles: ITile[] = (Array(4).fill(null).reduce((a, _: any, row) => [
        ...a,
        ...Array(4).fill(null).map((_: any, i: number) => ({
            coord: {
                x: row,
                y: i
            }
        }))
    ], []
).map((tile: ITile, i: number) => ({ ...tile, value: i })))

export default blankTiles;
