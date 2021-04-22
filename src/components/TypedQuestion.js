import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from '@material-ui/core'

const TypedQuestion = ({article}) => {
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
        fetchArticle();
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

export default TypedQuestion;