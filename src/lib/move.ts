import {IPosition, ITile} from "../@types/Tile";
import {Direction} from "./getMoveDirection";


export default function move(direction: Direction, grid: ITile[]) {
    let scoreDelta = 0;
    const positionKey: keyof IPosition = (direction === Direction.Up || direction === Direction.Down) ? 'y': 'x';
    const inverseArray = direction === Direction.Left || direction === Direction.Up;
    const nextItemIndex = (i: number) => inverseArray ? i + 1 : i - 1;
    let newTiles: ITile[] = [];


    for(let i = 0; i < 4; i++) {
        const set = grid.filter((item) => item.coord[positionKey === 'y' ? 'x' : 'y'] === i);

        const stagedRemovals: string[] = [];
        if(set.length) {
            const reduceSet = (a: ITile[], item: ITile, i: number, arr: ITile[]) => {
                const nextItemI = nextItemIndex(i)
                const potentialMerge = arr[nextItemI]
                // console.log(item.id, potentialMerge?.id, arr);

                let newValue = item.value;
                let toRemove = false;
                let newCoord = item.coord;

                // console.log(stagedRemovals)

                // this tile is merged with previous. Ignore it.
                if(stagedRemovals.includes(item.id)) {
                    toRemove = true
                    newCoord = {
                        ...newCoord,
                        [positionKey]: a[i - 1]?.coord[positionKey]
                    }
                } else

                // This tile has the same value as the next
                // Mark this tile for removal
                if (potentialMerge?.value === item.value) {
                    // mergedIndexes.push(i);
                    stagedRemovals.push(potentialMerge.id)
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
                set.reduce(reduceSet, []) :
                set.reduceRight(reduceSet, []);

            console.log(reducedSet)

            const isInverse = direction === Direction.Down || direction === Direction.Right;


            const shift = (a: ITile[], item: ITile, i: number, arr: ITile[]) => {
                const previous = a[i -1];
                let newPosition;

                if(i === 0) {
                    newPosition = isInverse ? 3 : 0;
                } else if(item.toRemove) {
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

            const shifted = reducedSet.reduce(shift, []);

            const arrangedItem = inverseArray ? shifted : shifted.reverse()

            newTiles = [...newTiles, ...arrangedItem ]
        }
    }

    return { newTiles, scoreDelta }
}
