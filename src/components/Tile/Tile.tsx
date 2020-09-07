import React, {useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import './Tile.scss';
import {Color} from "../../@types/Color";

export default function Tile({colorPalette, id, value, x, y, mergedWithId}) {
    const [style, setStyle] = useState();
    const requestRef = useRef();

    const calcStyle = () => void setStyle({
        transform: `translate(${x * 100}px, ${y * 100}px)`,
        zIndex: mergedWithId ? 0 : 10,
    });

    useEffect(() => {
        requestRef.current = requestAnimationFrame(calcStyle);

        return () => cancelAnimationFrame(requestRef.current)
    }, [x, y]);

    return (
        <div style={style} className={cx('Tile', {
            [`Tile--warm-${value}`]: colorPalette === Color.Warm
        })}>
            {value}
        </div>
    )
}
