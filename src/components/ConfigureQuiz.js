import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Select, FormControl, InputLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const ConfigureQuiz = ({location, onLocationChange, timeLimit, onTimeLimitChange, startGame}) => {

    //TODO: refactor selector components into single component.
    return(
      <Card className="configure-quiz">
        <CardContent>
            <Typography variant="h2">WikiGuesser</Typography>
            <Typography color="textSecondary" gutterBottom>
                WikiGuesser is a pop-culture trivia game. You will recieve snippits from random popular Wikipedia articles, but the name of the article will be hidden. See how many articles you can guess withing the time limit! You can configure the game below before playing.
            </Typography>
            <Alert severity="info"> WikiGuesser pulls from the 1000 most visited Wikipedia articles of the day. These articles may, by chance, be inappropriate or offensive to some users. </Alert>
            <hr className="divider" />

            <div>
                <FormControl variant="outlined">
                    <InputLabel>Time Limit</InputLabel>
                    <Select
                    className="config-options"
                    native
                    label="Time Limit"
                    value={timeLimit}
                    onChange={(e) => onTimeLimitChange(e.target.value)}
                    >
                        <option value={3}>3 Minutes</option>
                        <option value={1}>1 Minutes</option>
                        <option value={0.5}>30 Seconds</option>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className="config-options">
                    <InputLabel>Use articles from</InputLabel>
                    <Select
                    className="config-options"
                    native
                    label="Use articles from"
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                    >
                        <option value={"US"}>United States</option>
                        <option value={"JA"}>Japan</option>
                        <option value={"EU"}>Europe</option>
                    </Select>
                </FormControl>
                <Button onClick={startGame} >Start</Button>
            </div>

            
        </CardContent>
       
      </Card>  
    );
}

export default ConfigureQuiz;