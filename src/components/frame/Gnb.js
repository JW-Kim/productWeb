import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

class Gnb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutYn: false
        };
    }

    onLogout = () => {
        Cookies.remove('token');
        setTimeout(this.setState({logoutYn: true}), 3000);
    }

    render() {
        const {logoutYn} = this.state;
        return (
            <div>Gnb
                <input type="button" value="logout" onClick={this.onLogout}/>
                {logoutYn && <Redirect to={{pathname: '/login'}} />}
            </div>
        );
    }
}

Gnb.propTypes = {};

export default Gnb;
