import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Modal, Button} from 'react-bootstrap';
import styled from 'styled-components';
import $ from 'jquery';

import {noteInfoContent} from '../../assets/styles/set.scss';
import {myModal, modalBody, inputRowTitle, btn} from '../../assets/styles/com.scss';
import Edit from '../com/Edit';
import {StockRest} from '../../apis/index';
import {toast} from '../com/ComSvc';
import ModalHeader from '../com/ModalHeader';

class StockDtlCompanyDtl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyNm: '',
            url: ''
        };
    }

    componentWillMount() {
        this.promise = new $.Deferred();
    }

    onClose = () => {
        return this.promise.reject();
    }

    onChangeCompanyNm = (companyNm) => {
        this.setState({companyNm});
    }

    onChangeUrl = (url) => {
        this.setState({url});
    }

    async insertCompany() {
        const {companyNm, url} = this.state;
        const res = await StockRest.insertCompany({companyNm, url});
        if (res.status === 200) {
            toast('저장되었습니다.');
        }else {
            toast('등록을 실패하였습니다.');
        }
        return this.promise.resolve();
    }

    async updateCompany() {
        return this.promise.resolve();
    }

    onSave = () => {
        const { type } = this.props;
        if (type === 'CREATE') {
            this.insertCompany();
        } else {
            this.updateCompany();
        }
    }

    render() {
        const {companyNm, url} = this.state;
        return (
            <WrapperStyled>
                <Modal show={true} dialogClassName={myModal}>
                    <Modal.Body>
                        <ModalHeader title="회사 추가" type="LEFT" close={() => this.onClose()}/>
                        <div className={modalBody}>
                            <Row className={noteInfoContent}>
                                <Col className={inputRowTitle} xs={4}>회사 이름</Col>
                                <Col xs={8}>
                                    <Edit
                                        type="text"
                                        textVal={companyNm}
                                        placeholder="한글/영문/숫자 12자"
                                        warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                                        onChangeEdit={(text, isText) => this.onChangeCompanyNm(text, isText)}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 12 }}
                                    />
                                </Col>
                            </Row>
                            <Row className={noteInfoContent}>
                                <Col className={inputRowTitle} xs={4}>크롤링 주소</Col>
                                <Col xs={8}>
                                    <Edit
                                        type="text"
                                        textVal={url}
                                        placeholder="한글/영문/숫자 12자"
                                        warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                                        onChangeEdit={(text, isText) => this.onChangeUrl(text, isText)}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 12 }}
                                    />
                                </Col>
                            </Row>
                            <Row><Col> <Col><Button className={btn} onClick={() => this.onSave()}>저장</Button></Col></Col></Row>
                        </div>
                    </Modal.Body>
                </Modal>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
}`;


StockDtlCompanyDtl.propTypes = {
    type: PropTypes.string,
    close: PropTypes.func
};

export default StockDtlCompanyDtl;


