import React from 'react';
import { ITile } from '../../@types/Tile';

import './Grid.scss';
import Tile from "../Tile";

export interface IGrid {
    tiles: ITile[];
    gridSize: number;
}

export default function Grid({ tiles }: IGrid) {

    const getTileStyle = ([x, y]: number[]) => {
        return {
            transform: `translate(${x * 100}px, ${y * 100}px)`
        }
    }

    return (
        <section>
            {
                tiles.map(({
                    coord,
                    value,
                    id
                }) => (
                    <Tile
                        key={id}
                        value={value}
                        style={getTileStyle(coord)}
                    />
                ))
            }
        </section>
    )
}
