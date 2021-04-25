import { useEffect, useState } from 'react'

const useTimer = (timeLimit) => {
    const [timeLeft, setTimeLeft] = useState(60*timeLimit);
    const [timerID, setTimerID] = useState("");

    useEffect(() => {
        startTimer();
        return (() => clearInterval(timerID));
    }, []);

    const pauseTimer = () => {
        clearInterval(timerID);
        setTimerID("");
    }

    const startTimer = () => {
        let intervalID = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        setTimerID(intervalID);
    }

    const timeString = () => {
        var date = new Date(0)
        date.setSeconds(timeLeft)
        const str = date.toISOString().substr(14, 5);
        return `${str}${timerID ? "" : " (paused)"}`;
    }

    return [timeString, timeLeft, startTimer, pauseTimer];
}

export default useTimer;