import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, withStyles } from '@material-ui/core';
import shuffleArray from '../utils';

const QButton = withStyles({
    root: {
        background: 'white'
    }
})(Button);

const MCQuestion = ({article, pickNewArticle, pauseTimer, startTimer}) => {
    const [articleExtract, setArticleExtract] = useState("");
    const [articleExtractReveal, setArticleExtractReveal] = useState("");
    const [userSelection, setUserSelection] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchArticle = async () => {
            const { data } = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${article}`);
            // Omit name of article from extract
            var regex = /<b>((.|\n)*?)<\/b>/
            let bolded = data.extract_html.match(regex);

            let wordsInTitle = article.split("_");
            setArticleExtractReveal(data.extract);
            let extractOmitted = data.extract;
            console.log(extractOmitted);
            extractOmitted = extractOmitted.replaceAll(bolded[1], "_____");
            
            wordsInTitle.forEach(word => {extractOmitted = extractOmitted.replaceAll(new RegExp(word, "ig"), "_____")});
            setArticleExtract(extractOmitted);
        }

        const fetchOptions = async () => {
            // Get names of things in related category to use for other options
            const { data } = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=categories&titles=${article}`);
            const pageKey = Object.keys(data.query.pages)[0];
            const categories = data.query.pages[pageKey].categories.splice(0, 3).map(category => category.title.replaceAll(" ", "%20"));

            var optionsTemp = await Promise.all(categories.map(async (category) => {
                const response = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&list=categorymembers&cmlimit=500&cmtitle=${category}`);
                const members = response.data.query.categorymembers;
                return members[[Math.floor(Math.random() * members.length)]].title;
            }))

            optionsTemp.push(article.replaceAll("_", " "));
            shuffleArray(optionsTemp);
            setOptions(optionsTemp);
        }
        fetchArticle();
        fetchOptions();
        console.log(article);  
    }, [article])

    const onUserAnswer = (answer) => {
        setUserSelection(answer);
        pauseTimer();
    } 

    const nextQuestion = () => {
        pickNewArticle(); 
        setOptions(["...", "...", "...", "..."]);
        setUserSelection("");
        startTimer();
    }

    const renderButtons = options.map(option => {
        console.log(options);
        console.log(userSelection);
        let highlight = "";
        if (userSelection) {
            if (option === article.replaceAll("_", " ")) {
                highlight = "correct";
            } else if (option === userSelection) {
                highlight = "wrong";
            }
        }
        
        return (
            <QButton 
                onClick={(e) => {onUserAnswer(option)}} 
                className={`option ${highlight}`} 
                disabled={userSelection}
                variant="contained"
            >
                {option}
            </QButton>
        )
    });

    return (
        <div className="question">
            <Card className="card" variant="outlined">
                {userSelection ? articleExtractReveal : articleExtract}
            </Card>
            <div className="option-list">
                {renderButtons}
            </div>
            <div className="next-question">
                {userSelection ?
                        <QButton className="option next-question" variant="contained" onClick={nextQuestion}>Next Question</QButton>
                        :
                        null
                }
            </div>
        </div>
    );
}

export default MCQuestion;