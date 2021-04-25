import React, { useEffect, useState } from 'react';
import MCQuestion from './MCQuestion';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import useSoundEffects from '../hooks/useSoundEffects';
import useTimer from '../hooks/useTimer';
import useArticles from '../hooks/useArticles';

const Quiz = ({timeLimit, score, setScore, date, endGame, location}) => {
    const [articles, pickNewArticle, currentIndex] = useArticles(location, date);
    const [timeString, timeLeft, startTimer, pauseTimer] = useTimer(timeLimit);
    useSoundEffects(timeLeft, endGame);    

    const updateScoreCorrect = () => {
        document.getElementById('correct-audio').play();
        setScore(score + 3);
    }

    const updateScoreWrong = () => {
        document.getElementById('wrong-audio').play();
        setScore(score - 1);
    }


    const renderQuestion = () => {
        return (
            <div className="question-container">
            <div className="time-remaining">
                <b>
                    {timeString()}
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