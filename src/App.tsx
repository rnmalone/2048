import React, {KeyboardEvent, useState} from 'react';
import './App.css';
import isEqual from 'lodash.isEqual';
import {ITile} from "./@types/Tile";
import {generateTile, getMoveDirection, move} from "./lib";
import Grid from "./components/Grid";
import {Direction} from "./lib/getMoveDirection";

function App() {
  const startGame = () => {
    const tile1 = generateTile([], gridSize)
    const tile2 = generateTile([tile1], gridSize)

    return [tile1, tile2]
  };
  const [score, setScore] = useState<number>(0);
  const [gridSize, setGridSize] = useState(4);
  const [tiles, setTiles] = useState<ITile[]>(startGame());
  // const [tiles, setTiles] = useState<ITile[]>([
  //   {
  //     id: '1',
  //     value: 16,
  //     coord: {
  //       y: 0,
  //       x: 0
  //     }
  //   },
  //   {
  //     id: '2',
  //     value: 16,
  //     coord: {
  //       y: 0,
  //       x: 1
  //     }
  //   },
  //   {
  //     id: '3',
  //     value: 16,
  //     coord: {
  //       y: 0,
  //       x: 2
  //     }
  //   },
  //   {
  //     id: '4',
  //     value: 16,
  //     coord: {
  //       y: 0,
  //       x: 3
  //     }
  //   }
  // ]);


  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const direction = getMoveDirection(event);
    if(direction) {
      const { newTiles, scoreDelta } = move(direction, tiles);
      if(scoreDelta) {
        setScore((oldState) => oldState + scoreDelta)
      }
      if(!isEqual(newTiles, tiles)) {
        setTiles([...newTiles, generateTile(newTiles, gridSize)])
      }
    }
  };


  return (
    <div className="App" onKeyDown={onKeyDown} tabIndex={0}>
      <h1>{score}</h1>
      <Grid tiles={tiles} gridSize={gridSize} />
    </div>
  );
}

export default App;
