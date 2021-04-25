import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, withStyles } from '@material-ui/core';
import shuffleArray from '../utils';

const QButton = withStyles({
    root: {
        background: 'white'
    }
})(Button);

const MCQuestion = ({article, pickNewArticle, pauseTimer, startTimer, onUserWrong, onUserRight}) => {
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

            try {
                extractOmitted = extractOmitted.replaceAll(bolded[1], "_____");
            } catch {
                pickNewArticle();
            }
            
            try {
                wordsInTitle.forEach(word => {extractOmitted = extractOmitted.replaceAll(new RegExp(`\\b${word}\\b`, "ig"), "_____")});
            } catch {
                pickNewArticle();
            }

            // remove repetitive blanks
            extractOmitted = extractOmitted.replaceAll(/(( _____){2,})/g, "_____")
            // If there's a lot of blanks, just find a new article because the question is confusing.
            if ((extractOmitted.match(/(_____)/g) || []).length > 10 ) {
                pickNewArticle();
            }
            setUserSelection("");
            setArticleExtract(extractOmitted);
            
        }

        const fetchOptions = async () => {
            // Get names of things in related category to use for other options
            const { data } = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=categories&titles=${article}`);
            const pageKey = Object.keys(data.query.pages)[0];

            let categories = []
            try {
                categories = data.query.pages[pageKey].categories.splice(0, 3).map(category => category.title.replaceAll(" ", "%20"));
            } catch {
                pickNewArticle();
            }

            var optionsTemp = await Promise.all(categories.map(async (category) => {
                const response = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&list=categorymembers&cmlimit=500&cmtitle=${category}`);
                const members = response.data.query.categorymembers;
                //re-pull option if it is a category 
                let option = "Category:"
                while (option.includes("Category:")) {
                    option = members[[Math.floor(Math.random() * members.length)]].title.replaceAll(/\(([^)]+)\)/g, "");
                }
                //pull a random option from category and strip out paranthetical info
                return option;
            }))

            optionsTemp.push(parseArticle(article));
            // remove duplicates
            optionsTemp = [... new Set(optionsTemp)];
            shuffleArray(optionsTemp);
            setOptions(optionsTemp);
        }
        fetchArticle();
        fetchOptions();
    }, [article])

    const parseArticle = (name) => {
        return name.replaceAll("_", " ").replaceAll(/\(([^)]+)\)/g, "")
    }

    const onUserAnswer = (answer) => {
        if (answer === parseArticle(article)) {
            onUserRight();
        } else {
            onUserWrong();
        }
        setUserSelection(answer);
        pauseTimer();
    } 

    const nextQuestion = () => {
        pickNewArticle(); 
        setOptions(["...", "...", "...", "..."]);
        startTimer();
    }

    const renderButtons = options.map(option => {
        let highlight = "";
        if (userSelection) {
            if (option === parseArticle(article)) {
                highlight = "correct";
            } else if (option === userSelection) {
                highlight = "wrong";
            }
        }
        
        return (
            <QButton 
                onClick={(e) => {onUserAnswer(option)}}
                className={`option ${highlight}`} 
                style={{fontSize: "min(3vw, 18px, 3vh)"}}
                disabled={userSelection !== ""}
                variant="contained"
            >
                {option}
            </QButton>
        )
    });

    return (
        <div className="question">
            <Card className="card" variant="outlined" style={{fontSize: "min(3vw, 24px, 3vh)"}}>
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