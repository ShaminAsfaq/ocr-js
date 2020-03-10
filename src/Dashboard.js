import React from 'react';
import NewsList from './News/NewsList';

class Upload extends React.Component {

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
        this.setState({
            news: [
                {
                    id: 1,
                    title: 'Corona Outbreak',
                    category: 'History and Current Affairs',
                    date: '2020-03-10T00:00:00',
                    news: 'If not worked together, corona can wash out half the humanity.'
                },
                {
                    id: 2,
                    title: 'Q7+6=13',
                    category: 'Dark Mathematics',
                    date: '2020-03-10T00:00:00',
                    news: 'The formula to defeat COVID-19 has been found by a Dreamer in his dreams in the long night.'
                },
                {
                    id: 3,
                    title: 'Q7+6=13',
                    category: 'Dark Mathematics',
                    date: '2020-03-10T00:00:00',
                    news: 'The formula to defeat COVID-19 has been found by a Dreamer in his dreams in the long night.'
                },
                {
                    id: 4,
                    title: 'Q7+6=13',
                    category: 'Dark Mathematics',
                    date: '2020-03-10T00:00:00',
                    news: 'The formula to defeat COVID-19 has been found by a Dreamer in his dreams in the long night.'
                },
                {
                    id: 5,
                    title: 'Q7+6=13',
                    category: 'Dark Mathematics',
                    date: '2020-03-10T00:00:00',
                    news: 'The formula to defeat COVID-19 has been found by a Dreamer in his dreams in the long night.'
                },
                {
                    id: 6,
                    title: 'Q7+6=13',
                    category: 'Dark Mathematics',
                    date: '2020-03-10T00:00:00',
                    news: 'The formula to defeat COVID-19 has been found by a Dreamer in his dreams in the long night.'
                },
                {
                    id: 7,
                    title: 'Q7+6=13',
                    category: 'Dark Mathematics',
                    date: '2020-03-10T00:00:00',
                    news: 'The formula to defeat COVID-19 has been found by a Dreamer in his dreams in the long night.'
                },
                {
                    id: 8,
                    title: 'Q7+6=13',
                    category: 'Dark Mathematics',
                    date: '2020-03-10T00:00:00',
                    news: 'The formula to defeat COVID-19 has been found by a Dreamer in his dreams in the long night.'
                },
                {
                    id: 9,
                    title: 'Q7+6=13',
                    category: 'Dark Mathematics',
                    date: '2020-03-10T00:00:00',
                    news: 'The formula to defeat COVID-19 has been found by a Dreamer in his dreams in the long night.'
                }
            ]
        })
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





