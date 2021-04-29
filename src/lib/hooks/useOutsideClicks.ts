import { RefObject, useEffect } from "react";

export default function useOutsideClicks(ref: RefObject<HTMLDivElement>, handler: () => void) {
    useEffect(
        () => {
            const listener = (event: any) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event?.target)) {
                    return;
                }

                handler();
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },

        [ref, handler]
    );
}
