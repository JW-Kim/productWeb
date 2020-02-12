import React, {Component} from 'react';
import {Button, Modal, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import $ from 'jquery';

import {confirmModal} from '../../assets/styles/com.scss';

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.promise = new $.Deferred();
        $('.modal-backdrop').css('z-index', '1050');
    }

    cancel = () => {
        return this.promise.reject();
    }

    confirm = () => {
        return this.promise.resolve();
    }

    render() {
        const {msg} = this.props;
        return (
            <Modal show={true} className={confirmModal}>
                <Modal.Body>
                    <Row>
                        <Col>{msg}</Col>
                    </Row>
                    <Row style={{marginTop: '20px'}}>
                        <Col style={{textAlign: 'right'}}>
                            <Button style={{marginRight: '10px', borderColor: '#C2D8E9', backgroundColor: '#fff', color: '#142765'}} onClick={() => this.confirm()}>확인</Button>
                            <Button style={{borderColor: '#C2D8E9', backgroundColor: '#fff', color: '#142765'}} onClick={() => this.cancel()}>취소</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

Confirm.propTypes = {
    msg: PropTypes.string
};

export default Confirm;
