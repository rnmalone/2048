import React, {useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import './Tile.scss';
import {Color} from "../../@types/Color";
import {CSSTransition, SwitchTransition} from 'react-transition-group';

interface ITileComponent {
    colorPalette: Color;
    value: number;
    x: number;
    y: number;
    toRemove: boolean
}

export default function Tile({colorPalette, value, x, y, toRemove}: ITileComponent) {
    const [style, setStyle] = useState();
    const requestRef = useRef();

    const calcStyle = () => void setStyle({
        transform: `translate(${x * 100}px, ${y * 100}px)`,
        zIndex: toRemove ? 0 : 10,
    });

    useEffect(() => {
        requestRef.current = requestAnimationFrame(calcStyle);

        return () => cancelAnimationFrame(requestRef.current)
    }, [x, y]);

    return (
        <div style={style} className={cx('Tile', {
            [`Tile--warm-${value}`]: colorPalette === Color.Warm
        })}>
            <SwitchTransition mode={'out-in'}>
                <CSSTransition
                    key={value}
                    addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                    }}
                    classNames="Tile__content"
                >
                    <p>{value}</p>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}
