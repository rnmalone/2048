import React, {useState} from 'react';
import cx from 'classnames'

import './ResetGame.scss';
import {onUse} from "../../lib";

interface IResetGame {
    onReset(): void;
}

export default function ResetGame({onReset}: IResetGame) {
    const [showWarning, setShowWarning] = useState(false);

    const toggleWarning = (newState: boolean) => () => setShowWarning(newState);
    const resetGame = () => {
        onReset();
        setShowWarning(false)
    };

    return (
        <div className="ResetGame">
            <a {...onUse(toggleWarning(true))} tabIndex={0}>new game</a>
            <div className={cx('ResetGame__options', {
                'ResetGame__options--hide': !showWarning
            })}>
                <a tabIndex={0} {...onUse(toggleWarning(false))}>cancel</a>
                <a tabIndex={0} {...onUse(resetGame)}>confirm</a>
            </div>
        </div>
    )
}
