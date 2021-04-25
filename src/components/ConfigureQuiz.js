import React from 'react';
import { Button, Card, CardContent, Typography, Select, FormControl, InputLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const ConfigureQuiz = ({location, onLocationChange, timeLimit, onTimeLimitChange, startGame, date}) => {

    //TODO: refactor selector components into single component.
    return(
      <Card className="configure-quiz">
        <CardContent>
            <Typography variant="h2" style={{fontSize: "min(8vw, 8vh, 60px)"}}>WikiGuesser</Typography>
            <Typography color="textSecondary" style={{fontSize: "min(3vw, 20px, 3vh)"}} gutterBottom>
                WikiGuesser is a randomly generated trivia game. You will recieve snippits from random popular Wikipedia articles, but the name of the article will be hidden. See how many articles you can guess within the time limit! You can configure the game below before playing.
            </Typography>
            <Alert severity="info" style={{fontSize: "min(2vw, 14px, 3vh)"}}> WikiGuesser pulls from the 1000 most visited Wikipedia articles of the day. These articles may, by chance, be inappropriate or offensive to some users. </Alert>
            <hr className="divider" />

            <div>
                <div className = "config-options-row">
                <FormControl variant="outlined" size="small">
                    <InputLabel>Time Limit</InputLabel>
                    <Select
                    className="config-options"
                    native
                    label="Time limit"
                    value={timeLimit}
                    onChange={(e) => onTimeLimitChange(e.target.value)}
                    >
                        <option value={3}>3 Minutes</option>
                        <option value={1}>1 Minutes</option>
                        <option value={0.5}>30 Seconds</option>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className="config-options" size="small">
                    <InputLabel>Use articles from</InputLabel>
                    <Select
                    className="config-options"
                    native
                    label="Use articles from"
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                    >
                        <option value={"US"}>United States</option>
                        <option value={"DA"}>Germany</option>
                        <option value={"JP"}>Japan</option>
                        <option value={"MX"}>Mexico</option>
                        <option value={"GB"}>United Kingdom</option>
                        <option value={"CA"}>Canada</option>
                    </Select>
                </FormControl>

                <Button onClick={startGame} className="config-options" variant="outlined" style={{backgroundColor: "#E2ECE9", height: "min(55px, 6vw)"}}><b>Start Round</b></Button>
                </div>
            </div>

            
        </CardContent>
       
      </Card>  
    );
}

export default ConfigureQuiz;