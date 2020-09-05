import React from 'react';
import {IPosition, ITile} from '../../@types/Tile';

import './Grid.scss';
import Tile from "../Tile";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export interface IGrid {
    tiles: ITile[];
    gridSize: number;
}

export default function Grid({ tiles }: IGrid) {

    const getTileStyle = ({x, y}: IPosition) => {
        return {
            transform: `translate(${x * 100}px, ${y * 100}px)`
        }
    };

    return (
        <section>
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
