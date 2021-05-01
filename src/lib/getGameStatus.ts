import checkGameWon from "./checkGameWon";
import { ITile } from "../types";
import checkGameOver from "./checkGameOver";

export enum GameStatus {
    Playing,
    Won,
    Failed
}

export default function getGameStatus(tiles: ITile[], keepPlaying: boolean): GameStatus {
    if(!keepPlaying && checkGameWon(tiles)) {
        return GameStatus.Won;
    }

    return checkGameOver(tiles) ? GameStatus.Failed : GameStatus.Playing;
}