import React from 'react';
import NewsList from './News/NewsList';
import axios from 'axios';
import './Dashboard.css';

var server = require('./host.json');

class Upload extends React.Component {

    host = server.url;

    state = {};
    searchObject = {};

    tags = undefined;

    constructor(props) {
        super(props);
        this.state = { text: '', news: [] }
    }

    onSearch = () => {
        var text = document.getElementById('search').value;

        // text.endsWith(" ") ? 'YES' : 'NO'

        if(text.endsWith(" ") || text.endsWith(",")) {
            // console.log('Hell, yeah !');
            text = text.substring(0, text.length - 1);

            var arr = [];

            if(this.state.keyword) {
                arr = this.state.keyword
            }

            // console.log(arr)

            if(text.length > 0){
                this.setState({
                    keyword: arr.concat([text])
                }, () => {
                    this.tags = this.state.keyword && this.state.keyword.map((item) => {
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
                                <i 
                                    className="delete icon"
                                    onClick={(e) => {
                                        var parent = document.getElementById(`${ukey}`);
                                        var child = document.getElementById(`${ukey}`).innerText;
                                        console.log(child)
                                        
                                        var arr = this.state.keyword.filter((ele) => {
                                            if(ele===child) {
                                                console.log('Yeah, baby !')
                                            }
                                            return ele !== child;
                                        });

                                        console.log(arr);
        
                                        this.setState({
                                            keyword: arr
                                        }, () => {
                                            parent.style.visibility = 'hidden';
                                        })
                                    }}
                                >
                                </i>
                            </a>
                        );
                    });
                    this.setState({
                        tagsReady: true
                    })
                    // console.log(this.state)
                })
            }
            document.getElementById('search').value = '';
        }
        // this.searchObject = { keyword };
        // console.log(this.searchObject)
    }

    onSubmit = (event) => {
        event.preventDefault();
        // console.log(this.searchObject)

        var keyword = this.state.keyword && this.state.keyword.toString().split(",").join(" ");
        this.searchObject.keyword = keyword || '';

        console.log(this.searchObject)

        var url = `${this.host}/get_news`;
        axios.post(url, this.searchObject).then((res) => {
            // console.log(res)

            if(res.data.content.length === 0) {
                this.setState({
                    nothingFound: true,
                    news: res.data
                })
            } else {
                this.setState({
                    news: res.data,
                    nothingFound: false
                })
            }
        })
    }

    componentDidMount() {
        var url = `${this.host}/get_latest_entries`;
        // console.log(url);
        axios.get(url).then((res) => {
            // console.log(res)
            this.setState({
                news: res.data
            }, () => {
                // console.log(this.state.news);
            })
            var url = `${this.host}/get_category_list`;
            // console.log(url);
            axios.get(url).then((res) => {
                this.setState({
                    categoryList: res.data
                })
                // console.log(this.state);
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    uuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        //  eslint-disable-next-line
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    render(){
        return(
            <form id="myForm" autoComplete="off" onSubmit={(this.onSubmit)} className="ui form" style={{ padding: '60px 5% 5% 5%' }}>
                <div className="four fields search-fields">
                    <div className="field">
                        <label>Search keyword</label>
                        <input type="text" id="search" placeholder="Search something.."
                            onChange={ this.onSearch }
                        />
                    </div>
                    <div className="field">
                        <label>Category</label>
                        <select className="ui dropdown" 
                            onChange ={ (event) => {
                                this.searchObject.category = event.target.value;
                            }}
                            placeholder = "Category"
                        >
                        {
                            this.state.categoryList && Object.entries(this.state.categoryList).map(item => {
                                return <option key = {item[0]} > {item[1]} </option>
                            })
                        }
                        </select>
                    </div>
                    <div className="field">
                        <label>Date</label>
                        <input type="date" name="date"
                                onChange={ (event) => {
                                    this.setState({
                                        date: new Date(event.target.value)
                                    })

                                    this.searchObject.date = new Date(event.target.value);
                                }}
                        />
                    </div>
                    <div className="field">
                        <label>Click!</label>
                        <button 
                            className="ui blue button"
                            type="button"
                            onClick={this.onSubmit}
                        >
                            Let's Search
                        </button>
                    </div>
                </div>

                <div className="ui blue labels">
                    {
                        this.tags
                    }
                </div>

                <div style={{paddingTop: '5%'}}>
                    {
                        this.state.news && this.state.news.length===0 &&
                        <div className="ui four column stackable grid">
                            <div className="column">
                                <div className="ui raised segment">
                                <div className="ui placeholder">
                                    <div className="image header">
                                    <div className="line"></div>
                                    <div className="line"></div>
                                    </div>
                                    <div className="paragraph">
                                    <div className="medium line"></div>
                                    <div className="short line"></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <div className="column">
                                <div className="ui raised segment">
                                <div className="ui placeholder">
                                    <div className="image header">
                                    <div className="line"></div>
                                    <div className="line"></div>
                                    </div>
                                    <div className="paragraph">
                                    <div className="medium line"></div>
                                    <div className="short line"></div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="column">
                                <div className="ui raised segment">
                                <div className="ui placeholder">
                                    <div className="image header">
                                    <div className="line"></div>
                                    <div className="line"></div>
                                    </div>
                                    <div className="paragraph">
                                    <div className="medium line"></div>
                                    <div className="short line"></div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="column">
                                <div className="ui raised segment">
                                <div className="ui placeholder">
                                    <div className="image header">
                                    <div className="line"></div>
                                    <div className="line"></div>
                                    </div>
                                    <div className="paragraph">
                                    <div className="medium line"></div>
                                    <div className="short line"></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    }
                    
                    <NewsList news={ this.state.news } />
                    
                    {
                        this.state.nothingFound &&
                        <div className="no-news-found-label">
                            There's no news of this sort.
                        </div>
                    }

                </div>
            </form>
        );
    }
}

export {
    Upload as default
}





