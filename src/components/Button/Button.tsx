import React from 'react';

import './Button.scss';

interface IButton {
    label: string
    children: string
    onClick(): void;
}

export default function Button({ label, children, onClick }: IButton) {
    return (
        <button
            aria-label={label}
            onClick={onClick}
        >
            {children}
        </button>
    )
}