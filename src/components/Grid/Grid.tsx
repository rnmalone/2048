import React from 'react';
import {IPosition, ITile} from '../../@types/Tile';

import './Grid.scss';
import Tile from "../Tile";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import { Color } from '../../@types/Color';

export interface IGrid {
    tiles: ITile[];
    colorPalette: Color;
    gridSize: number;
}

export default function Grid({ tiles, colorPalette }: IGrid) {

    const getTileStyle = ({x, y}: IPosition) => {
        return {
            transform: `translate(${x * 100}px, ${y * 100}px)`
        }
    };

    return (
        <section className="Grid">
            <TransitionGroup className="todo-list">
                {
                    tiles.map(({
                        coord,
                        value,
                        id
                    }) => (
                        <CSSTransition
                            key={id}
                            timeout={500}
                            classNames="Tile"
                        >
                            <Tile
                                colorPalette={colorPalette}
                                id={id}
                                key={id}
                                value={value}
                                style={getTileStyle(coord)}
                            />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </section>
    )
}
