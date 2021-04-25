import { useEffect } from 'react'

const useSoundEffects = (timeLeft, endGame) => {
    useEffect(( () => {
        if (timeLeft === 10) {
            document.getElementById("ticking-audio").play();
            document.getElementById("ticking-audio").loop = true;
        }
        if( timeLeft < 0) {
            document.getElementById("ticking-audio").pause();
            endGame();
        }
    }), [timeLeft])
}

export default useSoundEffects;