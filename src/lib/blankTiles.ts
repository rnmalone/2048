const blankTiles = Array(4).fill(null).reduce((a, _: any, row) => [
        ...a,
        ...Array(4).fill(null).map((_: any, i: number) => ({
            coord: {
                x: row,
                y: i
            }
        }))
    ], []
);

export default blankTiles;
