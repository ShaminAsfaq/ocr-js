import React from 'react';

class App extends React.Component {

    state = {};

    element = {};

    onSubmit = (event) => {
        event.preventDefault();
    }

    render(){
        return(
            <form  autoComplete="off" onSubmit={this.onSubmit} className="ui form" style={{ padding: '60px 5% 5% 5%' }}>
                <div
                    style={{paddingBottom: '10px'}}
                >
                    <input hidden type="file" multiple 
                            onChange={(e) => { 
                                this.element = { ...this.element, title: e.target.value };
                                this.setState({
                                        title: this.element.title
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
                    <button className="ui blue button" type="submit">Extract Title</button>
                </div>

                <div className="field">
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Title of your chronicle"/>
                </div>

                <div
                    style={{paddingBottom: '10px'}}
                >
                    <input hidden type="file" multiple 
                            onChange={(e) => { 
                                this.element = { ...this.element, body: e.target.value };
                                this.setState({
                                        body: this.element.body
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
                    <button className="ui blue button" type="submit">Extract Title</button>
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
                <button className="ui blue button" type="submit">Submit</button>
            </form>
        );
    }
}

export {
    App as default
}





