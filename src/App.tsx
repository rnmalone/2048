import React, {KeyboardEvent, useEffect, useState} from 'react';
import isEqual from 'lodash.isequal';
import {ITile} from "./@types/Tile";
import {checkGameOver, generateTile, getKeyboardMoveDirection, move, startGame} from "./lib";
import Grid from "./components/Grid";
import {Color} from './@types/Color';
import Score from "./components/Score";
import {useScore} from "./lib/hooks";
import ResetGame from "./components/ResetGame";
import ColorPalette from "./components/ColorPalette";
import {useSwipeable} from 'react-swipeable'
import {Direction} from "./lib/getKeyboardMoveDirection";

function App() {
    const [blocked, setBlocked] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [colorPalette, setPalette] = useState<Color>(Color.Warm);
    const [gridSize, setGridSize] = useState(4);
    const {score, setScore, highScore} = useScore();
    const toggleColor = (color: Color) => () => void setPalette(color);
    const [tiles, setTiles] = useState<ITile[]>(startGame());

    useEffect(() => {
        const retrievedGame: string | null = localStorage.getItem('2048-game');

        if (retrievedGame) {
            const parsed = JSON.parse(retrievedGame);
            setScore(parsed.score);
            setTiles(parsed.tiles)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('2048-game', JSON.stringify({score, tiles}))
    }, [tiles]);

    const resetGame = () => {
        setScore(0);
        setGameOver(false);
        setTiles(startGame())
    };

    const handleAction = (direction: Direction) => {
        if (blocked || gameOver) return void 0;
        setBlocked(true);
        if (direction) {
            const {newTiles, scoreDelta} = move(direction, tiles);
            if (scoreDelta) {
                setScore((oldState) => oldState + scoreDelta)
            }
            if (!isEqual(newTiles, tiles)) {
                setTiles(newTiles);

                setTimeout(() => {
                    if (tiles.length >= gridSize ** 2 && checkGameOver(newTiles)) {
                        setGameOver(true)
                    } else {
                        setTiles(oldState => [...oldState.filter(({toRemove}) => !toRemove), generateTile(newTiles, gridSize)]);
                        setBlocked(false)
                    }
                }, 500)
            } else {
                setBlocked(false)
            }
        } else {
            setBlocked(false)
        }
    };

    const mobileSwipeHandlers = useSwipeable({onSwiped: (eventData) => void handleAction(eventData.dir as Direction)});

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const direction = getKeyboardMoveDirection(event);

        if (direction) handleAction(direction)
    };

    return (
        <div
            className="App"
            onKeyDown={onKeyDown}
            tabIndex={0}
            {...mobileSwipeHandlers}
        >
            <Score score={String(score)}/>
            <Grid gameOver={gameOver} resetGame={resetGame} colorPalette={colorPalette} tiles={tiles}
                  gridSize={gridSize}/>
            <ResetGame onReset={resetGame}/>
            <ColorPalette toggle={toggleColor}/>
        </div>
    );
}

export default App;
