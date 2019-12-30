import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

import { modalTitle, modalHeader } from '../../assets/styles/com.scss';

class ModalHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClose = () => {
        const {close} = this.props;
        close();
    }

    render() {
        const {title} = this.props;
        return (
            <Row className={modalHeader}>
                <Col xs={3}><span className="material-icons" onClick={() => this.onClose()}>clear</span></Col>
                <Col xs={6} className={modalTitle}>{title}</Col>
                <Col xs={3} />
            </Row>
        );
    }
}

ModalHeader.propTypes = {
    title: PropTypes.string,
    close: PropTypes.func
};

export default ModalHeader;
