import React, { Component } from 'react';
import {Col, Row, Dropdown} from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {noteInfo, noteInfoContent} from '../../assets/styles/set.scss';
import {inputRowTitle} from '../../assets/styles/com.scss';
import Edit from '../com/Edit';

class NoteDtlInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onChangeNoteNm = (noteNm, isNoteNm) => {
        const {setNoteNm} = this.props;
        setNoteNm(noteNm, isNoteNm);
    }

    onChangeSex = (sex) => {
        const {setSex} = this.props;
        setSex(sex, true);
    }

    render() {
        const {noteNm, sex} = this.props;

        return (
            <WrapperStyled>
            <div className={noteInfo}>
                <Row><Col>노트 정보</Col></Row>
                <Row className={noteInfoContent}>
                    <Col className={inputRowTitle} xs={4}>노트 이름</Col>
                    <Col xs={8}>
                        <Edit
                            type="text"
                            textVal={noteNm}
                            placeholder="한글/영문/숫자 12자"
                            warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                            onChangeEdit={(text, isText) => this.onChangeNoteNm(text, isText)}
                            regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                            allowRange={{ special: false, max: 12 }}
                        />
                    </Col>
                </Row>
                <Row className={noteInfoContent}>
                    <Col className={inputRowTitle} xs={4}>성별</Col>
                    <Col xs={8} >
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                {sex === 'M' ? '남자' : '여자'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item key={1} onClick={() => this.onChangeSex('M')}>남자</Dropdown.Item>
                                <Dropdown.Item key={2} onClick={() => this.onChangeSex('W')}>여자</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row className={noteInfoContent}>
                    <Col className={inputRowTitle} xs={4}>출생일</Col>
                    <Col xs={8} />
                </Row>
            </div>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    .dropdown {
        button {
            background-color: #fff;
            border:1px solid #C2D8E9;
            color: #212529;
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


NoteDtlInfo.propTypes = {
    noteNm: PropTypes.string,
    sex: PropTypes.string,
    setNoteNm: PropTypes.func,
    setSex: PropTypes.func
};

export default NoteDtlInfo;

