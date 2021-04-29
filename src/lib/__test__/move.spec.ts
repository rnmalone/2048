import move from "../move";
import { Direction } from "../getKeyboardMoveDirection";

describe('lib/move', () => {

    test('Should return score delta', () => {
        const values = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

        values.forEach((value: number) => {
            const tileInput = [
                {
                    id: '1',
                    value: value,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: value,
                    coord: {
                        x: 1,
                        y: 0
                    }
                }
            ];

            expect(move(Direction.Right, tileInput).scoreDelta).toEqual(value * 2);
        })
    })

    describe('Direction - Right', () => {
        test('Should merge and shift 2 tiles in a row', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 1,
                        y: 0
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 3,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 3,
                        y: 0
                    }
                }
            ]

            expect(move(Direction.Right, tileInput).newTiles).toEqual(expected)
        });

        test('Should merge and shift 4 tiles in a row', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 1,
                        y: 0
                    }
                },
                {
                    id: '3',
                    value: 2,
                    coord: {
                        x: 2,
                        y: 0
                    }
                },
                {
                    id: '4',
                    value: 2,
                    coord: {
                        x: 3,
                        y: 0
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 2,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 2,
                        y: 0
                    }
                },
                {
                    id: '3',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 3,
                        y: 0
                    }
                },
                {
                    id: '4',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 3,
                        y: 0
                    }
                }
            ]

            expect(move(Direction.Right, tileInput).newTiles).toEqual(expected)
        })

        test('Should move items to rightmost cells', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 16,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 2,
                        y: 0
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 16,
                    toRemove: false,
                    coord: {
                        x: 2,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    toRemove: false,
                    coord: {
                        x: 3,
                        y: 0
                    }
                }
            ];

            expect(move(Direction.Right, tileInput).newTiles).toEqual(expected)
        })
    });

    describe('Direction - Left', () => {
        test('Should merge and shift 2 tiles in a row', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 2,
                    coord: {
                        x: 2,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 3,
                        y: 0
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 0,
                        y: 0
                    }
                }
            ]

            expect(move(Direction.Left, tileInput).newTiles).toEqual(expected)
        });

        test('Should merge and shift 4 tiles in a row', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 1,
                        y: 0
                    }
                },
                {
                    id: '3',
                    value: 2,
                    coord: {
                        x: 2,
                        y: 0
                    }
                },
                {
                    id: '4',
                    value: 2,
                    coord: {
                        x: 3,
                        y: 0
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '3',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 1,
                        y: 0
                    }
                },
                {
                    id: '4',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 1,
                        y: 0
                    }
                }
            ]

            expect(move(Direction.Left, tileInput).newTiles).toEqual(expected)
        })

        test('Should move items to rightmost cells', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 16,
                    coord: {
                        x: 2,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 3,
                        y: 0
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 16,
                    toRemove: false,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    toRemove: false,
                    coord: {
                        x: 1,
                        y: 0
                    }
                }
            ];

            expect(move(Direction.Left, tileInput).newTiles).toEqual(expected)
        })
    })

    describe('Direction - Up', () => {
        test('Should merge and shift 2 tiles in a row', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 2
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 3
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 0,
                        y: 0
                    }
                }
            ]

            expect(move(Direction.Up, tileInput).newTiles).toEqual(expected)
        });

        test('Should merge and shift 4 tiles in a row', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 1
                    }
                },
                {
                    id: '3',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 2
                    }
                },
                {
                    id: '4',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 3
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '3',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 0,
                        y: 1
                    }
                },
                {
                    id: '4',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 0,
                        y: 1
                    }
                }
            ]

            expect(move(Direction.Up, tileInput).newTiles).toEqual(expected)
        })

        test('Should move items to rightmost cells', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 16,
                    coord: {
                        x: 0,
                        y: 1
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 3
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 16,
                    toRemove: false,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    toRemove: false,
                    coord: {
                        x: 0,
                        y: 1
                    }
                }
            ];

            expect(move(Direction.Up, tileInput).newTiles).toEqual(expected)
        })
    })

    describe('Direction - Down', () => {
        test('Should merge and shift 2 tiles in a row', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 1
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 0,
                        y: 3
                    }
                },
                {
                    id: '2',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 0,
                        y: 3
                    }
                }
            ]

            expect(move(Direction.Down, tileInput).newTiles).toEqual(expected)
        });

        test('Should merge and shift 4 tiles in a row', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 1
                    }
                },
                {
                    id: '3',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 2
                    }
                },
                {
                    id: '4',
                    value: 2,
                    coord: {
                        x: 0,
                        y: 2
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 0,
                        y: 2
                    }
                },
                {
                    id: '2',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 0,
                        y: 2
                    }
                },
                {
                    id: '3',
                    value: 2,
                    toRemove: true,
                    coord: {
                        x: 0,
                        y: 3
                    }
                },
                {
                    id: '4',
                    value: 4,
                    toRemove: false,
                    coord: {
                        x: 0,
                        y: 3
                    }
                }
            ]

            expect(move(Direction.Down, tileInput).newTiles).toEqual(expected)
        })

        test('Should move items to rightmost cells', () => {
            const tileInput = [
                {
                    id: '1',
                    value: 16,
                    coord: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    coord: {
                        x: 2,
                        y: 0
                    }
                }
            ];

            const expected = [
                {
                    id: '1',
                    value: 16,
                    toRemove: false,
                    coord: {
                        x: 2,
                        y: 0
                    }
                },
                {
                    id: '2',
                    value: 2,
                    toRemove: false,
                    coord: {
                        x: 3,
                        y: 0
                    }
                }
            ];

            expect(move(Direction.Right, tileInput).newTiles).toEqual(expected)
        })
    });
});
