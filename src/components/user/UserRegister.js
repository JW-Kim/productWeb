import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import {Button, Container, Row, Col} from 'react-bootstrap';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { inputRow, loginBtn, inputRowTitle, editRow, warningRow } from '../../assets/styles/com.scss';
import Edit from '../com/Edit';
import UserRest from '../../apis/UserRest';
import {dialog as DialogActions} from '../../redux/actions/index';

class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoginId: '',
            userPwd: '',
            userPwd2: '',
            userNm: '',
            email: '',
            fileId: null,
            isUserLoginId: false,
            isUserPwd: false,
            isUserPwd2: null,
            isUserNm: false,
            isEmail: false,
            isCorrectPwd: false,
            btnStyle: {backgroundColor: '#C2D8E9'},
            redirectYn: false
        };
    }

    onSave = () => {
        const {match} = this.props;
        const type = match.params.type;

        if (type === 'create') {
            this.insertUser();
        }
    }

    async insertUser() {
        const {setToast} = this.props;
        const {userLoginId, email, userPwd, userPwd2, userNm} = this.state;

        if (_.isNil(userLoginId) || _.isNil(email) || _.isNil(userPwd) || _.isNil(userPwd2) || _.isNil(userNm)
            || userLoginId === '' || email === '' || userPwd === '' || userPwd2 === '' || userNm === '') {
            return;
        }

        if (userPwd !== userPwd2) {
            return;
        }

        const res = await UserRest.selectUserExist({userLoginId, email});
        if (res.status === 200) {
            if(res.data.data) {
                setToast({toastYn: true, toastMsg: '동일한 ID가 존재합니다.'});
                return;
            }
        } else {
            setToast({toastYn: true, toastMsg: '조회를 실패하였습니다.'});
            return;
        }

        const res1 = await UserRest.createUser({userLoginId, email, userPwd, userPwd2, userNm});
        if (res1.status === 200) {
            setToast({toastYn: true, toastMsg: '사용자가 등록되었습니다.'});
            this.setState({redirectYn: true});
        } else {
            setToast({toastYn: true, toastMsg: '등록을 실패하였습니다.'});
            return;
        }
    }

    checkBtnStyle() {
        const {match} = this.props;
        const {isUserLoginId, isUserPwd, isUserPwd2, isUserNm, isEmail} = this.state;

        const type = match.params.type;

        if (type === 'create') {
            if (isUserLoginId && isUserPwd && isUserPwd2 && isUserNm && isEmail) {
                this.setState({btnStyle: {backgroundColor: '#142765', height: 60}});
            } else {
                this.setState({btnStyle: {backgroundColor: '#C2D8E9', height: 60}});
            }
        } else {
            if (isUserNm && isEmail) {
                this.setState({btnStyle: {backgroundColor: '#142765', height: 60}});
            } else {
                this.setState({btnStyle: {backgroundColor: '#C2D8E9', height: 60}});
            }
        }
    }

    onChangeUserLoginId = (userLoginId, isUserLoginId) => {
        // console.log('onChangeUserLoginId', userLoginId, isUserLoginId);
        this.setState({userLoginId, isUserLoginId}, () => {
            this.checkBtnStyle();
        });
    }

    onChangeUserPwd = (userPwd, isUserPwd) => {
        // console.log('onChangeUserPwd', userPwd, isUserPwd);
        this.setState({userPwd, isUserPwd}, () => {
            this.checkBtnStyle();
        });
    }

    changeUserPwd2 = (userPwd2) => {
        // console.log('changeUserPwd2', userPwd2);
        const {userPwd} = this.state;
        this.setState({userPwd2, isUserPwd2: userPwd === userPwd2}, () => {
            this.checkBtnStyle();
        });
    }

    onChangeUserNm = (userNm, isUserNm) => {
        // console.log('onChangeUserNm', userNm, isUserNm);
        this.setState({userNm, isUserNm}, () => {
            this.checkBtnStyle();
        });
    }

    onChangeEmail = (email, isEmail) => {
        // console.log('onChangeEmail', email, isEmail);
        this.setState({email, isEmail}, () => {
            this.checkBtnStyle();
        });
    }

    render() {
        const {userPwd, userPwd2, isUserPwd2, btnStyle, redirectYn} = this.state;

        return(
                <Container style={{padding: '5px'}}>
                    <Row className={inputRow}>
                        <Col className={inputRowTitle} xs={4}>아이디</Col>
                        <Col xs={8}>
                            <Edit
                                type="text"
                                placeholder="영문/숫자 6~12자"
                                warningText="영문자, 숫자 6~12자만 가능합니다."
                                onChangeEdit={(text, isText) => this.onChangeUserLoginId(text, isText)}
                                regExp={/^[.A-Za-z0-9]*$/}
                                allowRange={{ min: 6, max: 12 }}
                            />
                        </Col>
                    </Row>
                    <Row className={inputRow}>
                        <Col className={inputRowTitle} xs={4}>비밀번호</Col>
                        <Col xs={8}>
                            <Edit
                                type="password"
                                placeholder="영문/숫자/특수기호 조합 6~12자"
                                warningText="영문자, 숫자, 특수문자 조합 6~12자만 가능합니다."
                                onChangeEdit={(text, isText) => this.onChangeUserPwd(text, isText)}
                                allowRange={{ num: true, eng: true, special: true, min: 6, max: 12 }}
                            />
                        </Col>
                    </Row>
                    <Row className={inputRow}>
                        <Col className={inputRowTitle} xs={4}>비밀번호 확인</Col>
                        <Col xs={8}>
                            <Row className={editRow}>
                                <Col>
                                    <input type="password" value={userPwd2} onChange={e => this.changeUserPwd2(e.target.value)} placeholder="비밀번호 확인"/>
                                    {userPwd2 !== '' && <span className="material-icons" onClick={() => this.changeUserPwd2('')}>clear</span>}
                                </Col>
                            </Row>
                            {!isUserPwd2 && !_.isNil(isUserPwd2) && (userPwd !== userPwd2) && (
                                <Row className={warningRow} style={{paddingLeft: '5px'}}>
                                    <Col>
                                        <span className="material-icons">error</span>
                                        <span>패스워드가 일치하지 않습니다.</span>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                    <Row className={inputRow}>
                        <Col className={inputRowTitle} xs={4}>이름</Col>
                        <Col xs={8}>
                            <Edit
                                type="text"
                                placeholder="한글/영문/숫자 12자"
                                warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                                onChangeEdit={(text, isText) => this.onChangeUserNm(text, isText)}
                                regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                allowRange={{ special: false, max: 12 }}
                            />
                        </Col>
                    </Row>
                    <Row className={inputRow}>
                        <Col className={inputRowTitle} xs={4}>email</Col>
                        <Col xs={8}>
                            <Edit
                                type="text"
                                placeholder="xxx@xxx.xxx"
                                warningText="이메일 형식이 맞지 않습니다."
                                onChangeEdit={(text, isText) => this.onChangeEmail(text, isText)}
                                regExp={/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i}
                                allowRange={{ max: 50 }}
                            />
                        </Col>
                    </Row>
                    <Row><Col><Button className={loginBtn} style={btnStyle} onClick={() => this.onSave()}>저장</Button></Col></Row>
                    {redirectYn && <Redirect to={{pathname: '/login'}}/>}
                </Container>
        );
    }
}

UserRegister.propTypes = {
    match: PropTypes.object,
    setToast: PropTypes.func
};

const mapDispatchToProps = {
    setToast: DialogActions.setToast
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(UserRegister));

