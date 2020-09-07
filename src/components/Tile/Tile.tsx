import React, {useEffect, useMemo, useRef, useState} from 'react';
import cx from 'classnames';
import './Tile.scss';
import {CSSTransition} from "react-transition-group";
import {Color} from "../../@types/Color";
import {IPosition} from "../../@types/Tile";

export default function Tile({ colorPalette, id, value, x, y, toRemove }) {
    const [style, setStyle] = useState();
    const requestRef = useRef()

    const calcStyle = () => void setStyle({
        transform: `translate(${x * 100}px, ${y * 100}px)`,
        zIndex: toRemove ? 0 : 10,
    });

    useEffect(() => {
        requestRef.current = requestAnimationFrame(calcStyle)

        return () => cancelAnimationFrame(requestRef.current)
    }, [x, y])

    return (
        <div style={style} className={cx('Tile', {
            [`Tile--warm-${value}`]: colorPalette === Color.Warm
        })}>
            {value}
        </div>
    )
}
