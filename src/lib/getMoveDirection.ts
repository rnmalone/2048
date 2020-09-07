import {Key} from "../@types/Key";
import {KeyboardEvent} from "react";

export enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right'
}

export default function getMoveDirection(event: KeyboardEvent<HTMLDivElement>) {
    if (event.which === Key.S || event.which === Key.Down) {
        return Direction.Down
    }
    if (event.which === Key.W || event.which === Key.Up) {
        return Direction.Up
    }
    if (event.which === Key.D || event.which === Key.Right) {
        return Direction.Right
    }

    if (event.which === Key.A || event.which === Key.Left) {
        return Direction.Left
    }

    return undefined;
}
