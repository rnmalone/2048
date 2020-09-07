import {IPosition, ITile} from "../@types/Tile";
import {Direction} from "./getMoveDirection";
import {sortTiles} from "./index";


export default function move(direction: Direction, grid: ITile[]) {
    let scoreDelta = 0;
    const positionKey: keyof IPosition = (direction === Direction.Up || direction === Direction.Down) ? 'y' : 'x';
    const inverseArray = direction === Direction.Left || direction === Direction.Up;
    const isInverse = direction === Direction.Down || direction === Direction.Right;
    const nextItemIndex = (i: number) => inverseArray ? i + 1 : i - 1;
    let newTiles: ITile[] = [];


    for (let i = 0; i < 4; i++) {
        const set = grid.filter((item) => item.coord[positionKey === 'y' ? 'x' : 'y'] === i);

        const stagedRemovals: string[] = [];
        if (set.length) {
            const sortedSetItems = set.sort(sortTiles(positionKey))

            const reduceSet = (a: ITile[], item: ITile, i: number, arr: ITile[]) => {
                const nextItemI = nextItemIndex(i);
                const potentialMerge = arr[nextItemI];

                let newValue = item.value;
                let toRemove = false;
                let newCoord = item.coord;

                // this tile is merged with previous. Ignore it.
                if (stagedRemovals.includes(item.id)) {
                    toRemove = true;
                    newCoord = {
                        ...newCoord,
                        [positionKey]: a[i - 1]?.coord[positionKey]
                    }
                } else

                    // This tile has the same value as the next
                    // Mark this tile for removal
                if (potentialMerge?.value === item.value) {
                    stagedRemovals.push(potentialMerge.id);
                    newValue = item.value * 2;
                    scoreDelta += newValue;
                }

                return [
                    ...a,
                    {
                        ...item,
                        value: newValue,
                        toRemove,
                        coord: newCoord
                    }
                ]
            };

            const reducedSet = inverseArray ?
                sortedSetItems.reduce(reduceSet, []) :
                sortedSetItems.reduceRight(reduceSet, []);

            const shift = (a: ITile[], item: ITile, i: number) => {
                const previous = a[i - 1];
                let newPosition;

                if (i === 0) {
                    newPosition = isInverse ? 3 : 0;
                } else if (item.toRemove) {
                    newPosition = previous?.coord[positionKey]
                } else {
                    newPosition = isInverse ? previous?.coord[positionKey] - 1 : previous?.coord[positionKey] + 1;
                }

                return [
                    ...a,
                    {
                        ...item,
                        coord: {
                            ...item.coord,
                            [positionKey]: newPosition
                        }
                    }
                ]
            };


            const arrangedItem = reducedSet.reduce(shift, []);

            newTiles = [...newTiles, ...arrangedItem];
        }
    }

    return {newTiles, scoreDelta}
}
