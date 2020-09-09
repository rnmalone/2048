import checkGameOver from "../checkGameOver";
import fullBoard from "../blankTiles";

describe('lib/checkGameOver', () => {

    test('Should return true if all tile positions filled' , () => {
        expect(checkGameOver(fullBoard)).toBe(true)
    })

    test('Should not be game over if not all positions filled', () => {
        fullBoard.splice(0, 1);
        expect(checkGameOver(fullBoard)).toBe(false)
    })
})
