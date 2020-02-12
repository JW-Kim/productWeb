import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button} from 'react-bootstrap';

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

    onSave = () => {
        const {save} = this.props;
        save();
    }

    render() {
        const {title, type} = this.props;
        return (
            <Row className={modalHeader}>
                <Col xs={3}><span className="material-icons" onClick={() => this.onClose()}>clear</span></Col>
                <Col xs={6} className={modalTitle}>{title}</Col>
                {type === 'BOTH' && (
                    <Col xs={3}>
                        <Button
                            onClick={() => this.onSave()}
                            style={{
                                marginRight: '10px',
                                fontsize: '18px',
                                borderColor: '#C2D8E9',
                                backgroundColor: '#C2D8E9',
                                color: '#000'
                            }}>저장</Button>
                    </Col>
                )}
                {type === 'LEFT' && (
                    <Col xs={3} />
                )}
            </Row>
        );
    }
}

ModalHeader.propTypes = {
    title: PropTypes.string,
    close: PropTypes.func,
    btnMsg: PropTypes.string,
    type: PropTypes.string,
    save: PropTypes.func
};

export default ModalHeader;
