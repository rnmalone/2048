import React, {useEffect} from 'react';
import cx from 'classnames';
import './Tile.scss';
import {CSSTransition} from "react-transition-group";
import {Color} from "../../@types/Color";

export default function Tile({ colorPalette, id, style, value}) {

    return (
        <div style={style} className={cx('Tile', {
            [`Tile--warm-${value}`]: colorPalette === Color.Warm
        })}>
            {value}
        </div>
    )
}
