import {IPosition, ITile} from "../@types/Tile";
import {Direction} from "./getMoveDirection";


export default function move(direction: Direction, grid: ITile[]) {
    const positionKey: keyof IPosition = (direction === Direction.Up || direction === Direction.Down) ? 'y': 'x';

    let newGrid: ITile[] = []

    for(let i = 0; i < 4; i++) {
        const set = grid.filter((item) => item.coord[positionKey === 'y' ? 'x' : 'y'] === i);

        if(set.length) {
            const mergedIndexes: number[] = []
            const reduceSet = (a: ITile[], item: ITile, i: number, arr: ITile[]) => {
                let newValue = item.value;

                // If the previous tile is merged with this tiles value it needs to be removed
                if (mergedIndexes.includes(i - 1)) {
                    return a
                }

                // The next tile has the same value so merged them
                if (arr[i + 1]?.value === item.value) {
                    mergedIndexes.push(i);
                    newValue = item.value * 2;
                }

                return [
                    ...a,
                    {
                        ...item,
                        value: newValue
                    }
                ]
            }
            const reducedSet = direction === Direction.Up || direction === Direction.Left ?
                [...set].reverse().reduce(reduceSet, []) :
                [...set].reduce(reduceSet, []);

            const shift = (item: ITile, i: number, arr: ITile[]) => ({
                ...item,
                coord: {
                    ...item.coord,
                    [positionKey]: direction === Direction.Down || direction === Direction.Right ? (4 - arr.length) + i : i
                }
            })

            const shifted = direction === Direction.Up || direction === Direction.Left ? reducedSet.reverse().map(shift) : reducedSet.map(shift)

            newGrid = [...newGrid, ...shifted]
        }
    }

    return newGrid
}
