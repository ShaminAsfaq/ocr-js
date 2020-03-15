import React from 'react';
import NewsList from './News/NewsList';
import axios from 'axios';

class Upload extends React.Component {

    host = 'https://spring-boot-newspaper-archive.herokuapp.com';
    // host = 'http://localhost:5000';

    state = {};
    searchObject = {};
    constructor(props) {
        super(props);
        this.state = { text: '', news: [] }
    }

    onSearch = () => {
        var text = document.getElementById('search').value;
        this.setState({
            text
        })

        this.searchObject = { keyword: text };
    }

    onSubmit = (event) => {
        event.preventDefault();
        // console.log(this.searchObject)

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
                                if(event.target.value.length>0) {
                                    // this.setState({
                                    //     category: event.target.value
                                    // }, () => {
                                    //     // console.log(this.state.category)
                                    // })

                                    this.searchObject.category = event.target.value;
                                }
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
                    { this.state.text }
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





