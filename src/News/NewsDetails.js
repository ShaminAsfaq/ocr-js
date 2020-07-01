import React from 'react';
import axios from 'axios';
import ImageList from '../News/ImageList';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import '../News/NewsDetails.css';

var server = require('../host.json');

class NewsDetails extends React.Component {

    newsToDisplay = {};
    constructor(props) {
        super(props);
        this.state = { deleting: false }
    }

    uuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        //  eslint-disable-next-line
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    mapKeywordToView = (item) => {
        // console.log(item);
        var ukey = this.uuid()
        return (
            //  eslint-disable-next-line
            <a
                key={ukey} 
                id={ukey}
                className="ui label"
                style={{marginTop: '1%'}}
            >
                {item}
            </a>
        );
    };

    onDelete = () => {

        this.setState({
            deleting: true
        }, async () => {
            var host = server.url;
            var url = `${host}/delete_news_by_id/${this.newsToDisplay.id}`;
    
            await axios.get(url)
            this.props.history.push('/')
        })
    }

    componentDidMount() {
        var host = server.url;

        if(this.props.location.news !== undefined) {
            var id = this.props.location.news.id;
            var url = `${host}/get_news_by_id/${id}`;

            axios.get(url).then((res) => {
                var { id, title, category, date, news, photoId, keywordList } = res.data;
                // console.log(res.data)

                date = date.substring(0, 10);

                this.newsToDisplay = {
                    id, title, category, date, news, ready: true, keywordList, photoId
                }


                axios.get(`${host}/get_photos_by_id/${photoId}`).then((value) => {
                    // console.log(value)
                    let user = localStorage.getItem('user');
                    user = JSON.parse(user);

                    this.setState({
                        ready: true,
                        images: value.data,
                        tags: keywordList && keywordList.map(this.mapKeywordToView),
                        role: user.role
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
                    className="ui placeholder loading-image"
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
                <div style={{ padding: '60px 5% 5% 5%' }}>
                
                    <form id="myForm" autoComplete="off" onSubmit={this.onSubmit} className="ui form">
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

                                <div className="ui sub header" style={{fontSize: '1.2rem'}}>
                                    <p style={{color: 'grey', fontSize: '12px'}}>Tags</p>
                                    <div className="ui blue labels upload-keywords">
                                    {
                                        this.state.tags
                                    }
                                    </div>
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
                        
                        {
                            this.state.role==='admin' &&
                            <NavLink to = {{
                                    pathname: '/upload',
                                    news: this.newsToDisplay,
                                }}
                                onClick = { () => {
                                    // console.log(this.newsToDisplay)
                                }}
                            >
                            
                                <div 
                                    style={{
                                        marginTop: '5%'
                                    }}
                                    className="ui button" tabIndex="0"
                                >
                                    Edit News
                                </div>
                            </NavLink>
                        }
                        {
                            this.state.role==='admin' &&
                            <div 
                                style={{
                                    marginTop: '5%'
                                }}
                                className="ui red button" tabIndex="0"
                                onClick = { this.onDelete }
                            >
                                Delete News
                            </div>
                        }
                        {
                            this.state.deleting &&
                            <div style={{
                                paddingTop: "10px",
                                fontFamily: "fantasy",
                                fontSize: "large",
                                textAlign: "center",
                            }}>
                                <div className="loader-small" style={{
                                    // position: 'absolute'
                                }}>
                                </div>
                            </div>
                        }
                    </form>
                
                </div>
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