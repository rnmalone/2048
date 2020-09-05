import React, {useEffect} from 'react';

import './Tile.scss';

export default function Tile({style, value}) {

    useEffect(() => {
        console.log('mounted')
    }, [])

    return (
        <div style={style} className="Tile">
            {value}
        </div>
    )
}
