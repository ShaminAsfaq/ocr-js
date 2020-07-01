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
        if(text.endsWith(",")) {
            text = text.substring(0, text.length - 1);
            var arr = [];

            if(this.state.keyword) {
                arr = this.state.keyword
            }

            if(text.length > 0){
                this.setState({
                    keyword: arr.concat([text])
                }, () => {
                    this.tags = this.state.keyword && this.state.keyword.map((item) => {
                        var ukey = this.uuid()
                        return (
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
                                        
                                        var arr = this.state.keyword.filter((ele) => {
                                            return ele !== child;
                                        });
        
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
        // console.log(this.state.keyword)
    }

    onSubmit = (event) => {
        event.preventDefault();

        var keyword = this.state.keyword && this.state.keyword.toString().split(",").join(" ");
        this.searchObject.keyword = keyword || '';

        keyword = this.searchObject.keyword ? this.searchObject.keyword + ' ' + document.getElementById('search').value : document.getElementById('search').value;
        this.searchObject.keyword = keyword || '';
        
        this.setState({
            news: [],
            nothingFound: false
        }, () => {
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
        })
    }

    componentDidMount() {
        var url = `${this.host}/get_latest_entries`;
        axios.get(url).then((res) => {
            this.setState({
                news: res.data
            })
            var url = `${this.host}/get_category_list`;
            axios.get(url).then((res) => {
                this.setState({
                    categoryList: res.data
                })
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
                        <label>Search</label>
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
                            Search
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
                        //  Condition:
                        this.state.news && this.state.news.length===0 &&
                        <div>
                            
                            {  
                                //  Don't edit anything before this line EXCEPT for the "condition"
                            }

                            <div style={{
                                paddingTop: "5%",
                                fontFamily: "fantasy",
                                fontSize: "large",
                                textAlign: "center"
                            }}>
                                <div className="loader" style={{
                                    display: "inline-block"
                                }}>
                                </div>

                                <h2 className="ui center aligned icon header">
                                    <div style={{ paddingTop: "2%" }}>
                                        Tranquila, fetching data.
                                    </div>
                                </h2>

                            </div>
                        </div>
                    }
                    
                    <NewsList news={ this.state.news } />
                    
                    {
                        this.state.nothingFound &&
                        <h2 className="no-news-found-label">
                            No news found.
                        </h2>
                    }

                </div>
            </form>
        );
    }
}

export {
    Upload as default
}





