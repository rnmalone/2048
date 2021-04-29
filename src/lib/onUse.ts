import { KeyboardEvent } from 'react';

export default function onUse(fn: (...args: any) => any) {

    return {
        onKeyDown: (event: KeyboardEvent<any>) => {
            if (event.key === 'Enter') fn();
        },
        onClick: fn
    }
}
