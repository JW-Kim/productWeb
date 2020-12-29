import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Modal, Col, Row, Button, Dropdown} from 'react-bootstrap';
import $ from 'jquery';

import ModalHeader from '../com/ModalHeader';
import Edit from '../com/Edit';
import {openPop} from '../com/ModalSvc';
import StockDtlCompany from './StockDtlCompany';
import {myModal, btn, modalBody, inputRowTitle} from '../../assets/styles/com.scss';
import {noteInfoContent} from '../../assets/styles/set.scss';
import {toast} from '../com/ComSvc';
import {StockRest} from '../../apis/index';

class StockDtl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxPrice: 0,
            minPrice: 0,
            preClosingPrice: 0,
            price: 0,
            direction: 'UP',
            companyNm: '',
            companyId: ''
        };
    }

    async componentWillMount() {
        this.promise = new $.Deferred();
        this.getStock();
    }

    async getStock() {
        const {stockId} = this.props;
        const res = await StockRest.selectStock(stockId);
        this.setState({
            maxPrice: res.data.data.maxPrice,
            minPrice: res.data.data.minPrice,
            preClosingPrice: res.data.data.preClosingPrice,
            price: res.data.data.price,
            direction: res.data.data.direction,
            companyNm: res.data.data.companyNm,
            companyId: res.data.data.companyId,
        });
    }

    async insertStock() {
        const {stockDt} = this.props;
        const {companyId, direction, maxPrice, minPrice, price, preClosingPrice} = this.state;
        const res = await StockRest.insertStock({stockDt, companyId, direction, maxPrice, minPrice, price, preClosingPrice});
        if (res.status === 200) {
            toast('저장되었습니다.');
        }else {
            toast('등록을 실패하였습니다.');
        }
        return this.promise.resolve();
    }

    async updateStock() {
        const {stockId} = this.props;
        const {companyId, direction, maxPrice, minPrice, price, preClosingPrice} = this.state;
        const res = await StockRest.updateStock({stockId, companyId, direction, maxPrice, minPrice, price, preClosingPrice});
        if (res.status === 200) {
            toast('저장되었습니다.');
        }else {
            toast('등록을 실패하였습니다.');
        }
        return this.promise.resolve();
    }

    onSave = () => {
        const { type } = this.props;
        if (type === 'CREATE') {
            this.insertStock();
        } else {
            this.updateStock();
        }
    }
    onClose = () => {
        return this.promise.reject();
    }

    onChangeMaxPrice = (maxPrice) => {
        this.setState({maxPrice});
    }

    onChangeMinPrice = (minPrice) => {
        this.setState({minPrice});
    }

    onChangePreClosingPrice = (preClosingPrice) => {
        this.setState({preClosingPrice});
    }

    onChangePrice = (price) => {
        this.setState({price});
    }

    onChangeDirection = (direction) => {
        this.setState({direction});
    }

    setCompany = (companyId, companyNm) =>{
        this.setState({companyId, companyNm});
    }

    onOpenCompany = () => {
        openPop(<StockDtlCompany setCompany={(companyId, companyNm) => this.setCompany(companyId, companyNm)} close={() => this.onCloseStockDtlCompany()} />).then(() => {
        });
    }

    onCloseStockDtlCompany = () => {

    }

    render() {
        const {stockDt} = this.props;
        const {maxPrice, minPrice, preClosingPrice, price, direction, companyNm} = this.state;

        return (
            <div>
                <Modal show={true} dialogClassName={myModal}>
                    <Modal.Body>
                        <ModalHeader title="주식 작성" type="LEFT" close={() => this.onClose()}/>
                        <div className={modalBody}>
                            <Row className={noteInfoContent}>
                                <Col className={inputRowTitle} xs={4}>날짜</Col>
                                <Col xs={8}>{stockDt}</Col>
                            </Row>
                            <Row className={noteInfoContent}>
                                <Col className={inputRowTitle} xs={4}>회사</Col>
                                <Col xs={8}><Button onClick={() => this.onOpenCompany()}>회사 검색</Button> {companyNm}</Col>
                            </Row>
                            <Row className={noteInfoContent}>
                                <Col className={inputRowTitle} xs={4}>기울기</Col>
                                <Col xs={8} >
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic">
                                            {direction === 'UP' ? '상향' : '하향'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item key={1} onClick={() => this.onChangeDirection('UP')}>상향</Dropdown.Item>
                                            <Dropdown.Item key={2} onClick={() => this.onChangeDirection('DOWN')}>하향</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row className={noteInfoContent}>
                                <Col className={inputRowTitle} xs={4}>전고점</Col>
                                <Col xs={8}>
                                    <Edit
                                        type="text"
                                        textVal={maxPrice}
                                        placeholder="한글/영문/숫자 12자"
                                        warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                                        onChangeEdit={(text, isText) => this.onChangeMaxPrice(text, isText)}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 12 }}
                                    />
                                </Col>
                            </Row>
                            <Row className={noteInfoContent}>
                                <Col className={inputRowTitle} xs={4}>전저점</Col>
                                <Col xs={8}>
                                    <Edit
                                        type="text"
                                        textVal={minPrice}
                                        placeholder="한글/영문/숫자 12자"
                                        warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                                        onChangeEdit={(text, isText) => this.onChangeMinPrice(text, isText)}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 12 }}
                                    />
                                </Col>
                            </Row>
                            <Row className={noteInfoContent}>
                                <Col className={inputRowTitle} xs={4}>전날 종가</Col>
                                <Col xs={8}>
                                    <Edit
                                        type="text"
                                        textVal={preClosingPrice}
                                        placeholder="한글/영문/숫자 12자"
                                        warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                                        onChangeEdit={(text, isText) => this.onChangePreClosingPrice(text, isText)}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 12 }}
                                    />
                                </Col>
                            </Row>
                            <Row className={noteInfoContent}>
                                <Col className={inputRowTitle} xs={4}>매입가</Col>
                                <Col xs={8}>
                                    <Edit
                                        type="text"
                                        textVal={price}
                                        placeholder="한글/영문/숫자 12자"
                                        warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                                        onChangeEdit={(text, isText) => this.onChangePrice(text, isText)}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 12 }}
                                    />
                                </Col>
                            </Row>
                            <Row><Col> <Col><Button className={btn} onClick={() => this.onSave()}>저장</Button></Col></Col></Row>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

StockDtl.propTypes = {
    type: PropTypes.string,
    stockDt: PropTypes.string,
    stockId: PropTypes.string
};

export default StockDtl;
