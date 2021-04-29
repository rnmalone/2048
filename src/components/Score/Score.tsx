import React from 'react';

import './Score.scss'

const numberReel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Score({ score }: { score: string }) {

    const getReelStyle = (x: number, digit: number) => {
        const y = (100 / numberReel.length) - ((100 / numberReel.length) * digit);

        return {
            transform: `translate(0, ${ y }%)`,
            transition: `transform ${ (score.length * 150) - (x * 150) }ms ease-in-out`
        }
    };

    return (
        <div className="Score">
            {
                score.split('').map((digit: string, reelNumber: number) => (
                    <div key={ `reel-${ reelNumber }` } className="Score__reel__container">
                        <div
                            className="Score__reel"
                            style={ getReelStyle(reelNumber, Number(digit)) }
                        >
                            {
                                numberReel.map((value, i) => (
                                    <span
                                        key={ `reel-${ reelNumber }-value-${ value }` }
                                    >
                                        { value }
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
