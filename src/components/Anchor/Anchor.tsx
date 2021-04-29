import React from 'react';
import { onUse } from "../../lib";

interface IAnchorProps {
    children: string;

    onClick(): void;
}

const Anchor = ({ onClick, children }: IAnchorProps) => (
    <a
        tabIndex={ 0 }
        { ...onUse(onClick) }
    >
        { children }
    </a>
);

export default Anchor;
