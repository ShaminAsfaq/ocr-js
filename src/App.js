import React from 'react';
import fire from './fire';
import worker from './tesseract';

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
                    <input hidden id="file" type="file" multiple 
                            onChange={(e) => { 
                                // console.log(e.target.files);
                                this.setState({
                                        title: e.target.value,
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
                    <label>{ this.state.title || 'Select title image'}</label>
                </div>
                <div
                    style={{paddingBottom: '10px'}}
                >
                    <button 
                        className="ui blue button" 
                        type="button"
                        onClick = {() => {
                                Object.values(this.state.files).forEach(item => {

                                    // (async () => {
                                    //     await worker.load();
                                    //     await worker.loadLanguage('eng');
                                    //     await worker.initialize('eng');
                                    //     const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
                                    //     console.log(text);
                                    //     await worker.terminate();
                                    //   })
                                });
                                // console.log(typeof Object.values(this.state.files));
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
                        var fi = document.getElementById('file');
                        console.log(fi)
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





