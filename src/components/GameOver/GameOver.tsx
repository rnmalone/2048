import React from 'react';

import './GameOver.scss';

interface IGameOver {
    onReset(): void;
}

export default function GameOver({ onReset }: IGameOver) {
    return (
        <div className="GameOver">
            <h1>game over</h1>
        </div>
    )
}
