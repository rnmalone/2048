import React from 'react';
import Button from "../Button";

import '../../styles/template/large-tile.scss';

interface IGameWon {
    close(): void;
}

export default function GameWon({ close }: IGameWon) {

    return (
        <div className="large-tile-popover">
            <h2>Game Won</h2>
            <Button
                label="continue game"
                onClick={close}
            >
                keep playing
            </Button>
        </div>
    )
}