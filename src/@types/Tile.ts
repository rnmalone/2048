export interface IPosition {
    x: number;
    y: number
}

export interface ITile {
    id: string,
    coord: IPosition
    value: number;
    merged?: boolean;
}
