import React, { useState } from 'react';
import cx from 'classnames'
import Anchor from "../Anchor";

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
            <Anchor onClick={ toggleWarning(true) }>new game</Anchor>
            <div className={ cx('ResetGame__options', {
                'ResetGame__options--hide': !showWarning
            }) }>
                <Anchor onClick={ toggleWarning(false) }>cancel</Anchor>
                <Anchor onClick={ resetGame }>confirm</Anchor>
            </div>
        </div>
    )
}
