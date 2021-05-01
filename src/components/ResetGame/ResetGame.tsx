import React, { useState } from 'react';
import cx from 'classnames'
import Anchor from "../Anchor";
import Button from "../Button";

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
            <Button
                label="reset game"
                onClick={ toggleWarning(true) }
            >
                new game
            </Button>
            <div className={ cx('ResetGame__options', {
                'ResetGame__options--hide': !showWarning
            }) }>
                <Button
                    label="cancel"
                    onClick={ toggleWarning(false) }
                >
                    cancel
                </Button>
                <Button
                    label="confirm"
                    onClick={ resetGame }
                >
                    confirm
                </Button>
            </div>
        </div>
    )
}
