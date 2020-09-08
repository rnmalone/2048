import React, {KeyboardEvent, useEffect, useState} from 'react';
import isEqual from 'lodash.isEqual';
import {ITile} from "./@types/Tile";
import {generateTile, getMoveDirection, move, startGame} from "./lib";
import Grid from "./components/Grid";
import {Color} from './@types/Color';
import Score from "./components/Score";
import {useScore} from "./lib/hooks";
import ResetGame from "./components/ResetGame";
import ColorPalette from "./components/ColorPalette";

function App() {
    const [blocked, setBlocked] = useState<boolean>(false);
    const [colorPalette, setPalette] = useState<Color>(Color.Warm);
    const [gridSize, setGridSize] = useState(4);
    const { score, setScore, highScore } = useScore();
    const toggleColor = (color: Color) => () => void setPalette(color);
    const [tiles, setTiles] = useState<ITile[]>(startGame());
    // const [tiles, setTiles] = useState<ITile[]>([
    //     // {
    //     //     id: '1',
    //     //     value: 2,
    //     //     coord: {
    //     //         x: 0,
    //     //         y: 0
    //     //     }
    //     // },
    //     {
    //         id: '2',
    //         value: 2,
    //         coord: {
    //             x: 1,
    //             y: 0
    //         }
    //     },
    //     {
    //         id: '3',
    //         value: 2,
    //         coord: {
    //             x: 2,
    //             y: 0
    //         }
    //     }
    // ]);

    useEffect(() => {
        const retrievedGame: string | null = localStorage.getItem('2048-game');

        if(retrievedGame) {
            const parsed = JSON.parse(retrievedGame);
            setScore(parsed.score);
            setTiles(parsed.tiles)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('2048-game', JSON.stringify({ score, tiles }))
    }, [tiles]);

    const resetGame = () => {
        setScore(0)
        setTiles(startGame())
    };

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
                        setTiles(oldState => [...oldState.filter(({toRemove}) => !toRemove),  generateTile(newTiles, gridSize)])
                        setBlocked(false)
                    });
                }, 500)
            } else {
                setBlocked(false)
            }
        } else {
            setBlocked(false)
        }
    };

    return (
        <div className="App" onKeyDown={onKeyDown} tabIndex={0}>
            <Score score={String(score)}/>
            <Grid colorPalette={colorPalette} tiles={tiles} gridSize={gridSize}/>
            <ResetGame onReset={resetGame} />
            <ColorPalette toggle={toggleColor} />
        </div>
    );
}

export default App;
