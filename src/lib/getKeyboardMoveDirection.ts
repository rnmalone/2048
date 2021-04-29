import { KeyboardEvent } from "react";

export enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}

/**
 * Checks the KeyboardEvent was a valid move
 *
 * @param event
 */
export default function getKeyboardMoveDirection(event: KeyboardEvent<HTMLDivElement>): Direction | undefined {
    if (event.key.toUpperCase() === 'S' || event.key === 'ArrowDown') {
        return Direction.Down
    }

    if (event.key.toUpperCase() === 'W' || event.key === 'ArrowUp') {
        return Direction.Up
    }

    if (event.key.toUpperCase() === 'D' || event.key === 'ArrowRight') {
        return Direction.Right
    }

    if (event.key.toUpperCase() === 'A' || event.key === 'ArrowLeft') {
        return Direction.Left
    }

    return undefined;
}
