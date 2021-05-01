import React from 'react';

import '../../styles/template/large-tile.scss';

interface IGameOver {
    onReset(): void;
}

export default function GameOver({ onReset }: IGameOver) {
    return (
        <div className="large-tile-popover">
            <h1>game over</h1>
        </div>
    )
}
