import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import {Row, Col} from 'react-bootstrap';

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
            <React.Fragment>
                <Row>
                    <Col xs={9}>Gnb</Col>
                    <Col xs={3}><input type="button" value="logout" onClick={this.onLogout}/></Col>
                </Row>
                {logoutYn && <Redirect to={{pathname: '/login'}} />}
            </React.Fragment>
        );
    }
}

Gnb.propTypes = {};

export default Gnb;
