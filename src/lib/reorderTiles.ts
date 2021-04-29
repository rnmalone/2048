import { ITile } from "../types/Tile";

/**
 * Reorder the tiles to their original order to preserve transitions
 *
 * @param original
 * @param unordered
 */
export default function reorderTiles(original: ITile[], unordered: ITile[]) {
    return original.map(({ id }) => unordered.find((_new) => _new.id === id)!)
}
