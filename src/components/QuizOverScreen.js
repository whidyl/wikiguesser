import React from 'react'
import {Typography, Card, Button} from '@material-ui/core'

const QuizOverScreen = ({score, timeLimit, restart}) => {
    return(
        <Card className="configure-quiz" style={{flexFlow: "wrap", margin: "20%"}}>
            <Typography variant="h2" style={{fontSize: "min(8vw, 8vh, 60px)"}}> {score > 10 ? "Nice job!" : "Try harder next time..."}</Typography>
            <div style={{width: "100%"}}>
            <Typography variant="h1" style={{fontSize: "min(8vw, 8vh, 30px)"}}> You scored {score} points in {timeLimit*60} seconds.</Typography>
            </div>
            <Button onClick={() => restart()} className="config-options" variant="outlined" style={{backgroundColor: "#E2ECE9", height: "min(55px, 6vw)"}}><b>Play Again</b></Button>
            <Typography color="textSecondary" style={{fontSize: "min(3vw, 20px, 3vh)"}} gutterBottom>
                Thanks for playing!
                
                Contact me at dylan.whst@gmail.com. See how this app works, or check out my other work at <u><a href="https://github.com/whidyl"> https://github.com/whidyl </a></u>
            </Typography>

        </Card>
    );
}

export default QuizOverScreen;