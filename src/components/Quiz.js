import React, { useEffect, useState } from 'react';
import MCQuestion from './MCQuestion';
import TypedQuestion from './TypedQuestion'
import axios from 'axios';

const Quiz = ({timeLimit, score, setScore}) => {
    const [articles, setArticles] = useState([]);
    const [timeLeft, setTimeLeft] = useState(60*timeLimit);
    const [timerID, setTimerID] = useState("");
    const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * 999));

    useEffect(() => {
        //TODO: current month and day
        //TODO: if bottom of 1k, do a multiple choice question.
        const fetchArticles = async () => {
            const { data } = await axios.get('https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/US/all-access/2021/04/21');
            setArticles(data.items[0].articles.map(info => info.article));
            console.log(articles);
        }
        fetchArticles();

        //Start timer
        startTimer();

        return (() => {
            clearInterval(timerID);
        })
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

    const pickNewArticle = () => {
        setCurrentIndex(Math.floor(Math.random() * 999));
    }

    const updateScoreCorrect = () => {
        setScore(score + 3);
    }

    const updateScoreWrong = () => {
        setScore(score - 1);
    }

    const timeString = () => {
        var date = new Date(0)
        date.setSeconds(timeLeft)
        return date.toISOString().substr(14, 5);
    }

    return (
        <div>
            <div className="time-remaining"><b>{`${timeString()} ${timerID ? "" : "(PAUSED)"}`}</b></div>
            {
                articles.length > 0 ? 
                <MCQuestion 
                    article={articles[currentIndex]} 
                    pickNewArticle={pickNewArticle} 
                    pauseTimer={pauseTimer} 
                    startTimer={startTimer} 
                    score={score}/> 
                : 
                null
            }
        </div>
    );
}

export default Quiz