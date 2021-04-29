import blankTiles from "../blankTiles";
import isEqual from 'lodash.isequal';
import { ITile } from "../../types/Tile";
import generateTile from "../generateTile";

describe('lib/startGame', () => {

    test('Should always generate a tile in a position not occupied by a tile', () => {
        blankTiles.forEach(({ coord: tilePosition }: ITile, i: number, arr: ITile[]) => {
            const tilesWithFreePosition = arr.filter((tile: ITile) => !isEqual(tile.coord, tilePosition));

            expect(generateTile(tilesWithFreePosition, 4).coord).toEqual(tilePosition)
        })
    })

});
