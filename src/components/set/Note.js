import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Modal, Row, Col} from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import ModalHeader from '../com/ModalHeader';
import {myModal, row} from '../../assets/styles/com.scss';

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClose = () => {
        const {close} = this.props;
        close();
    }

    render() {
        const {openYn} = this.props;

        return (
            <div>
                <Modal show={openYn} dialogClassName={myModal}>
                    <Modal.Body>
                        <ModalHeader title="일기장" close={() => this.onClose()}/>
                    </Modal.Body>
                </Modal>
                {logoutYn && <Redirect to={{pathname: '/login'}} />}
            </div>
        );
    }
}

Note.propTypes = {
    openYn: PropTypes.bool,
    close: PropTypes.func
};

export default Note;
