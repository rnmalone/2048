import React, {useState} from 'react';
import cx from 'classnames'

import './ResetGame.scss';

interface IResetGame {
    onReset(): void;
}

export default function ResetGame({ onReset }: IResetGame) {
    const [showWarning, setShowWarning] = useState(false);

    const toggleWarning = (newState: boolean) => () => setShowWarning(newState);
    const resetGame = () => {
        onReset();
        setShowWarning(false)
    };

    return (
        <div className="ResetGame">
            <a onClick={toggleWarning(true)}>new game</a>
                <div className={cx('ResetGame__options', {
                    'ResetGame__options--hide': !showWarning
                })}>
                    <a onClick={toggleWarning(false)}>cancel</a>
                    <a onClick={resetGame}>confirm</a>
                </div>
        </div>
    )
}
