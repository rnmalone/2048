import React from 'react';
import { IPosition, ITile } from '../../types/Tile';
import Tile from "../Tile";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { blankTiles } from '../../lib';
import GameOver from "../GameOver/GameOver";
import Instructions from "../Instructions";
import { TRANSITION_TIMER } from "../../app.config";

import './Grid.scss';

export interface IGrid {
    tiles: ITile[];
    colorPalette: string;
    gridSize: number;
    gameOver: boolean;
    showInstructions: boolean;

    resetGame(): void;

    closeInstructions(): void;
}


export default function Grid({ gameOver, tiles, colorPalette, resetGame, showInstructions, closeInstructions }: IGrid) {
    const getTileStyle = ({ x, y }: IPosition) => {
        return {
            transform: `translate(${ x * 100 }%, ${ y * 100 }%)`
        }
    };

    return (
        <section className="Grid">
            { gameOver && <GameOver onReset={ resetGame }/> }
            { showInstructions && <Instructions onClose={ closeInstructions }/> }
            {
                blankTiles.map((item: Partial<ITile>, i: number) => (
                    <div style={ getTileStyle(item.coord!) } className="tile-container">
                        <div
                            key={ `blank-${ i }` }
                            className="Grid__empty-cell"
                        />
                    </div>))
            }
            <TransitionGroup className="tile-list">
                {
                    tiles.map(({
                                   coord,
                                   value,
                                   id,
                                   toRemove
                               }) => (
                        <CSSTransition
                            key={ id }
                            timeout={ TRANSITION_TIMER }
                            classNames="Tile"
                        >
                            <Tile
                                colorPalette={ colorPalette }
                                key={ id }
                                value={ value }
                                toRemove={ toRemove }
                                { ...coord }
                            />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </section>
    )
}
