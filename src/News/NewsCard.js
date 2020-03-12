import React from 'react';

class NewsCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { spans: 0 };
		this.newsRef = React.createRef();
	}

	componentDidMount() {
		this.newsRef.current.addEventListener('load', this.setSpans);
	}

	setSpans = () => {
		const height = this.newsRef.current.clientHeight;
		console.log('------- FINDING HEIGHT -------');
		console.log(height);
		console.log('------- HEIGHT -------');
		const spans = Math.ceil(height/10 + 1);


		this.setState({ spans: spans });
	}

	render() {

		// console.log(this.props);
		var { title, news, date, category, id } = this.props.news;
		date = date.substring(0, date.indexOf('T'));

		return (
			// <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
			// 	<img 
			// 		ref={ this.newsRef }
			// 		alt={ title }
			// 		src='https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
			// 	/>
			// </div>

				<div 
					name = {id}
					className='news-card'
					id='card'
					onClick = {(e) => {
						var main = document.getElementsByName(id);
						var titleAndBody = main[0];
						var footer = main[1];
						var title = titleAndBody.getElementsByClassName('header')[0].innerHTML;
						var news = titleAndBody.getElementsByClassName('description')[0].getElementsByTagName('p')[0].innerHTML;
						var date = footer.getElementsByClassName('left floated like')[0].getElementsByTagName('label')[0].innerHTML;
						var category = footer.getElementsByClassName('right floated star')[0].getElementsByTagName('label')[0].innerHTML;

						// console.log(title);
						// console.log(news);
						// console.log(date);
						// console.log(category);
					}}
				>
					<div name = {id} className="ui card" style={{ cursor: 'pointer', gridRowEnd: `span ${this.state.spans}`, width: '100%' }} ref={this.newsRef}>
						<div name = {id} className="content" style={{ backgroundColor: '#b7d7e8' }}>
							<div name = {id} className="header" id='card' style={{ color: 'black' }}>{title}</div>
							<div name = {id} className="description" id='card' style={{ color: 'black' }}>
								<p>{news.substring(0,200)}...</p>
							</div>
						</div>
						<div name = {id} className="extra content" id='card' style={{ backgroundColor: '#87bdd8', color: 'white' }}>
							<span className="left floated like">
								<i className="calendar outline icon"></i>
								<label>
									{date}
								</label>
							</span>
							<span className="right floated star" id='card'>
							<i className="list alternate outline icon"></i>
							<label>
								{category}
							</label>
							</span>
						</div>
					</div>
				</div>
		);
	}
}


export default NewsCard;

/*
<div style={{ gridRowEnd: `span ${this.state.spans}` }}>
	<img 
		ref={ this.newsRef }
		alt={ title }
		src={ news }
	/>
</div>
*/





/*

*/



