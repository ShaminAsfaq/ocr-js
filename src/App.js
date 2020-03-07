import React from 'react';
import fire from './fire';

class App extends React.Component {

    state = {};
    element = {};

    onSubmit = (event) => {
        event.preventDefault();
        fire.database().ref('news').push( this.state );
        document.getElementById("myForm").reset();
    }

    render(){
        return(
            <form id="myForm" autoComplete="off" onSubmit={this.onSubmit} className="ui form" style={{ padding: '60px 5% 5% 5%' }}>
                <div className="field">
                    <label>Title</label>
                    <input type="text" id="news-title" name="title" placeholder="Title of your chronicle"
                        onChange={ (event) => {
                            this.setState({
                                headline: event.target.value
                            })
                        }}
                    />
                </div>

                <div className="two fields">
                    <div className="field">
                        <label>Type</label>
                        <select className="ui dropdown" 
                            onChange ={ (event) => {
                                this.setState({
                                    type: event.target.value
                                })
                            }}
                        >
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                    </div>
                    <div className="field">
                        <label>Date</label>
                        <input type="date" name="title" placeholder="Title of your chronicle"
                                onChange={ (event) => {
                                    this.setState({
                                        date: event.target.value
                                    })
                                }}
                        />
                    </div>
                </div>

                <div
                    style={{paddingBottom: '10px'}}
                >
                    <input hidden type="file" multiple 
                            onChange={(e) => { 
                                this.setState({
                                        title: e.target.value
                                })
                            }
                        }
                        className="inputfile" id="upload" />
                    <label htmlFor="upload" className="ui green button">
                        <i className="ui upload icon"></i> 
                        Upload image
                    </label>
                    <label>{ this.state.title || 'Select title image'}</label>
                </div>
                <div
                    style={{paddingBottom: '10px'}}
                >
                    <button className="ui blue button" type="submit">Extract News</button>
                </div>

                <div className="field">
                    <div className="field">
                        <label>Story</label>
                        <textarea 
                            rows='20' 
                            style={{ resize: 'none' }}
                            placeholder="Your epic goes here!"
                        >
                        </textarea>
                    </div>
                </div>
                <button 
                    className="ui blue button"
                    type="submit"
                    onClick={this.onSubmit}
                >
                    Submit
                </button>
            </form>
        );
    }
}

export {
    App as default
}





