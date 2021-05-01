import { ITile } from "../types";

export default function checkGameWon(tiles: ITile[]): boolean {
    return tiles.some(({ value }) => value === 2048)
}