import React, {KeyboardEvent, useState} from 'react';
import isEqual from 'lodash.isEqual';
import {ITile} from "./@types/Tile";
import {generateTile, getMoveDirection, move, startGame} from "./lib";
import Grid from "./components/Grid";
import {Color} from './@types/Color';
import Score from "./components/Score";

function App() {
    const [blocked, setBlocked] = useState<boolean>(false);
    const [colorPalette, setPalette] = useState<Color>(Color.Warm);
    const [score, setScore] = useState<number>(0);
    const [gridSize, setGridSize] = useState(4);
    const [tiles, setTiles] = useState<ITile[]>(startGame());

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (blocked) return void 0;
        setBlocked(true);
        const direction = getMoveDirection(event);
        if (direction) {
            const {newTiles, scoreDelta} = move(direction, tiles);
            if (scoreDelta) {
                setScore((oldState) => oldState + scoreDelta)
            }
            if (!isEqual(newTiles, tiles)) {
                setTiles(newTiles);

                setTimeout(() => {
                    requestAnimationFrame(() => {
                        setTiles(oldState => [...oldState.filter(({mergedWithId}) => !mergedWithId),  generateTile(newTiles, gridSize)])
                        setBlocked(false)
                    });
                }, 500)
            }
        } else {
            setBlocked(false)
        }
    };

    return (
        <div className="App" onKeyDown={onKeyDown} tabIndex={0}>
            <Score score={String(score)}/>
            <Grid colorPalette={colorPalette} tiles={tiles} gridSize={gridSize}/>
        </div>
    );
}

export default App;
