import {ITile} from "../@types/Tile";

/*
 * We need to preserve the order of tiles so they render smoothly
 */
export default function reorderTiles(original: ITile[], unordered: ITile[]) {
    return original.map(({ id }) => unordered.find((_new) => _new.id === id)!)
}
