import React, {Component} from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {LoginRest} from '../../apis/index';
import {Button, Container, Row, Col, Image} from 'react-bootstrap';
import {login, loginBtn, image, signUp, inputRow } from '../../assets/styles/login.scss';
import {warningRow} from '../../assets/styles/com.scss';
import {dialog as DialogActions} from '../../redux/actions/index';
import _ from 'lodash';

import logo from '../../assets/img/logo3.png';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectYn: false,
            isUsername: null,
            isPassword: null
        };

        this.onClick = this.onClick.bind(this);
    }

    onChangeUsername = username => {
        const {isPassword} = this.state;
        let isUsername = true;
        const reg = /^[.A-Za-z0-9]*$/;

        if (!reg.test(username) || username === '') {
            isUsername = false;
        }

        let loginBtnStyle = {};
        if (isUsername && isPassword) {
            loginBtnStyle = {backgroundColor: '#142765'};
        } else {
            loginBtnStyle = {backgroundColor: '#C2D8E9'};
        }

        this.setState({username, isUsername, loginBtnStyle});
    }

    onChangePassword = password => {
        const {isUsername} = this.state;
        let isPassword = true;
        const reg = /^[가-힣]+$/;

        if (reg.test(password) || password === '') {
            isPassword = false;
        }

        let loginBtnStyle = {};
        if (isUsername && isPassword) {
            loginBtnStyle = {backgroundColor: '#142765'};
        } else {
            loginBtnStyle = {backgroundColor: '#C2D8E9'};
        }

        this.setState({password, isPassword, loginBtnStyle});
    }

    async onClick() {
        const {setToast} = this.props;
        const {username, password, isUsername, isPassword} = this.state;

        if(!(isUsername && isPassword) && _.isNil(isUsername) && _.isNil(isPassword)) {
            return;
        }

        if(username === '' || password === '') {
            setToast({toastYn: true, toastMsg: '아이디, 패스워드를 입력하세요.'});
            return;
        }

        const res = await LoginRest.login(username, password);

        if (res.status === 200) {
            Cookies.set('token', res.data.data);
            this.setState({redirectYn: true});
        } else {
            setToast({toastYn: true, toastMsg: '아이디, 비밀번호가 일치하지 않습니다.'});
        }
    }

    render() {
        const {username, password, redirectYn, isUsername, isPassword, loginBtnStyle} = this.state;
        return (
            <Container className={login}>
                <Row className={image}>
                    <Image src={logo} fluid />
                </Row>
                <Row className={inputRow}>
                    <Col>
                        <input className="username"type="text" value={username} onChange={e => this.onChangeUsername(e.target.value)} placeholder="아이디"/>
                        {username !== '' && <span className="material-icons" onClick={() => this.onChangeUsername('')}>clear</span>}
                    </Col>
                </Row>
                {!isUsername && !_.isNil(isUsername) && (
                    <Row className={warningRow} style={{paddingLeft: '5px'}}>
                        <Col>
                            <span className="material-icons">error</span>
                            <span> 아이디는 영문자, 숫자만 가능합니다.</span>
                        </Col>
                    </Row>
                )}
                <Row className={inputRow}>
                    <Col>
                        <input className="password" type="text" value={password} onChange={e => this.onChangePassword(e.target.value)} placeholder="비밀번호"/>
                        {password !== '' && <span className="material-icons" onClick={() => this.onChangePassword('')}>clear</span>}
                    </Col>
                </Row>
                {!isPassword && !_.isNil(isPassword) && (
                    <Row className={warningRow} style={{paddingLeft: '5px'}}>
                        <Col>
                            <span className="material-icons">error</span>
                            <span> 비밀번호는 영문자, 숫자, 특수문자만 가능합니다.</span>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col><Button className={loginBtn} style={loginBtnStyle} onClick={this.onClick}>로그인</Button></Col>
                </Row>
                <Row className={signUp}>
                    <Col><a href="">회원가입</a></Col>
                </Row>
                {redirectYn && <Redirect to={{pathname: '/note'}}/>}
            </Container>
        );
    }
}

Login.propTypes = {
    setToast: PropTypes.func
};

const mapDispatchToProps = {
    setToast: DialogActions.setToast
};

export default connect(
    null,
    mapDispatchToProps
)(Login);

