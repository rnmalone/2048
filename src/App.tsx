import React, { KeyboardEvent, useEffect, useState } from 'react';
import isEqual from 'lodash.isequal';
import { ITile } from "./types";
import { generateTile, getKeyboardMoveDirection, move, startGame } from "./lib";
import { useScore } from "./lib/hooks";
import { useSwipeable } from 'react-swipeable'
import { Direction } from "./lib/getKeyboardMoveDirection";
import { APP_COLOR_THEMES, LOCAL_STORAGE_KEY, TRANSITION_TIMER } from "./app.config";
import { Button, ColorPalette, GameWon, Grid, ResetGame, Score } from './components';
import getGameStatus, { GameStatus } from "./lib/getGameStatus";
import GameOver from "./components/GameOver";
import Instructions from "./components/Instructions";
import NewGame from "./components/NewGame";

function App() {
    const [showInstructions, setShowInstructions] = useState<boolean>(false);
    const [status, setStatus] = useState<GameStatus>(GameStatus.Playing);
    const [keepPlaying, setKeepPlaying] = useState<boolean>(false);
    const [blocked, setBlocked] = useState<boolean>(false);
    const [colorPalette, setPalette] = useState<string>(APP_COLOR_THEMES[0]);
    const { score, setScore, highScore } = useScore();
    const toggleColor = (color: string) => () => void setPalette(color);
    const toggleInstructions = () => void setShowInstructions(oldState => !oldState);
    const [tiles, setTiles] = useState<ITile[]>(startGame());
    const [showGameReset, setShowGameReset] = useState<boolean>(false)
    const toggleGameReset = () => setShowGameReset(s => !s)

    useEffect(() => {
        const retrievedGame: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (retrievedGame) {
            const parsed = JSON.parse(retrievedGame);

            if (parsed?.tiles) {
                const tiles = parsed.tiles.filter((tile: ITile) => !tile?.toRemove)
                setScore(parsed.score);
                setTiles(tiles)
                setStatus(getGameStatus(tiles, keepPlaying))
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ score, tiles }));
        setStatus(getGameStatus(tiles, keepPlaying))
    }, [tiles]);

    const resetGame = () => {
        setScore(0);
        setStatus(GameStatus.Playing);
        setTiles(startGame())
        setShowGameReset(false)
    };

    const handleAction = (direction: Direction) => {
        if (blocked || status === GameStatus.Failed) return void 0;
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

    const continueGame = () => {
        setKeepPlaying(true)
    }

    const renderGameStatus = () => {
        if(status === GameStatus.Failed) {
            return <GameOver onReset={ resetGame }/>
        }

        if(status === GameStatus.Won && !keepPlaying) {
            return (
                <GameWon
                    close={continueGame}
                />
            )
        }

        return null;
    }

    const renderInstructions = () => {
        return  showInstructions ? <Instructions onClose={ toggleInstructions }/> : null
    }

    return (
        <div
            className="App"
            onKeyDown={ onKeyDown }
            tabIndex={ 0 }
            { ...mobileSwipeHandlers }
        >
            <Score score={ String(score) }/>
            <Grid
                renderInstructions={renderInstructions}
                renderGameStatus={renderGameStatus}
                colorPalette={ colorPalette }
                tiles={ tiles }
            />
            <span className="App__high-score">
                {`Highest: ${highScore}`}
            </span>
            <div className="App__actions">
                <Button
                    label="new game"
                    onClick={toggleGameReset}
                    >
                    New Game
                </Button>
                <Button
                    label="instructions"
                    onClick={ toggleInstructions }
                >
                    How to play
                </Button>
            </div>
            <ColorPalette toggle={ toggleColor }/>
            {showGameReset && (<NewGame
                onContinue={resetGame}
                onClose={toggleGameReset}/>
            )}

        </div>
    );
}

export default App;
