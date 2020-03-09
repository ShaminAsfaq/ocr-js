import React from 'react';
import fire from './fire';
import worker from './tesseract';
// import { createWorker } from 'tesseract.js';

const { createWorker } = require('tesseract.js');

class App extends React.Component {

    state = {};
    element = [];

    worker = createWorker({
        //   logger: m => console.log(m), // Add logger here
    });

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
                    <input hidden id="file" type="file" 
                            onChange={(e) => {
                                // console.log(e.target.files);
                                this.setState({
                                        title: 'Uploaded',
                                        files: e.target.files
                                })
                            }
                        }
                        className="inputfile" id="upload"
                        accept="image/*"
                    />
                    <label htmlFor="upload" className="ui green button">
                        <i className="ui upload icon"></i> 
                        Upload image
                    </label>
                    <label>{ (this.state.title ? this.state.title : 'Select title image') }</label>
                </div>
                <div
                    style={{paddingBottom: '10px'}}
                >
                    <button 
                        className="ui blue button" 
                        type="button"
                        onClick = {() => {
                                    var list = Object.values(this.state.files);
                                    var item = list[0];
                                    console.log(item)
                                    this.worker = createWorker({});
                                    this.worker.load().then(() => {
                                        console.log('--------- 1 ---------');
                                        this.worker.loadLanguage('eng').then(() => {
                                            console.log('--------- 2 ---------');
                                            this.worker.initialize('eng').then(() => {
                                                console.log('--------- 3 ---------');
                                                    var blob = window.URL.createObjectURL(item);
                                                    this.worker.recognize(blob).then((text) => {
                                                        // console.log(`${blob}`);
                                                        console.log(text.data.text);
                                                    }).then(() => {
                                                        // console.log(this.state.title)
                                                        delete this.state.title
                                                        this.setState({
                                                            title: 'Select another image'
                                                        })

                                                        // console.log(this.state.title)
                                                        worker.terminate();
                                                        console.log('--------- 4 ---------');
                                                    })
                                                })
                                            })
                                        })
                                    }
                        }
                    >
                    Extract News
                    </button>
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
                    type="button"
                    // onClick={this.onSubmit}
                    onClick={ () => {
                    }}
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





