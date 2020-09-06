import React, {useEffect, useMemo} from 'react';
import cx from 'classnames';
import './Tile.scss';
import {CSSTransition} from "react-transition-group";
import {Color} from "../../@types/Color";
import {IPosition} from "../../@types/Tile";

export default function Tile({ colorPalette, id, value, x, y, toRemove }) {

    const tileStyle = useMemo(() => ({
        transform: `translate(${x * 100}px, ${y * 100}px)`,
        zIndex: toRemove ? 0 : 10,
    }), [x, y])


    useEffect(() => {
        console.log('mounted')
    }, [])

    return (
        <div style={tileStyle} className={cx('Tile', {
            [`Tile--warm-${value}`]: colorPalette === Color.Warm
        })}>
            {value}
        </div>
    )
}
