import React, {useEffect} from 'react';

import './Tile.scss';
import {CSSTransition} from "react-transition-group";

export default function Tile({id, style, value}) {

    return (

            <div style={style} className="Tile">
                {value}
            </div>
    )
}
