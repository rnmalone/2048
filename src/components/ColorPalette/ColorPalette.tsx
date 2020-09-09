import React from 'react';
import {Color} from "../../@types/Color";

import './ColorPalette.scss';

interface IColorPalette {
    toggle(newColor: Color): () => void
}

export default function ColorPalette({toggle}: IColorPalette) {
    return (
        <div className="ColorPalette">
            {
                Object.entries(Color).map(([colorKey, value], i: number) => (
                    <span
                        key={`${colorKey}-${i}`}
                        role="button"
                        tabIndex={0}
                        onClick={toggle(value)}
                        className={`ColorPalette__color ColorPalette__color--${value}`}
                    />
                ))
            }
        </div>
    )
}
