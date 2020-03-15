import React from 'react';
import { NavLink } from 'react-router-dom';

class NewsCard extends React.Component {

	newsDetails = {};
	constructor(props) {
		super(props);
		this.state = { spans: 0 };
		this.newsRef = React.createRef();
	}

	componentDidMount() {
		this.newsRef.current.addEventListener('load', this.setSpans);
	}

	onClick = (e) => {
		var { id } = this.props.news;

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

		this.newsDetails = {
			...this.newsDetails,
			title,
			category,
			date,
			news,
			ready: true
		}
		// console.log(this.newsDetails)
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
		var { title, news, date, category, id } = this.props.news;
		date = date.substring(0, date.indexOf('T'));

		return (
				<div 
					name = {id}
					className='news-card'
					id='card'
				>
					<NavLink to = {{
						pathname: '/details',
						news: {
							id
						}}}
						// target = '_blank'
						onClick={this.onClick}
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
					</NavLink>
				</div>
		);
	}
}


export default NewsCard;


