import React from 'react';
import { createWorker } from 'tesseract.js';
import axios from 'axios';

class Upload extends React.Component {

    state = {};
    initialState = {};
    element = {};
    host = 'https://spring-boot-newspaper-archive.herokuapp.com';
    host = 'http://118.179.95.206:5000';

    constructor(props) {
        super(props);
        this.state = { error: null, submittable: true };
    }

    // componentDidUpdate() {
    //     if(this.state.title && this.state.date && this.state.category && this.state.news) {
    //         this.setState({
    //             submittable: false
    //         })
    //     }
    // }

    onExtraction = () => {
        console.log(this.state.uploaded)
        if(!this.state.uploaded) {
            this.setState({
                error: 'Please select an image first.',
                image: 'Please select an image first.',
                imageColor: 'red'
            })
        } else {
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
                                // console.log(text.data.text);
                                this.setState((state) => {
                                    return {
                                        error: undefined,
                                        news: ( state.news?state.news + '\n' : '' ) + text.data.text
                                    };
                                });

                                document.getElementById('textarea').value = this.state.news;

                                console.log(this.state.news)
                            }).then(() => {
                                // console.log(this.state.image)
                                delete this.state.image
                                this.setState({
                                    image: 'Select another image',
                                    imageColor: 'black'
                                })

                                // console.log(this.state.image)
                                this.worker.terminate();
                                console.log('--------- 4 ---------');
                            })
                        })
                    })
            })
        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        // console.log(this.state)

        if(this.state.error===undefined || (this.state.error!=null && this.state.error.length===0)) {
            var { title, category, date, news } = this.state;
            this.element = { title, category, date: new Date(this.state.date), news };
            // console.log(this.element);

            axios.post(`${this.host}/create_news`, this.element).then((result) => {
                console.log(result);
            })

            // console.log(title, category, date, news);
            document.getElementById("myForm").reset();
            
            delete this.state.title;
            delete this.state.category;
            delete this.state.date;
            delete this.state.news;

            this.state = { error: null };
            this.element = {};
        } else {

            var error = '';
            if (!this.state.title) {
                error += 'No title found, ';
            }
            if(!this.state.category) {
                error += 'No category found, ';
            }
            if(!this.state.date) {
                error += 'No date found, ';
            }
            if(!this.state.news) {
                error += 'No news extracted, ';
            }

            if(error.length===0) {
                error = undefined;
            }

            this.setState({
                error
            })
        }
    }

    render(){
        return(
            <form id="myForm" autoComplete="off" onSubmit={this.onSubmit} className="ui form" style={{ padding: '60px 5% 5% 5%' }}>
                <div className="field">
                    <label>Title</label>
                    <input type="text" id="news-title" placeholder="Title of the news"
                        onChange={ (event) => {
                            this.setState({
                                title: event.target.value
                            })
                        }}
                    />
                </div>

                <div className="two fields">
                    <div className="field">
                        <label>Category</label>
                        <select className="ui dropdown" 
                            onChange ={ (event) => {
                                this.setState({
                                    category: event.target.value
                                })
                            }}
                        >
                            <option value="">Category</option>
                            <option value="Sports">Sports</option>
                            <option value="Politics">Politics</option>
                            <option value="Philosophy">Philosophy</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Date</label>
                        <input type="date" name="date"
                                onChange={ (event) => {
                                    this.setState({
                                        date: new Date(event.target.value)
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
                                        image: 'Image Selected',
                                        files: e.target.files,
                                        uploaded: true,
                                        imageColor: 'black'
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
                    <label style={{color: `${this.state.imageColor || 'black'}`}} >{ (this.state.image ? this.state.image : 'Select image') }</label>
                </div>
                <div
                    style={{paddingBottom: '10px'}}
                >
                    <button 
                        className="ui blue button" 
                        type="button"
                        onClick = { this.onExtraction }
                    >
                    Extract News
                    </button>
                </div>
                <div className="field">
                    <div className="field">
                        <label>Story</label>
                        <textarea 
                            id='textarea'
                            rows='20' 
                            style={{ resize: 'none' }}
                            placeholder="Press 'Extract News'!"
                            onChange = {
                                () => {
                                    var news = document.getElementById('textarea').value;
                                    this.setState({
                                        news
                                    })
                                    // console.log(this.state.text)
                                }
                            }
                        >
                        </textarea>
                    </div>
                </div>
                <button 
                    className="ui blue button"
                    type="button"
                    onClick={this.onSubmit}
                    disabled={
                        this.state.news && this.state.title && this.state.date && this.state.category ? false : true
                    }
                >
                    Submit
                </button>
                <div style={{paddingTop: '5%', color: 'red'}}>
                    <label>
                        { this.state.error || '' }
                    </label>
                </div>
            </form>
        );
    }
}

export {
    Upload as default
}





