import orderTiles from "../orderTiles";

describe('lib/orderTiles', () => {

    test('Should correctly sort the input array', () => {
        const input = [
            { coord: { x: 2, y: 3 } },
            { coord: { x: 2, y: 0 } },
            { coord: { x: 2, y: 1 } },
            { coord: { x: 0, y: 0 } },
            { coord: { x: 0, y: 1 } },
            { coord: { x: 0, y: 2 } },
            { coord: { x: 3, y: 0 } },
            { coord: { x: 3, y: 1 } },
            { coord: { x: 0, y: 3 } },
            { coord: { x: 1, y: 0 } },
            { coord: { x: 1, y: 2 } },
            { coord: { x: 1, y: 3 } },
            { coord: { x: 2, y: 2 } },
            { coord: { x: 1, y: 1 } },
            { coord: { x: 3, y: 2 } },
            { coord: { x: 3, y: 3 } },
        ]

        const expected = [
            { coord: { x: 0, y: 0 } },
            { coord: { x: 0, y: 1 } },
            { coord: { x: 0, y: 2 } },
            { coord: { x: 0, y: 3 } },
            { coord: { x: 1, y: 0 } },
            { coord: { x: 1, y: 1 } },
            { coord: { x: 1, y: 2 } },
            { coord: { x: 1, y: 3 } },
            { coord: { x: 2, y: 0 } },
            { coord: { x: 2, y: 1 } },
            { coord: { x: 2, y: 2 } },
            { coord: { x: 2, y: 3 } },
            { coord: { x: 3, y: 0 } },
            { coord: { x: 3, y: 1 } },
            { coord: { x: 3, y: 2 } },
            { coord: { x: 3, y: 3 } },
        ]

        expect(orderTiles(input as any)).toEqual(expected)
    })

})