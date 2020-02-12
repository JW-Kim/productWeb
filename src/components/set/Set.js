import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Modal, Row, Col} from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import ModalHeader from '../com/ModalHeader';
import {myModal, row} from '../../assets/styles/com.scss';

class Set extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutYn: false,
        };
    }

    onLogout = () => {
        Cookies.remove('token');
        setTimeout(this.setState({logoutYn: true}), 3000);
    }

    onClose = () => {
        const {close} = this.props;
        close();
    }

    render() {
        const {openYn} = this.props;
        const {logoutYn} = this.state;

        return (
            <div>
                <Modal show={openYn} dialogClassName={myModal}>
                    <Modal.Body>
                        <ModalHeader title="설정" type="LEFT" close={() => this.onClose()}/>
                        <Row className={row}>
                            <Col>사용자 정보</Col>
                        </Row>
                        <Row className={row} onClick={() => this.onLogout()}>
                            <Col>로그아웃</Col>
                        </Row>
                    </Modal.Body>
                </Modal>
                {logoutYn && <Redirect to={{pathname: '/login'}} />}
            </div>
        );
    }
}

Set.propTypes = {
    openYn: PropTypes.bool,
    close: PropTypes.func
};

export default Set;
