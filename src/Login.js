import React, {Component} from 'react';
import axios from 'axios';

var server = require('./host.json');

class Login extends Component {

    password = '';
    userName = ''

    constructor(props) {
        super(props);
        this.state = { errors: false, verifying: false };
    }

    onUserNameChanged = (e) => {
        this.userName = e.target.value;
    }

    onPasswordChanged = (e) => {
        this.password = e.target.value;
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            verifying: true,
            error: null
        }, async () => {
            let host = server.url;
            let user = await axios.get(`${host}/verify_identity?userName=${this.userName}&password=${this.password}`)
            let status = user.status;

            if(status === 200) {
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(user.data))
                window.location.replace('/')
            } else {
                let user = {
                    role: 'guest'
                }
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(user))

                this.setState({
                    verifying: false,
                    error: 'Credential mismatched'
                })
            }
        })
    }

    render() {
        return (
            <div style={{
                padding: '60px 5% 5% 5%'
            }}>
                <div className="main">
                    <p className="sign" align="center">Sign in</p>
                    <form className="form1" onSubmit = {this.handleSubmit}>
                        <input className="un" type="text" align="center" placeholder="Username" onChange={this.onUserNameChanged}/>
                        <input className="pass" type="password" align="center" placeholder="Password" onChange={this.onPasswordChanged}/>
                        {
                            // <a className="submit" onClick = {this.handleSubmit} align="center">Sign in</a>
                        }
                        <input className="submit" type="submit" value="Let me in" align="center"/>
                        {
                            // <p className="forgot" align="center"><a href="#">Forgot Password?</a></p>        
                        }

                        {
                            this.state.error &&
                            <ul style={{ marginLeft: '30px' }}>
                                <li>Is your username correct?</li>
                                <li>Did you type your password right?</li>
                                <li>Is your Caps Lock on?</li>
                            </ul>
                        }

                        {
                            this.state.verifying &&
                            <div style={{
                                paddingTop: "10px",
                                fontFamily: "fantasy",
                                fontSize: "large",
                                textAlign: "center",
                                marginLeft: "48%"
                            }}>
                                <div className="login-loader-small">
                                </div>
                            </div>
                        }

                    </form>
                </div>
            </div>


        )
    }
}

export {
    Login as default
}