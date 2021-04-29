import React from 'react';
import { APP_COLOR_THEMES } from "../../app.config";

import './ColorPalette.scss';

interface IColorPalette {
    toggle(newColor: string): () => void
}

export default function ColorPalette({ toggle }: IColorPalette) {
    return (
        <div className="ColorPalette">
            {
                APP_COLOR_THEMES.map(( value, i: number) => (
                    <span
                        aria-label={ `button-change-color-${ value }` }
                        key={ `${ value }-${ i }` }
                        role="button"
                        tabIndex={ 0 }
                        onClick={ toggle(value) }
                        className={ `ColorPalette__color ColorPalette__color--${ value }` }
                    />
                ))
            }
        </div>
    )
}
