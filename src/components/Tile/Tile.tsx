import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { TRANSITION_TIMER } from "../../app.config";

import './Tile.scss';

interface ITileComponent {
    colorPalette: string;
    value: number;
    x: number;
    y: number;
    toRemove?: boolean
}

export default function Tile({
                                 colorPalette,
                                 value,
                                 x,
                                 y,
                                 toRemove
                             }: ITileComponent) {
    const [transition, setTransition] = useState('opacity .2s ease-in-out')
    const [style, setStyle] = useState<CSSProperties>(Object.create(null));
    const requestRef = useRef<number | null>(null)

    useEffect(() => {
        setTransition('all .2s ease-in-out')
    }, [])

    const calcStyle = () => void setStyle({
        transition: transition,
        transform: `translate(${ x * 100 }%, ${ y * 100 }%)`,
        zIndex: toRemove ? 0 : 10,
    });

    const endListener = useCallback(() => (node: any, done: any) => {
        node.addEventListener("transitionend", done, false);
    }, []);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(calcStyle);

        return () => cancelAnimationFrame(requestRef.current!)
    }, [x, y]);

    return (
        <div style={ style } className="tile-container">
            <div className={ `Tile Tile--${ colorPalette }-${ value }` }>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={ value }
                        timeout={ TRANSITION_TIMER }
                        addEndListener={ endListener() }
                        classNames="Tile__content"
                    >
                        <p>{ value }</p>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    )
}
