import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../../app.config";

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
            localStorage.setItem(LOCAL_STORAGE_KEY + '-hs', `${ score }`);
            setHighScore(score)
        }
    }, [score]);

    return { score, setScore, highScore }
}
