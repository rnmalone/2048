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

    test('Should return false if all positions filled but two adjacent numbers of same value exist (x)', () => {
        const board = [
            {
                "id": "b525b9ed-f8c9-445f-a58c-0cf32b01e188",
                "coord": { "x": 0, "y": 0 },
                "value": 16,
                "toRemove": false
            },
            {
                "id": "956a4a79-29b6-4806-af8e-3aa412a2413f",
                "coord": { "x": 0, "y": 1 },
                "value": 2,
                "toRemove": false
            },
            {
                "id": "d21cfc5d-202c-47dc-b097-704dc58c4cfb",
                "coord": { "x": 0, "y": 2 },
                "value": 2,
                "toRemove": false
            },
            {
                "id": "7ff63f56-07c9-40cc-a4d6-411090ef6aed",
                "coord": { "x": 0, "y": 3 },
                "value": 2,
                "toRemove": false
            },
            {
                "id": "db790af1-3095-4775-924b-b578f80c0779",
                "coord": { "x": 1, "y": 0 },
                "value": 32,
                "toRemove": false
            },
            {
                "id": "baf41881-827d-46a5-b2cd-658f9b2709a3",
                "coord": { "x": 1, "y": 1 },
                "value": 8,
                "toRemove": false
            },
            {
                "id": "d817efd0-1431-458d-acdd-d88a0439fb3d",
                "coord": { "x": 1, "y": 2 },
                "value": 4,
                "toRemove": false
            },
            {
                "id": "9627f4a1-b21c-40d6-82b2-36e89147ac3d",
                "coord": { "x": 1, "y": 3 },
                "value": 4,
                "toRemove": false
            },
            {
                "id": "e31fc853-ed2b-44d6-8d35-2540db36d795",
                "coord": { "x": 2, "y": 0 },
                "value": 128,
                "toRemove": false
            },
            {
                "id": "574b8f9c-9398-44a7-8cf8-935486b4bcb7",
                "coord": { "x": 2, "y": 1 },
                "value": 64,
                "toRemove": false
            },
            {
                "id": "e1da8513-1ff6-4731-a30e-d5ea77e851d9",
                "coord": { "x": 2, "y": 2 },
                "value": 16,
                "toRemove": false
            },
            {
                "id": "a933f40a-38ff-40ee-b9d0-01a9089a837b",
                "coord": { "x": 2, "y": 3 },
                "value": 8,
                "toRemove": false
            },
            {
                "id": "7deba023-86a7-4e74-ab26-c29ed8dfbcc4",
                "coord": { "x": 3, "y": 0 },
                "value": 256,
                "toRemove": false
            },
            {
                "id": "c9fa1739-ad91-440f-999e-3b581b061702",
                "coord": { "x": 3, "y": 1 },
                "value": 8,
                "toRemove": false
            },
            {
                "id": "38fde008-8b9f-465c-b69c-1a864cb9f1ee",
                "coord": { "x": 3, "y": 2 },
                "value": 8,
                "toRemove": false
            },
            { "id": "e22c4713-cbcb-41ee-ac14-8aba206347af", "coord": { "x": 3, "y": 3 }, "value": 4, "toRemove": false }
        ]

        expect(board.length).toEqual(16)
        expect(checkGameOver(board)).toBe(false)
    })
})
