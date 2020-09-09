import React, {useCallback, useRef} from 'react';
import {useOutsideClicks} from "../../lib/hooks";

import './Instructions.scss';

interface IInstructions {
    onClose(): void
}

export default function Instructions({ onClose }: IInstructions) {
    const ref = useRef(null);

    const handleClose = useCallback(onClose,[]);
    useOutsideClicks(ref, handleClose);

    return (
        <div ref={ref} className="Instructions">
            <h6>How to Play</h6>
            <p>Move the tiles in a direction with the <b>arrow keys or WASD</b> or swipe on mobile. A new tile will appear with each move.</p>
            <p>When two tiles of the same value are next to each other in the direction the board moves they merge into one.</p>
            <p>The aim of the game is to reach 2048. If there are no empty tiles left and no directions to move so your tiles merged it's game over!</p>
        </div>
    )
}
