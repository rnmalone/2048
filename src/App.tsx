import React, { KeyboardEvent, useEffect, useState } from 'react';
import isEqual from 'lodash.isequal';
import { ITile } from "./types/Tile";
import { checkGameOver, generateTile, getKeyboardMoveDirection, move, startGame } from "./lib";
import { useScore } from "./lib/hooks";
import { useSwipeable } from 'react-swipeable'
import { Direction } from "./lib/getKeyboardMoveDirection";
import { APP_COLOR_THEMES, TRANSITION_TIMER } from "./app.config";
import { Score, Grid, Anchor, ResetGame, ColorPalette } from './components';

function App() {
    const [showInstructions, setShowInstructions] = useState<boolean>(false);
    const [blocked, setBlocked] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [colorPalette, setPalette] = useState<string>(APP_COLOR_THEMES[0]);
    const { score, setScore, highScore } = useScore();
    const toggleColor = (color: string) => () => void setPalette(color);
    const toggleInstructions = () => void setShowInstructions(oldState => !oldState);
    const [tiles, setTiles] = useState<ITile[]>(startGame());

    useEffect(() => {
        const retrievedGame: string | null = localStorage.getItem('2048-game');

        if (retrievedGame) {
            const parsed = JSON.parse(retrievedGame);

            if(parsed?.tiles) {
                const tiles = parsed.tiles.filter((tile: ITile) => !tile?.toRemove)
                setScore(parsed.score);
                setTiles(tiles)
                setGameOver(checkGameOver(tiles))
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('2048-game', JSON.stringify({ score, tiles }));
        if (checkGameOver(tiles)) {
            setGameOver(true)
        }
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
            const { newTiles, scoreDelta } = move(direction, tiles);
            if (scoreDelta) {
                setScore((oldState) => oldState + scoreDelta)
            }
            if (!isEqual(newTiles, tiles)) {
                setTiles(newTiles);

                setTimeout(() => {
                    setTiles(oldState => [
                        ...oldState.filter(({ toRemove }) => !toRemove),
                        generateTile(newTiles, 4)
                    ]);
                    setBlocked(false)
                }, TRANSITION_TIMER)
            } else {
                setBlocked(false)
            }
        } else {
            setBlocked(false)
        }
    };

    const mobileSwipeHandlers = useSwipeable({
        onSwiped: (eventData) => void handleAction(eventData.dir as Direction)
    });

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const direction = getKeyboardMoveDirection(event);

        if (direction) handleAction(direction)
    };

    return (
        <div
            className="App"
            onKeyDown={ onKeyDown }
            tabIndex={ 0 }
            { ...mobileSwipeHandlers }
        >
            <Score score={ String(score) }/>
            <Grid
                showInstructions={ showInstructions }
                closeInstructions={ toggleInstructions }
                gameOver={ gameOver }
                resetGame={ resetGame }
                colorPalette={ colorPalette }
                tiles={ tiles }
                gridSize={ 4 }
            />
            <Anchor onClick={ toggleInstructions }>
                How to play
            </Anchor>
            <ResetGame onReset={ resetGame } />
            <ColorPalette toggle={ toggleColor } />
        </div>
    );
}

export default App;
