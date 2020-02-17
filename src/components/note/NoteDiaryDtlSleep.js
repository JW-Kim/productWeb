import React, { Component } from 'react';
import styled from 'styled-components';
import {Row, Col, Dropdown} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { inputRow, inputRowTitle} from '../../assets/styles/com.scss';

class NoteDiaryDtlSleep extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onChangeSleepStartTime = (sleepStartTime) => {
        const {changeSleepStartTime} = this.props;

        changeSleepStartTime(sleepStartTime);
    }

    onChangeSleepEndTime = (sleepEndTime) => {
        const {changeSleepEndTime} = this.props;

        changeSleepEndTime(sleepEndTime);
    }

    renderSleepStartDropdownRow = () => {
        const sleepStartList = [];
        for (let i = 18; i <= 24; i += 1) {
            sleepStartList.push(i + '');
        }
        const listItems = sleepStartList.map(item => (
            <Dropdown.Item key={item} onClick={() => this.onChangeSleepStartTime(item)}>{item}</Dropdown.Item>
        ));

        return <Dropdown.Menu>{listItems}</Dropdown.Menu>;
    }

    renderSleepEndDropdownRow = () => {
        const sleepEndList = [];
        for (let i = 1; i <= 18; i += 1) {
            sleepEndList.push(i + '');
        }

        const listItems = sleepEndList.map(item => (
            <Dropdown.Item key={item} onClick={() => this.onChangeSleepEndTime(item)}>{item}</Dropdown.Item>
        ));

        return <Dropdown.Menu>{listItems}</Dropdown.Menu>;
    }

    render() {
        const {sleepStartTime, sleepEndTime} = this.props;
        return (
            <WrapperStyled>
                <Row className={inputRow}>
                    <Col className={inputRowTitle} xs={4}>수면</Col>
                    <Col xs={8} >
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                {sleepStartTime}
                            </Dropdown.Toggle>

                            {this.renderSleepStartDropdownRow()}
                        </Dropdown>
                        <span>~</span>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                {sleepEndTime}
                            </Dropdown.Toggle>

                            {this.renderSleepEndDropdownRow()}
                        </Dropdown>
                    </Col>
                </Row>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    .dropdown {
        width: 45%;
        display: inline-block;
        
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

NoteDiaryDtlSleep.propTypes = {
    sleepStartTime: PropTypes.string,
    sleepEndTime: PropTypes.string,
    changeSleepStartTime: PropTypes.func,
    changeSleepEndTime: PropTypes.func
};

export default NoteDiaryDtlSleep
;


