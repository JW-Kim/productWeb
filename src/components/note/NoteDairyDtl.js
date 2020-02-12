import React, { Component } from 'react';
import {Modal, Row, Col, Container} from 'react-bootstrap';
import $ from 'jquery';

import {myModal, modalBody} from '../../assets/styles/com.scss';
import { inputRow, inputRowTitle} from '../../assets/styles/com.scss';
import ModalHeader from '../com/ModalHeader';
import Edit from '../com/Edit';
import NoteDiaryDtlHeight from './NoteDiaryDtlHeight';

class NoteDiaryDtl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }

    componentDidMount() {
        this.promise = new $.Deferred();
        $('.modal-backdrop').css('z-index', '1050');
    }

    onCancel = () => {
        return this.promise.reject();
    }

    onSave = () => {
        return this.promise.resolve();
    }

    onChangeTitle = () => {

    }

    render() {
        const {title} = this.state;
        return (
            <Modal show={true} dialogClassName={myModal}>
                <ModalHeader title="일기 작성" type="BOTH" close={() => this.onCancel()} save={() => this.onSave()}/>
                <Modal.Body>
                    <div className={modalBody}>
                        <Container style={{padding: '5px'}}>
                            <Row className={inputRow}>
                                <Col className={inputRowTitle} xs={4}>제목</Col>
                                <Col xs={8}>
                                    <Edit
                                        type="text"
                                        textVal={title}
                                        placeholder="한글/영문/숫자 12자"
                                        warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                                        onChangeEdit={(text) => this.onChangeTitle(text)}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 12 }}
                                    />
                                </Col>
                            </Row>
                            <NoteDiaryDtlHeight />
                        </Container>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}


NoteDiaryDtl.propTypes = {
};

export default NoteDiaryDtl
;


