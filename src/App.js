import React, { useState } from 'react'
import Quiz from './components/Quiz'
import ConfigureQuiz from './components/ConfigureQuiz'
import QuizOverScreen from './components/QuizOverScreen'
const App = () => {
    const [appState, setAppState] = useState("config");
    const [timeLimit, setTimeLimit] = useState(1);
    const [location, setLocation] = useState('US');
    const [enableTyped, setEnableTyped] = useState(false);
    const [score, setScore] = useState(0);
    const [date, setDate] = useState(new Date());

    const appContent = () => {
        
        switch(appState) {
            case "config":
                return <ConfigureQuiz timeLimit={timeLimit} onTimeLimitChange={setTimeLimit} location={location} onLocationChange={setLocation} 
                                    enableTyped={enableTyped} setEnableTyped={setEnableTyped} startGame={() => setAppState("playing")} 
                                    date={date} setDate={setDate}/>;
            case "playing":
                return <Quiz timeLimit={timeLimit} score={score} setScore={setScore} date={date} location={location} endGame={() => {setAppState("end")}}/>
            case "end":
                return <QuizOverScreen score={score} timeLimit={timeLimit} restart={() => {setAppState("config");  setScore(0)}}/>;
            default:
                return <h1>Something went wrong.</h1>
        }
    }

    return(<div id="bg">{appContent()}</div>); 
}

export default App;