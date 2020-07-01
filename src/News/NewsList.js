import React from 'react';
import NewsCard from './NewsCard';

const NewsList = (props) => {
  	const news = props.news.content && props.news.content.map((aNews) => {
		return (
            <div key={aNews.id} className="column">
                    <NewsCard news={aNews}/>
            </div>
		);
	});

	return (
        <div className="news-list ui four column grid">
            {news}
        </div>
	);
};


export default NewsList;
