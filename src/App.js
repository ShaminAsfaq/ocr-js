import React from 'react';
import Upload from './Upload';
import Dashboard from './Dashboard';

import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

const Menu = () => {
    return(
        <div className="ui top secondary pointing menu" style={{ backgroundColor: 'white', position: 'fixed', width: '100%', top: '0', zIndex: '10', height: '50px' }}>
            <NavLink to="/dashboard" exact={true} className="item">
                Home
            </NavLink>
            <NavLink to="/upload" className="item">
                Upload
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
                    <Route path='/dashboard' component={Dashboard} exact={true}/>
                    <Route path='/upload' component={Upload}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export {
    App as default
}




