import React, {KeyboardEvent, useState} from 'react';
import isEqual from 'lodash.isEqual';
import {ITile} from "./@types/Tile";
import {generateTile, getMoveDirection, move} from "./lib";
import Grid from "./components/Grid";
import {Color} from './@types/Color';
import Score from "./components/Score";

function App() {
  const [blocked, setBlocked] = useState<boolean>(false)
  const [colorPalette, setPalette] = useState<Color>(Color.Warm);
  const startGame = () => {
    const tile1 = generateTile([], gridSize)
    const tile2 = generateTile([tile1], gridSize)

    return [tile1, tile2]
  };
  const [score, setScore] = useState<number>(0);
  const [gridSize, setGridSize] = useState(4);
  const [tiles, setTiles] = useState<ITile[]>(startGame());
  // const [tiles, setTiles] = useState<ITile[]>([
  //   // {
  //   //   id: '1hfg',
  //   //   value: 2,
  //   //   coord: {
  //   //     y: 0,
  //   //     x: 0
  //   //   },
  //   //   toRemove: false
  //   // },
  //   {
  //     id: '1231234214',
  //     value: 2,
  //     coord: {
  //       y: 0,
  //       x: 1
  //     },
  //     toRemove: false
  //
  //   },
  //   // {
  //   //   id: 'fhgd2',
  //   //   value: 2,
  //   //   coord: {
  //   //     y: 0,
  //   //     x: 2
  //   //   },
  //   //   toRemove: false
  //   //
  //   //
  //   // },
  //   {
  //     id: 'vzdf',
  //     value: 2,
  //     coord: {
  //       y: 0,
  //       x: 3
  //     },
  //     toRemove: false
  //
  //
  //   },
  // //   // {
  // //   //   id: '3',
  // //   //   value: 2,
  // //   //   coord: {
  // //   //     y: 3,
  // //   //     x: 0
  // //   //   }
  // //   // },
  // //   // {
  // //   //   id: '4',
  // //   //   value: 2,
  // //   //   coord: {
  // //   //     y: 3,
  // //   //     x: 2
  // //   //   }
  // //   // },
  // //   // {
  // //   //   id: '3',
  // //   //   value: 2,
  // //   //   coord: {
  // //   //     y: 1,
  // //   //     x: 0
  // //   //   }
  // //   // },
  // //   // {
  // //   //   id: '4',
  // //   //   value: 2,
  // //   //   coord: {
  // //   //     y: 0,
  // //   //     x: 3
  // //   //   }
  // //   // }
  // ]);


  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if(blocked) return void 0;
    setBlocked(true);
    const direction = getMoveDirection(event);
    if(direction) {
      const { newTiles, scoreDelta } = move(direction, tiles);
      if(scoreDelta) {
        setScore((oldState) => oldState + scoreDelta)
      }
      if(!isEqual(newTiles, tiles)) {
        setTiles([...newTiles, generateTile(newTiles, gridSize)])
        // setTiles(newTiles)
        // console.log(newTiles)

        setTimeout(() => {
          setTiles(oldState => oldState.filter(({ toRemove }) => !toRemove));
          setBlocked(false)
        }, 200)
      }
    } else {
      setBlocked(false)
    }
  };


  return (
    <div className="App" onKeyDown={onKeyDown} tabIndex={0}>
      <Score score={String(score)} />
      <Grid colorPalette={colorPalette} tiles={tiles} gridSize={gridSize} />
    </div>
  );
}

export default App;
