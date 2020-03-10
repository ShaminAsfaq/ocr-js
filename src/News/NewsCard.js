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
		const { title, news, date, category } = this.props.news;

		return (
			// <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
			// 	<img 
			// 		ref={ this.newsRef }
			// 		alt={ title }
			// 		src='https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
			// 	/>
			// </div>

				<div 
					className='news-card'
					id='card'
					onClick = {(e) => {
						var text = document.getElementById('card');
						console.log(text);
					}}
				>
					<div className="ui card" style={{ cursor: 'pointer', gridRowEnd: `span ${this.state.spans}`, width: '100%' }} ref={this.newsRef}>
						<div className="content" style={{ backgroundColor: '#b7d7e8' }}>
							<div className="header" id='card' style={{ color: 'black' }}>{title}</div>
							<div className="description" id='card' style={{ color: 'black' }}>
							<p>{news}</p>
							</div>
						</div>
						<div className="extra content" id='card' style={{ backgroundColor: '#87bdd8', color: 'white' }}>
							<span className="left floated like">
							<i className="calendar outline icon"></i>
							{date}
							</span>
							<span className="right floated star" id='card'>
							<i className="list alternate outline icon"></i>
							{category}
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



