import {KeyboardEvent} from 'react';
import {Key} from "../@types/Key";

export default function onUse(fn: (...args: any) => any) {

    return {
        onKeyDown: (event: KeyboardEvent<any>) => {
            if (event.which === Key.Enter) fn();
        },
        onClick: fn
    }
}
