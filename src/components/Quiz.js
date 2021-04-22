import React, { useEffect, useState } from 'react';
import MCQuestion from './MCQuestion';
import axios from 'axios';

const Quiz = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        //TODO: current month and day
        const fetchArticles = async () => {
            const { data } = await axios.get('https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/US/all-access/2021/04/20');
            let articlesTemp = [];
            console.log(data)
            for (var _ = 0; _ < 5; _++) {
                //TODO: make it more likely for popular articles.
                const index = Math.floor(Math.random() * 999);
                console.log(index)
                articlesTemp.push(data.items[0].articles[index].article);
            }
            setArticles(articlesTemp)
        }
        fetchArticles();
    }, [])

    return (
        <div>
            {articles.length > 0 ? <MCQuestion article={articles[0]} /> : null}
        </div>
    );
}

export default Quiz