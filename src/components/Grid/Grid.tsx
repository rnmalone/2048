import React, { ReactElement } from 'react';
import { IPosition, ITile } from '../../types/Tile';
import Tile from "../Tile";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { blankTiles } from '../../lib';

import { TRANSITION_TIMER } from "../../app.config";

import './Grid.scss';

export interface IGrid {
    tiles: ITile[];
    colorPalette: string;
    renderInstructions(): ReactElement | null;
    renderGameStatus(): ReactElement | null;
}


export default function Grid({
                                 tiles,
                                 colorPalette,
                                 renderInstructions,
                                 renderGameStatus
}: IGrid) {
    const getTileStyle = ({ x, y }: IPosition) => {
        return {
            transform: `translate(${ x * 100 }%, ${ y * 100 }%)`
        }
    };

    return (
        <section className="Grid">
            {renderGameStatus()}
            {renderInstructions()}
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
