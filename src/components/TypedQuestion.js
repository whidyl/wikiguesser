import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, TextField } from '@material-ui/core'

const TypedQuestion = ({article}) => {
    //TODO: add cloesness of text to answer
    const [articleExtract, setArticleExtract] = useState("");
    const cardRef = useRef(null);

    useEffect(() => {
        const fetchArticle = async () => {
            const { data } = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${article}`);

            // Omit name of article from extract
            var regex = /<b>((.|\n)*?)<\/b>/
            let bolded = data.extract_html.match(regex);

            let wordsInTitle = article.split("_");
            let extractOmitted = data.extract;
            extractOmitted = extractOmitted.replaceAll(bolded[1], "_____")
            wordsInTitle.forEach(word => {extractOmitted = extractOmitted.replaceAll(new RegExp(word, "ig"), "_____")});
            setArticleExtract(extractOmitted);
        }
        fetchArticle();
    }, [article])

    return (
        <div className="question">
            <div ref={cardRef}>
            <Card className="card" variant="outlined">
                {articleExtract}
            </Card>
            </div>
            <TextField
                id="outlined-full-width"
                style={{ marginTop: "20px", marginLeft: "100px", marginRight: "100px", width: "auto"}}
                placeholder="Placeholder"
                helperText="Close!"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
        </div>
    );
}

export default TypedQuestion;