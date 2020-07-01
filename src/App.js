import React from 'react';
import Upload from './Upload';
import Dashboard from './Dashboard';
import NewsDetails from './News/NewsDetails';
import Login from './Login';
import './index.css';

import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

const Menu = () => {

    // localStorage.removeItem('user')
    let currentUser = localStorage.getItem('user');

    if(currentUser==='undefined' || !currentUser) {
        localStorage.removeItem('user')
        let user = {
            role: 'guest'
        }
        
        localStorage.setItem('user', JSON.stringify(user))
    }

    currentUser = JSON.parse(localStorage.getItem('user'));


    return(
        <div className="ui top secondary pointing menu"
            style={{ 
                backgroundColor: 'white', 
                position: 'fixed', 
                width: '100%', 
                top: '0', 
                zIndex: '10', 
                height: '50px',
                paddingLeft: '5%',
                paddingRight: '5%'
            }}>
            <NavLink to="/" exact={true} className="item">
                Home
            </NavLink>

            {
                currentUser.role === 'admin' &&
                <NavLink to="/upload" className="item">
                    Upload/Update
                </NavLink>
            }
            <NavLink to="" className="right menu" onClick = {() => {
                let user = localStorage.getItem('user');
                user = JSON.parse(user);

                if(user.role==='admin'){
                    localStorage.removeItem('user')
                    window.location.replace('/')
                } else {
                    window.location.replace('/logInOrOut')
                }
            }}>
                <div className="item" style={{
                    backgroundColor: 'skyblue',
                    marginBottom: '5%',
                    maxHeight: '35px'
                }}>
                    Log {currentUser.role==='admin'?'Out':'In'}
                </div>
            </NavLink>
        </div>
    )
}

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Menu/>
                <Switch>
                    <Route path='/' component={Dashboard} exact={true} />
                    <Route path='/upload' component={Upload} />
                    <Route path='/details' component={NewsDetails} />
                    <Route path='/logInOrOut' component={Login} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export {
    App as default
}




