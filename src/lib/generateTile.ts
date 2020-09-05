import {ITile} from "../@types/Tile";
import { v4 } from 'uuid'

export default function generateTile(tiles: ITile[], gridSize: number) {
    const random = () => Math.floor(Math.random() * gridSize);
    let newCoord = [random(), random()]

    while (tiles.some((tile) => newCoord[0] === tile.coord[0] && newCoord[1] === tile.coord[1])) {
        newCoord = [random(), random()]
    }

    return {
        id: v4(),
        coord: newCoord,
        value: 2
    }
}
