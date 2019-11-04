import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './login/Login';
import Note from './note/Note';
import Gnb from './frame/Gnb';
import _ from 'lodash';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let cookiesYn = false;
        if(!_.isNil(Cookies.get('token'))) {
            cookiesYn = true;
        }
        return(
            <div>
                {!cookiesYn && <Redirect to={{pathname: '/login'}}/>}
                {cookiesYn && <Gnb /> }
                <Switch>
                    <Route path="/login"><Login/></Route>
                    <Route path="/note"><Note/></Route>
                </Switch>
            </div>
        );
    }
}

App.propTypes = {
    match: PropTypes.object
};

export default App;
