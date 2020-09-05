import React, {useState} from 'react';
import uuid from 'uuid';
import './App.css';
import {ITile} from "./@types/Tile";
import {generateTile} from "./lib";
import Grid from "./components/Grid";

function App() {
  const startGame = () => {
    const tile1 = generateTile([], gridSize)
    const tile2 = generateTile([tile1], gridSize)

    return [tile1, tile2]
  };

  const [gridSize, setGridSize] = useState(4);
  const [tiles, setTiles] = useState<ITile[]>(startGame());


  return (
    <div className="App">
      <Grid tiles={tiles} gridSize={gridSize} />
    </div>
  );
}

export default App;
