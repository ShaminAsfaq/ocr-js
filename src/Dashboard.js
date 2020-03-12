import React from 'react';
import NewsList from './News/NewsList';
import axios from 'axios';

class Upload extends React.Component {

    host = 'http://localhost:5000';

    state = {};
    constructor(props) {
        super(props);
        this.state = { text: '', news: [] }
    }

    onSearch = () => {
        var text = document.getElementById('search').value;
        this.setState({
            text
        })
    }

    componentDidMount() {
        var url = `${this.host}/get_first_page`;
        console.log(url);
        axios.get(url).then((res) => {
            this.setState({
                news: res.data
            }, () => {
                // console.log(this.state.news);
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    render(){
        return(
            <form id="myForm" autoComplete="off" onSubmit={this.onSubmit} className="ui form" style={{ padding: '60px 5% 5% 5%' }}>
                <div className="field">
                    <input type="text" id="search" placeholder="Search something.."
                        onChange={ this.onSearch }
                    />
                </div>
                <div>
                    <label style={{fontWeight: 'bold', paddingRight: '1%'}}>
                        Search result of:
                    </label> 
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





