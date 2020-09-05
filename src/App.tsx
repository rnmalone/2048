import React, {KeyboardEvent, useState} from 'react';
import './App.css';
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

  const [gridSize, setGridSize] = useState(4);
  const [tiles, setTiles] = useState<ITile[]>(startGame());
  // const [tiles, setTiles] = useState<ITile[]>([
  //   {
  //     id: '1',
  //     value: 2,
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
      const newGrid = move(direction, tiles);
      if(JSON.stringify(newGrid) !== JSON.stringify(tiles)) {
        setTiles([...newGrid, generateTile(newGrid, gridSize)])
      }
    }
  };


  return (
    <div className="App" onKeyDown={onKeyDown} tabIndex={0}>
      <Grid tiles={tiles} gridSize={gridSize} />
      <button onClick={() => {
        const newGrid = move(Direction.Up, tiles)

        setTiles(newGrid)
      }}>ergggggg</button>
    </div>
  );
}

export default App;
