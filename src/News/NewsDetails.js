import React from 'react';
import axios from 'axios';
import '../News/NewsDetails.css';

class NewsDetails extends React.Component {

    newsToDisplay = {};
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        var host = 'https://spring-boot-newspaper-archive.herokuapp.com';
        // host = 'http://localhost:5000';

        if(this.props.location.news !== undefined) {
            var id = this.props.location.news.id;
            var url = `${host}/get_news_by_id/${id}`;

            axios.get(url).then((res) => {
                var { title, category, date, news } = res.data;

                date = date.substring(0, 10);
                // news = news.replace(/\n+/g, ' ');
                // news = decodeURIComponent(news);

                this.newsToDisplay = {
                    title, category, date, news, ready: true
                }
                this.setState({
                    ready: true
                })
            })
        }
    }

    render() {
        // this.loadDate();

        return(
            <div>
            {
                this.props.location.news === undefined && 
                <div style={{ padding: '60px 5% 5% 5%' }}>
                    {
                        this.props.history.push("/")
                    }
                </div>
            }   
            {
                this.state.ready === true &&
                <form id="myForm" autoComplete="off" onSubmit={this.onSubmit} className="ui form" style={{ padding: '60px 5% 5% 5%' }}>
                    <div className="title">
                        <div className="content">
                            <h1 className="ui header" style={{paddingTop: '2%'}}>
                                { 
                                    this.newsToDisplay.title
                                }
                            </h1>
                            <div className="ui sub header" style={{fontSize: '1.2rem'}}>
                                <p style={{color: 'grey', fontSize: '12px'}}>Date</p>
                                { 
                                    this.newsToDisplay.date
                                }
                            </div>
                            <div className="ui sub header" style={{fontSize: '1.2rem'}}>
                                <p style={{color: 'grey', fontSize: '12px'}}>Category</p>
                                { 
                                    `${this.newsToDisplay.category}`
                                }
                            </div>
                        </div>
                    </div>
                    <div className="ui text container" id="news-body" style={{ whiteSpace: 'pre-wrap', width: '100%', paddingTop: '2%', marginLeft: '0px !important', marginRight: '0px !important', maxWidth: '100% !important' }}>
                        {
                            this.newsToDisplay.news
                        }
                    </div>
                </form>
            }
            </div>
        );
    }
}

export {
    NewsDetails as default
}


/*

*/