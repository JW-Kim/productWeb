import React, {Component} from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import {LoginRest} from '../../apis/index';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            redirectYn: false
        };

        this.onClick = this.onClick.bind(this);
    }

    onChangeId = e => {
        this.setState({id: e.target.value});
    }

    onChangePassword = e => {
        this.setState({password: e.target.value});
    }

    async onClick() {
        const {id, password} = this.state;
        const res = await LoginRest.login(id, password);

        if (res.status === 200) {
            Cookies.set('token', res.data.data);
        }

        this.setState({redirectYn: true});
    }

    render() {
        const {id, password, redirectYn} = this.state;
        return (
            <div>
                <div>login</div>
                <div>
                    <div>
                        <input type="text" value={id} onChange={this.onChangeId} />
                    </div>
                    <div>
                        <input type="text" value={password} onChange={this.onChangePassword}/>
                    </div>
                    <div>
                        <input type="button" value="login" onClick={this.onClick}/>
                    </div>
                </div>
                {redirectYn && <Redirect to={{pathname: '/note'}}/>}
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;
