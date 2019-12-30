import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import _ from 'lodash';

import Login from './login/Login';
import Note from './note/Note';
import Gnb from './frame/Gnb';
import UserRegister from './user/UserRegister';
import Toast from '../components/com/Toast';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let cookiesYn = false;
        console.log(Cookies.get('token'));
        if(!_.isNil(Cookies.get('token'))) {
            cookiesYn = true;
        }
        return(
            <div style={{overflow: 'hidden'}}>
                {!cookiesYn && <Redirect to={{pathname: '/login'}}/>}
                {cookiesYn && <Gnb /> }
                <Switch>
                    <Route path="/login"><Login/></Route>
                    <Route path="/note"><Note/></Route>
                    <Route path="/user_register/:type"><UserRegister/></Route>
                </Switch>
                <Toast/>
            </div>
        );
    }
}

App.propTypes = {
    match: PropTypes.object
};

export default App;
