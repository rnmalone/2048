import React from 'react';
import {IPosition, ITile} from '../../@types/Tile';

import './Grid.scss';
import Tile from "../Tile";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Color} from '../../@types/Color';
import {blankTiles} from '../../lib';
import GameOver from "../GameOver/GameOver";

export interface IGrid {
    tiles: ITile[];
    colorPalette: Color;
    gridSize: number;
    gameOver: boolean;

    resetGame(): void;
}


export default function Grid({gameOver, tiles, colorPalette, resetGame}: IGrid) {
    const getTileStyle = ({x, y}: IPosition) => {
        return {
            transform: `translate(${x * 100}px, ${y * 100}px)`
        }
    };

    return (
        <section className="Grid">
            {gameOver && <GameOver onReset={resetGame}/>}
            {
                blankTiles.map((item: Partial<ITile>, i: number) => <div
                    key={`blank-${i}`}
                    style={getTileStyle(item.coord!)}
                    className="Grid__empty-cell"
                />)
            }
            <TransitionGroup className="todo-list">
                {
                    tiles.map(({
                                   coord,
                                   value,
                                   id,
                                   toRemove
                               }) => (
                        <CSSTransition
                            key={id}
                            timeout={500}
                            classNames="Tile"
                        >
                            <Tile
                                colorPalette={colorPalette}
                                key={id}
                                value={value}
                                toRemove={toRemove}
                                {...coord}
                            />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </section>
    )
}
