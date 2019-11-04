import React, {Component} from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Login from './components/login/Login';

class Routes extends Component {
    render() {
        const authenticated = true;
        return (
        	<React.Fragment>
				{authenticated && <Redirect push={true} to={"/login"}/>}
				<Switch>
					<Route path="/login" component={Login} {...this.props} />
				</Switch>
			</React.Fragment>
        );
    }
}

export default Routes;
