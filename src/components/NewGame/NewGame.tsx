import React from 'react';
import Button from "../Button";

import './NewGame.scss'

interface INewGame {
    onContinue(): void;
    onClose(): void;
}

export default function NewGame({ onContinue, onClose }: INewGame) {

    return (
        <div className="NewGame">
            <h6>New Game</h6>
            <div>
                <Button
                    label="start new game"
                    onClick={onContinue}
                >
                    Confirm
                </Button>
                <Button
                    label="cancel"
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}