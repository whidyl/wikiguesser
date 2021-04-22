import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from '@material-ui/core'

const MCQuestion = ({article}) => {
    const [articleExtract, setArticleExtract] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchArticle = async () => {
            const { data } = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${article}`);
            console.log(data);
            // Omit name of article from extract
            var regex = /<b>((.|\n)*?)<\/b>/
            let bolded = data.extract_html.match(regex);
            console.log("bolded:");
            console.log(bolded[1]);


            let wordsInTitle = article.split("_");
            let extractOmitted = data.extract;
            console.log(extractOmitted);
            extractOmitted = extractOmitted.replaceAll(bolded[1], "_____")
            wordsInTitle.forEach(word => {extractOmitted = extractOmitted.replaceAll(new RegExp(word, "ig"), "_____")});
            setArticleExtract(extractOmitted);
        }

        const fetchOptions = async () => {
            // Get names of things in related category to use for other options
            const { data } = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=categories&titles=${article}`);
            const pageKey = Object.keys(data.query.pages)[0];
            const categories = data.query.pages[pageKey].categories.splice(0, 4).map(category => category.title.replaceAll(" ", "%20"));
            console.log(categories)

            var optionsTemp = await Promise.all(categories.map(async (category) => {
                const response = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&list=categorymembers&cmlimit=500&cmtitle=${category}`);
                const members = response.data.query.categorymembers;
                return members[[Math.floor(Math.random() * members.length)]].title;
            }))

            setOptions(optionsTemp.concat([article.replaceAll("_", " ")]));      
        }
        fetchArticle();
        fetchOptions();
        console.log(article);  
    }, [article])

    const renderButtons = options.map(option => {
        return (
            <Button className="option" variant="contained">{option}</Button>
        )
    });

    return (
        <div className="question">
            <Card className="card" variant="outlined">
                {articleExtract}
            </Card>
            <div className="option-list">
                {renderButtons}
            </div>
        </div>
    );
}

export default MCQuestion;