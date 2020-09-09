import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import './Tile.scss';
import {Color} from "../../@types/Color";
import {CSSTransition, SwitchTransition} from 'react-transition-group';

interface ITileComponent {
    colorPalette: Color;
    value: number;
    x: number;
    y: number;
    toRemove?: boolean
}

export default function Tile({colorPalette, value, x, y, toRemove}: ITileComponent) {
    const [style, setStyle] = useState<CSSProperties>({});
    const requestRef = useRef();

    const calcStyle = () => void setStyle({
        transform: `translate(${x * 100}%, ${y * 100}%)`,
        zIndex: toRemove ? 0 : 10,
    });

    useEffect(() => {
        // @ts-ignore
        requestRef.current = requestAnimationFrame(calcStyle);

        return () => cancelAnimationFrame(requestRef.current!)
    }, [x, y]);

    return (
        <div style={style} className="tile-container">
            <div className={cx('Tile', {
                [`Tile--warm-${value}`]: colorPalette === Color.Warm,
                [`Tile--cold-${value}`]: colorPalette === Color.Cold,
                [`Tile--forest-${value}`]: colorPalette === Color.Forest,
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
        </div>
    )
}
