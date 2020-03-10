import './NewsList.css';
import React from 'react';
import NewsCard from './NewsCard';

const NewsList = (props) => {
    // console.log(props)
	const news = props.news.map((aNews) => {
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

/*

<div class="ui three column grid">
  <div class="column">
    <div class="ui segment">
      <img>
    </div>
  </div>
  <div class="column">
    <div class="ui segment">
      <img>
    </div>
  </div>
  <div class="column">
    <div class="ui segment">
      <img>
    </div>
  </div>
</div>

*/