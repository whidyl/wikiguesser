import { useState, useEffect } from 'react';
import axios from 'axios';

const useArticles = (location, date) => {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * 999)); 

    useEffect(() => {
        const fetchArticles = async () => {
            const prevDate = new Date(date);
            prevDate.setDate(prevDate.getDate() - 2);
            
            const year = prevDate.getUTCFullYear();
            const month = (prevDate.getUTCMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2});
            const day = prevDate.getUTCDate().toLocaleString('en-US', {minimumIntegerDigits: 2});

            const { data } = await axios.get(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${location}/all-access/${year}/${month}/${day}`);
            console.log(data);
            setArticles(data.items[0].articles.map(info => info.article));
        }
        fetchArticles();
    }, [date, location]);

    const pickNewArticle = () => {
        // Pick a new article if it is a list
        let index = Math.floor(Math.random() * 999);
        while (articles[index].includes("List_of")) {
            index = Math.floor(Math.random() * 999);
        }
        setCurrentIndex(index);
    }

    return [articles, pickNewArticle, currentIndex];
}

export default useArticles;