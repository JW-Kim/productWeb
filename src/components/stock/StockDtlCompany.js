import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Modal} from 'react-bootstrap';
import styled from 'styled-components';
import $ from 'jquery';

import {modalHeader} from '../../assets/styles/set.scss';
import {myModal} from '../../assets/styles/com.scss';
import {searchUserRow} from '../../assets/styles/user.scss';
import Edit from '../com/Edit';
import {StockRest} from '../../apis/index';
import {openPop} from '../com/ModalSvc';
import StockDtlCompanyDtl from './StockDtlCompanyDtl';

class StockDtlCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchVal: '',
            companyList: []
        };

        this.onChangeSearchVal = this.onChangeSearchVal.bind(this);
    }

    componentWillMount() {
        this.promise = new $.Deferred();
    }

    onClose = () => {
        this.setState({searchVal: '', companyList: []});
        return this.promise.reject();
    }

    async onChangeSearchVal(text) {
        if(text === '') {
            const companyList = [];
            this.setState({searchVal: text, companyList});
            return;
        }
        const res = await StockRest.selectCompanyList({searchVal: text});
        this.setState({companyList: res.data.data, searchVal: text});
    }

    selectedCompany = (companyId, companyNm) => {
        const {setCompany} = this.props;

        setCompany(companyId, companyNm);
        return this.promise.resolve();
    }

    onCloseStockDtlCompanyDtl = () => {

    }

    openCompanyDtl = (type) => {
        openPop(<StockDtlCompanyDtl type={type} close={() => this.onCloseStockDtlCompanyDtl()} />).then(() => {
        });
    }

    renderCompanyList = () => {
        const {companyList} = this.state;

        if(companyList.length === 0) {
            return (
                <div />
            );
        }

        const items = companyList.map((item, index) => (
            <Row key={index} style={{height: '60px', lineHeight: '60px', padding: '0px 10px 0px 10px', borderBottom: '1px solid #C2D8E9'}} onClick={() => this.selectedCompany(item.companyId, item.companyNm)}>
                <Col xs={9}>{item.companyNm}</Col>
            </Row>
        ));

        return <div className={searchUserRow}>{items}</div>;
    }

    render() {
        const {searchVal} = this.state;
        return (
            <WrapperStyled>
                <Modal show={true} dialogClassName={myModal}>
                    <Modal.Body>
                        <Row className={modalHeader}>
                            <Col xs={12} className={searchUserRow}>
                                <span className="material-icons" onClick={() => this.onClose()}>arrow_back</span>
                                <span className="material-icons">search</span>
                                <Edit
                                    type="text"
                                    textVal={searchVal}
                                    placeholder="검색어를 입력하세요."
                                    onChangeEdit={(text, isText) => this.onChangeSearchVal(text, isText)}
                                    regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                    allowRange={{ special: false}}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} onClick={() => this.openCompanyDtl('CREATE')}>
                                <span className="material-icons" style={{'color': '#4caf50', 'fontSize': '20px'}}>add_circle</span>
                            </Col>
                            <Col xs={10} />
                        </Row>
                        {this.renderCompanyList()}
                    </Modal.Body>
                </Modal>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
}`;


StockDtlCompany.propTypes = {
    close: PropTypes.func,
    setCompany: PropTypes.func
};

export default StockDtlCompany;


