import React, {useEffect} from 'react';

import './Tile.scss';
import {CSSTransition} from "react-transition-group";

export default function Tile({id, style, value}) {

    return (
        <CSSTransition
            in
            key={id}
            timeout={500}
            classNames="Tile"
            unmountOnExit
        >
        <div style={style} className="Tile">
            {value}
        </div>
        </CSSTransition>
    )
}
