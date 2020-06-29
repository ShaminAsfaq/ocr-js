import React from 'react';
import { createWorker } from 'tesseract.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ImageList from './News/ImageList';

var server = require('./host.json');

class Upload extends React.Component {

    state = {};
    initialState = {};
    element = {};
    host = server.url;

    componentWillMount() {

        var host = server.url
        // console.log(this.props.location.news)

        if(this.props.location.news) {
            var { id, title, category, date, news, photoId, keywordList } = { ...this.props.location.news }

            if(keywordList===null) keywordList = []

            this.setState({
                error: true
            }, () => {
                axios.get(`${host}/get_photos_by_id/${photoId}`).then((value) => {
                    // console.log(value)
                    this.setState({
                        ready: true,
                        oldPhotoList: value.data,
                        id, title, category, date, news, photoId, keyword: keywordList,
                        error: undefined
                    })
                })
            })
        }
    }

    constructor(props) {
        // console.log(server)
        super(props);
        this.state = { error: null, submittable: true };
    }

    componentDidMount() {
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
    }

    onExtraction = () => {
        // console.log(this.state.uploaded)
        if(!this.state.uploaded) {
            this.setState({
                error: 'Please select an image first.',
                image: 'Please select an image first.',
                imageColor: 'red'
            })
        } else {

            this.setState({
                extracting: true
            }, () => {
                var list = Object.values(this.state.files);
                var item = list[0];
                // console.log(item)
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
                                    // console.log(this.state.news)
                                }).then(() => {
                                    // console.log(this.state.image)
                                    delete this.state.image
                                    this.setState({
                                        image: 'Select another image',
                                        imageColor: 'black',
                                        extracting: false
                                    })

                                    // console.log(this.state.image)
                                    this.worker.terminate();
                                    console.log('--------- 4 ---------');
                                })
                            })
                        })
                })
            })
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();

        // console.log(this.state)

        if(this.state.error===undefined || (this.state.error!=null && this.state.error.length===0)) {

            this.setState({
                error: true
            }, async () => {
                var { id, title, category } = this.state;
                var uid = this.props.location.news ? this.state.photoId : uuidv4();

                // news = news.replace(/\n+/, ' ');

                var news = document.getElementById('textarea').value;
                // console.log(news);
                var createdAt = this.props.location.news ? new Date(this.state.date) : new Date().toISOString();

                this.element = { 
                    id, title, category, 
                    date: new Date(this.state.date), 
                    news, 
                    createdAt,
                    photoId: uid,
                    keywordList: this.state.keyword
                };
                // console.log(this.element);

                // console.log(this.state.photoList)

                var formData = new FormData();

                if(this.state.photoList) {
                    for(var idx = 0; idx < this.state.photoList.length; idx++) {
                        // console.log(this.state.photoList[idx][1])
                        formData.append('files', this.state.photoList[idx][1])
                    }
                }

                // console.log('--------------------------')
                // console.log(this.state)
                // console.log(this.state.photoList)
                // console.log(this.element)
                // console.log('--------------------------')

                await axios.post(`${this.host}/upload_photo/${uid}`, formData)
                await axios.post(`${this.host}/create_news`, this.element)
            
                // console.log(first)
                // console.log(second)

                // console.log(title, category, date, news);
                document.getElementById("myForm").reset();
                
                //  Redirecting towards Dashboard
                this.props.history.push('/')

                //  eslint-disable-next-line
                this.state = { error: undefined };
                this.element = {};
            })
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

    mapKeywordToView = (item) => {
        // console.log(item);
        var ukey = this.uuid()
        return (
            //  eslint-disable-next-line
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
    };

    onCommaPressed = () => {
        var text = document.getElementById('search').value;

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
                    this.tags = this.state.keyword && this.state.keyword.map(this.mapKeywordToView);
                    this.setState({
                        tagsReady: true
                    })
                    // console.log(this.state)
                })
            }
            document.getElementById('search').value = '';
        }
        // this.searchObject = { keyword };
        // console.log(this.searchObject)
    }

    uuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        //  eslint-disable-next-line
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    deletePhoto = () => {
        this.setState({
            photoDeletingFlag: true
        }, async () => {
            await axios.get(`${this.host}/delete_photo/${this.state.selectedPhotoAlt}`)

            var newOldPhotoList = this.state.oldPhotoList.filter((photo) => photo.id!=this.state.selectedPhotoAlt)

            this.setState({
                photoDeletingFlag: false,
                oldPhotoList: newOldPhotoList,
                photoSelected: undefined
            })
        })
    }

    render(){
        var { title, category, date, news, photoId, keyword } = { ... this.state }
        return(
            <div>
            {
                !this.props.location.news &&
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
                                if(event.target.value.length>0) {
                                    this.setState({
                                        category: event.target.value
                                    }, () => {
                                        // console.log(this.state.category)
                                    })
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
                                }}
                        />
                    </div>
                </div>
                
                <div className="field">
                    <label>Keyword</label>
                    <input type="text" id="search" placeholder="Tags to find the news easily.."
                        onChange={ this.onCommaPressed }
                    />
                </div>
                <div className="ui blue labels upload-keywords">
                {
                    this.tags
                }
                </div>

                <div
                    style={{paddingBottom: '10px'}}
                >
                    <input hidden multiple id="file" type="file" 
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
                        //  eslint-disable-next-line
                        className="inputfile" id="upload"
                        accept="image/*"
                    />
                    <label htmlFor="upload" className="ui green button">
                        <i className="ui upload icon"></i> 
                        Select News
                    </label>
                    <label style={{color: `${this.state.imageColor || 'black'}`}} >{ (this.state.image ? this.state.image : '') }</label>
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
                    {
                        this.state.extracting &&
                        <div style={{
                            paddingTop: "10px",
                            fontFamily: "fantasy",
                            fontSize: "large",
                            textAlign: "center",
                        }}>
                            <div className="loader-small" style={{
                                // position: 'absolute'
                            }}>
                            </div>
                        </div>
                    }
                </div>

                <div
                    style={{paddingBottom: '10px'}}
                >
                    <input hidden multiple id="photo" type="file" 
                            onChange={(e) => {
                                // console.log(e.target.files);

                                var photoList = [];
                                Object.entries(e.target.files).map(file => {
                                    console.log(file)
                                    return photoList.push(file)
                                })

                                // photoList = photoList.join(", ");

                                this.setState({
                                        photoList
                                }, () => {
                                    // console.log(this.state.photoList)
                                })
                            }
                        }
                        //  eslint-disable-next-line
                        className="inputfile" id="photo-upload"
                        accept="image/*"
                    />
                    <label htmlFor="photo-upload" className="ui red button">
                        <i className="ui upload icon"></i> 
                        Upload photos
                    </label>
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
                                    // var news = document.getElementById('textarea').value;
                                    // this.setState({
                                    //     news
                                    // })
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

                {
                    this.state.error &&
                    <div style={{
                        paddingTop: "10px",
                        fontFamily: "fantasy",
                        fontSize: "large",
                        textAlign: "center",
                    }}>
                        <div className="loader-small" style={{
                            // position: 'absolute'
                        }}>
                        </div>
                    </div>
                }
                <div style={{paddingTop: '5%', color: 'red'}}>
                    <label>
                        { this.state.error || '' }
                    </label>
                </div>
            </form>
            }
            {
                this.props.location.news &&
                <form id="myForm" autoComplete="off" onSubmit={this.onSubmit} className="ui form" style={{ padding: '60px 5% 5% 5%' }}>
                <div className="field">
                    <label>Title</label>
                    <input type="text" id="news-title" placeholder="Title of the news" value={title || ''}
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
                                if(event.target.value.length>0) {
                                    this.setState({
                                        category: event.target.value
                                    }, () => {
                                        // console.log(this.state.category)
                                    })
                                }
                            }}
                            placeholder = "Category"
                            value={category || ''}
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
                                }}
                                value={this.state.date || ''}
                        />
                    </div>
                </div>
                
                <div className="field">
                    <label>Keyword</label>
                    <input type="text" id="search" placeholder="Tags to find the news easily.."
                        onChange={ this.onCommaPressed }
                    />
                </div>
                <div className="ui blue labels upload-keywords">
                {
                    keyword ? keyword.map(this.mapKeywordToView) : []
                }
                </div>

                {
                    this.state.oldPhotoList &&
                    <div style={{ padding: '60px 5% 5% 0%' }}>
                        <div className="ui sub header" style={{fontSize: '1.2rem'}}>
                                <p style={{color: 'grey', fontSize: '12px'}}>Photos</p>
                        </div>
                        <div 
                            onClick={ (e) => {
                                this.setState({
                                    photoSelected: e.target.src,
                                    selectedPhotoAlt: e.target.alt
                                })
                            }} 
                            className="ui tiny images">
                            {
                                <ImageList images={this.state.oldPhotoList} />
                            }
                        </div>
                    </div>
                }

                {
                    this.state.photoSelected &&
                    <div>
                        <img alt='pictoria' className="ui medium rounded image selected-image" src={ this.state.photoSelected } />
                        
                            <button
                                className="ui blue button"
                                type="button"
                                onClick = { this.deletePhoto }
                                style={{marginTop: '10px'}}
                            >
                            Delete
                            </button>

                            {
                                this.state.photoDeletingFlag &&
                                <div style={{
                                    paddingTop: "10px",
                                    fontFamily: "fantasy",
                                    fontSize: "large",
                                    textAlign: "center",
                                }}>
                                    <div className="loader-small" style={{
                                        // position: 'absolute'
                                    }}>
                                    </div>
                                </div>
                            }
                        
                    </div>
                }

                <div
                    style={{paddingBottom: '10px', paddingTop: '10px'}}
                >
                    <input hidden multiple id="file" type="file" 
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
                        //  eslint-disable-next-line
                        className="inputfile" id="upload"
                        accept="image/*"
                    />
                    <label htmlFor="upload" className="ui green button">
                        <i className="ui upload icon"></i> 
                        Select News
                    </label>
                    <label style={{color: `${this.state.imageColor || 'black'}`}} >{ (this.state.image ? this.state.image : '') }</label>
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

                    {
                        this.state.extracting &&
                        <div style={{
                            paddingTop: "10px",
                            fontFamily: "fantasy",
                            fontSize: "large",
                            textAlign: "center",
                        }}>
                            <div className="loader-small" style={{
                                // position: 'absolute'
                            }}>
                            </div>
                        </div>
                    }
                </div>

                <div
                    style={{paddingBottom: '10px'}}
                >
                    <input hidden multiple id="photo" type="file" 
                            onChange={(e) => {
                                // console.log(e.target.files); 

                                var photoList = [];
                                Object.entries(e.target.files).map(file => {
                                    // console.log(file)
                                    return photoList.push(file)
                                })

                                // photoList = photoList.join(", ");

                                this.setState({
                                        photoList
                                }, () => {
                                    // console.log(this.state.photoList)
                                })
                            }
                        }
                        //  eslint-disable-next-line
                        className="inputfile" id="photo-upload"
                        accept="image/*"
                    />
                    <label htmlFor="photo-upload" className="ui red button">
                        <i className="ui upload icon"></i> 
                        Upload photos
                    </label>
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
                                    console.log(this.state.text)
                                }
                            }
                            value={this.state.news}
                        >
                        </textarea>
                    </div>
                </div>
                <button 
                    className="ui blue button"
                    type="button"
                    onClick={
                        this.onSubmit
                    }
                    disabled={
                        // this.state.news && this.state.title && this.state.date && this.state.category ? 
                        false 
                        // : 
                        // true
                    }
                >
                    UPDATE
                </button>

                {
                    this.state.error &&
                    <div style={{
                        paddingTop: "10px",
                        fontFamily: "fantasy",
                        fontSize: "large",
                        textAlign: "center",
                    }}>
                        <div className="loader-small" style={{
                            // position: 'absolute'
                        }}>
                        </div>
                    </div>
                }

                <div style={{paddingTop: '5%', color: 'red'}}>
                    <label>
                        { this.state.error || '' }
                    </label>
                </div>
            </form>
            }
            </div>
        );

    }
}

export {
    Upload as default
}





