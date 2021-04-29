import { generateTile } from "./index";

/**
 * Generates two random tiles to start the game
 */
const startGame = () => {
    const tile1 = generateTile([], 4);
    const tile2 = generateTile([tile1], 4);

    return [tile1, tile2]
};

export default startGame
