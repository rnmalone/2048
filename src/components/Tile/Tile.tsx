import React from 'react';

import './Tile.scss';

export default function Tile({style, value}) {

    return (
        <div style={style} className="Tile">
            {value}
        </div>
    )
}
