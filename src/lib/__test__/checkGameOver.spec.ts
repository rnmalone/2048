import checkGameOver from "../checkGameOver";
import fullBoard from "../blankTiles";

describe('lib/checkGameOver', () => {

    test('Should return true if all tile positions filled and cant be merged', () => {
        expect(checkGameOver(fullBoard)).toBe(true)
    })

    test('Should return false if not all positions filled', () => {
        const board = [...fullBoard].slice(0, 10);
        expect(checkGameOver(board)).toBe(false)
    })

    test('Should return false if all positions filled but two adjacent numbers of same value exist', () => {
        const board = [
            ...fullBoard.filter((_, i) => i < 14),
            {
                id: '1',
                value: 512,
                coord: {
                    x: 3,
                    y: 2
                }
            },
            {
                id: '2',
                value: 512,
                coord: {
                    x: 3,
                    y: 3
                }
            },
        ]

        expect(board.length).toEqual(16)
        expect(checkGameOver(board)).toBe(false)
    })
})
