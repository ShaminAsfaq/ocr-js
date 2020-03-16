import React from 'react';
import NewsList from './News/NewsList';
import axios from 'axios';

class Upload extends React.Component {

    host = 'https://spring-boot-newspaper-archive.herokuapp.com';
    // host = 'http://localhost:5000';

    state = {};
    searchObject = {};

    tags = undefined;

    constructor(props) {
        super(props);
        this.state = { text: '', news: [] }
    }

    onSearch = () => {
        var text = document.getElementById('search').value;
        var keyword = text;

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
                            <a
                                key={ukey} 
                                id={ukey}
                                className="ui label"
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
        this.searchObject = { keyword };
        console.log(this.searchObject)
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
            this.setState({
                news: res.data
            })
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
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    render(){
        return(
            <form id="myForm" autoComplete="off" onSubmit={(this.onSubmit)} className="ui form" style={{ padding: '60px 5% 5% 5%' }}>
                <div className="four fields">
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

                <div>
                    {
                        this.tags
                    }
                </div>
                <div style={{paddingTop: '5%'}}>
                    <NewsList news={ this.state.news } />
                </div>
            </form>
        );
    }
}

export {
    Upload as default
}





