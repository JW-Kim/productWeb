import React, { Component } from 'react';
import styled from 'styled-components';
import {Row, Col, Dropdown, ButtonGroup, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { inputRow, inputRowTitle} from '../../assets/styles/com.scss';
import Edit from '../com/Edit';

class NoteDiaryDtlShit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            goodStyle: {backgroundColor: '#fff', borderColor: '#4caf50'},
            notBadStyle: {backgroundColor: '#fff', borderColor: '#f9a825'},
            badStyle: {backgroundColor: '#fff', borderColor: '#d32f2f'}
        };
    }

    componentWillMount() {
        const {shitCd, changeShitCd} = this.props;

        if (_.isNil(shitCd) || shitCd === '') {
            changeShitCd('good');
            this.setState({
                goodStyle: {backgroundColor: '#4caf50', borderColor: '#fff'},
                notBadStyle: {backgroundColor: '#fff', borderColor: '#f9a825'},
                badStyle: {backgroundColor: '#fff', borderColor: '#d32f2f'}
            });
        }
    }

    onChangeShitCnt = (shitCnt) => {
        console.log(shitCnt);
        const {changeShitCnt, changeShitDesc, changeShitCd} = this.props;

        changeShitCnt(shitCnt);
        if (shitCnt ===  0) {
            changeShitDesc('');
            changeShitCd('');
        }
    }

    onChangeShitDesc = (shitDesc) => {
        console.log(shitDesc);
        const {changeShitDesc} = this.props;

        changeShitDesc(shitDesc);
    }

    updateIndex = (selectedIndex) => {
        const {changeShitCd} = this.props;

        if(selectedIndex === 0) {
            changeShitCd('good');
            this.setState({
                goodStyle: {backgroundColor: '#4caf50', borderColor: '#fff'},
                notBadStyle: {backgroundColor: '#fff', borderColor: '#f9a825'},
                badStyle: {backgroundColor: '#fff', borderColor: '#d32f2f'}
            });
        } else if (selectedIndex === 1) {
            changeShitCd('notBad');
            this.setState({
                goodStyle: {backgroundColor: '#fff', borderColor: '#4caf50'},
                notBadStyle: {backgroundColor: '#f9a825', borderColor: '#fff'},
                badStyle: {backgroundColor: '#fff', borderColor: '#d32f2f'}
            });
        } else {
            changeShitCd('bad');
            this.setState({
                goodStyle: {backgroundColor: '#fff', borderColor: '#4caf50'},
                notBadStyle: {backgroundColor: '#fff', borderColor: '#f9a825'},
                badStyle: {backgroundColor: '#d32f2f', borderColor: '#fff'}
            });
        }

        this.setState({selectedIndex});
    }

    renderDropdownRow = () => {
        const shitList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        const listItems = shitList.map(item => (
            <Dropdown.Item key={item} onClick={() => this.onChangeShitCnt(item)}>{item}</Dropdown.Item>
        ));

        return <Dropdown.Menu>{listItems}</Dropdown.Menu>;
    }

    render() {
        const {shitCnt, shitDesc} = this.props;
        const {goodStyle, notBadStyle, badStyle} = this.state;

        return (
            <WrapperStyled>
                <Row className={inputRow}>
                    <Col className={inputRowTitle} xs={4}>배변</Col>
                    <Col xs={8} >
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                {shitCnt}
                            </Dropdown.Toggle>

                            {this.renderDropdownRow()}
                        </Dropdown>
                    </Col>
                </Row>
                {shitCnt > 0 && (
                    <Row className={inputRow}>
                        <Col xs={4} />
                        <Col xs={8}>
                            <ButtonGroup style={{width: '100%', height: '30px'}}>
                                <Button style={goodStyle} onClick={() => this.updateIndex(0)} />
                                <Button style={notBadStyle} onClick={() => this.updateIndex(1)} />
                                <Button style={badStyle} onClick={() => this.updateIndex(2)} />
                            </ButtonGroup>
                        </Col>
                    </Row>
                )}
                {shitCnt > 0 && (
                <Row className={inputRow}>
                    <Col xs={4} />
                    <Col xs={8}>
                        <Edit
                            type="text"
                            textVal={shitDesc}
                            placeholder="한글/영문/숫자 12자"
                            warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                            onChangeEdit={(text) => this.onChangeShitDesc(text)}
                            regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                            allowRange={{ special: false, max: 12 }}
                        />
                    </Col>
                </Row>
                )}
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    .dropdown {
        button {
            background-color: #fff;
            border-color: #fff;
            color: #000;
            border:1px solid #C2D8E9;
            width: 100%;
            height: 60px;            
        }
    }   
    
    .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(255,255,255,.5);
    } 
    
    .btn-primary.focus, .btn-primary:focus {
        box-shadow: 0 0 0 0.2rem rgba(255,255,255,.5);
    }

}`;

NoteDiaryDtlShit.propTypes = {
    shitCd: PropTypes.string,
    shitCnt: PropTypes.string,
    shitDesc: PropTypes.string,
    changeShitCnt: PropTypes.func,
    changeShitDesc: PropTypes.func,
    changeShitCd: PropTypes.func
};

export default NoteDiaryDtlShit
;


