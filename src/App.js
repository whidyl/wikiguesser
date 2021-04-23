import React, { useState } from 'react'
import Quiz from './components/Quiz'
import ConfigureQuiz from './components/ConfigureQuiz'

const App = () => {
    const [appState, setAppState] = useState("config");
    const [timeLimit, setTimeLimit] = useState(1);
    const [location, setLocation] = useState('US');
    const [enableTyped, setEnableTyped] = useState(false);
    const [score, setScore] = useState(0);

    const appContent = () => {
        
        switch(appState) {
            case "config":
                return <ConfigureQuiz timeLimit={timeLimit} onTimeLimitChange={setTimeLimit} location={location} onLocationChange={setLocation} enableTyped={enableTyped} setEnableTyped={setEnableTyped} startGame={() => setAppState("playing")} />;
            case "playing":
                return <Quiz timeLimit={timeLimit} score={score} setScore={setScore}/>
            default:
                return <h1>Something went wrong.</h1>
        }
    }

    return(appContent()); 
}

export default App;