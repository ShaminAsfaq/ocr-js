import React from 'react';
import axios from 'axios';
import ImageList from '../News/ImageList';

import '../News/NewsDetails.css';

var server = require('../host.json');

class NewsDetails extends React.Component {

    newsToDisplay = {};
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        var host = server.url;

        if(this.props.location.news !== undefined) {
            var id = this.props.location.news.id;
            var url = `${host}/get_news_by_id/${id}`;

            axios.get(url).then((res) => {
                var { title, category, date, news, photoId } = res.data;
                // console.log(res)

                date = date.substring(0, 10);

                this.newsToDisplay = {
                    title, category, date, news, ready: true
                }


                axios.get(`${host}/get_photos_by_id/${photoId}`).then((value) => {
                    // console.log(value)
                    this.setState({
                        ready: true,
                        images: value.data
                    })
                })
            })
        }
    }

    render() {
        // this.loadDate();

        return(
            <div>
            {
                this.state.ready === undefined && 
                <div
                    style={{ marginLeft: '60px', marginTop: '5%' }}
                    className="ui placeholder"
                >
                    <div className="image header">
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="paragraph">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
            }
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

                            {
                                this.state.images &&
                                <div style={{ padding: '60px 5% 5% 0%' }}>
                                    <div className="ui sub header" style={{fontSize: '1.2rem'}}>
                                            <p style={{color: 'grey', fontSize: '12px'}}>Photos</p>
                                    </div>
                                    <div 
                                        onClick={ (e) => {
                                            this.setState({
                                                photoSelected: e.target.src
                                            })
                                        }} 
                                        className="ui tiny images">
                                        {
                                            <ImageList images={this.state.images} />
                                        }
                                    </div>
                                </div>
                            }

                            {
                                this.state.photoSelected &&
                                <div>
                                    <img alt='pictoria' className="ui medium rounded image" src={ this.state.photoSelected } />
                                </div>
                            }

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