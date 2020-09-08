import React from 'react';
import {Color} from "../../@types/Color";

import './ColorPalette.scss';

export default function ColorPalette({ toggle }) {
    return (
        <div className="ColorPalette">
            {
                Object.entries(Color).map(([colorKey, value]) => (
                    <span
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
