import React, { useEffect, useState } from 'react';
import MCQuestion from './MCQuestion';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

const Quiz = ({timeLimit, score, setScore, date, endGame, location}) => {
    const [articles, setArticles] = useState([]);
    const [timeLeft, setTimeLeft] = useState(60*timeLimit);
    const [timerID, setTimerID] = useState("");
    const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * 999));    

    useEffect(() => {
        //TODO: current month and day
        //TODO: if bottom of 1k, do a multiple choice question.
        const fetchArticles = async () => {
            const prevDate = new Date(date);
            prevDate.setDate(prevDate.getDate() - 2);
            
            const year = prevDate.getUTCFullYear();
            const month = (prevDate.getUTCMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2});
            const day = prevDate.getUTCDate().toLocaleString('en-US', {minimumIntegerDigits: 2});

            console.log(`${year}/${month}/${day}`);

            const { data } = await axios.get(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${location}/all-access/${year}/${month}/${day}`);
            setArticles(data.items[0].articles.map(info => info.article));
        }
        fetchArticles();

        //Start timer
        const timerID = startTimer();
        return (() => {
            clearInterval(timerID);
        })
    }, [date, location]);

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

    const pickNewArticle = () => {
        // Pick a new article if it is a list
        let index = Math.floor(Math.random() * 999);
        while (articles[index].includes("List_of")) {
            index = Math.floor(Math.random() * 999);
        }
        setCurrentIndex(index);
    }

    const updateScoreCorrect = () => {
        document.getElementById('correct-audio').play();
        setScore(score + 3);
    }

    const updateScoreWrong = () => {
        document.getElementById('wrong-audio').play();
        setScore(score - 1);
    }

    const timeString = () => {
        var date = new Date(0)
        date.setSeconds(timeLeft)
        return date.toISOString().substr(14, 5);
    }

    const renderQuestion = () => {
        return (
            <div className="question-container">
            <div className="time-remaining">
                <b>
                    {`${timeString()} ${timerID ? "" : "(PAUSED)"}`}
                </b>
                <b style={{float: "right", marginRight: "14%"}}>
                    {`Score:   ${score}`}
                </b>
            </div>
            {
                articles.length > 0 ? 
                <MCQuestion 
                    article={articles[currentIndex]} 
                    pickNewArticle={pickNewArticle} 
                    timeLeft={timeLeft}
                    pauseTimer={pauseTimer} 
                    startTimer={startTimer} 
                    score={score}
                    onUserRight={updateScoreCorrect}
                    onUserWrong={updateScoreWrong}
                /> 
                : 
                null
            }
        </div>
        );
    }

    return (
        articles.length === 0 ? <CircularProgress style={{margin:  "50%"}}/> : renderQuestion()
    );
}

export default Quiz