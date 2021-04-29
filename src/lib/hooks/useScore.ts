import { useEffect, useState } from "react";

export default function useScore() {
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>(0);

    useEffect(() => {
        const retrievedHighScore = localStorage.getItem('2048-game-hs');

        if (retrievedHighScore) {
            setHighScore(Number(JSON.parse(retrievedHighScore)))
        }
    }, []);

    useEffect(() => {
        if (score > highScore) {
            localStorage.setItem('2048-game-hs', `${ score }`);
            setHighScore(score)
        }
    }, [score]);

    return { score, setScore, highScore }
}
