import React, { Component } from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { inputRow, inputRowTitle} from '../../assets/styles/com.scss';
import {noteDtlInputIntRow, noteDtlInputDecRow} from '../../assets/styles/note.scss';
import Edit from '../com/Edit';

class NoteDiaryDtlWeight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weightInt: '',
            weightDecimal: '',
            isWeightInt: false,
            isWeightDecimal: false
        };
    }

    onChangeWeightInt = (weightInt, weightDecimal, isText) => {
        console.log(weightInt, weightDecimal, isText);
        const {changeWeight} = this.props;
        const {isWeightDecimal} = this.state;

        this.setState({weightInt});
        changeWeight(`${weightInt}.${weightDecimal}`, isText && isWeightDecimal);
    }

    onChangeWeightDecimal = (weightInt, weightDecimal, isText) => {
        console.log(weightInt, weightDecimal, isText);
        const {changeWeight} = this.props;
        const {isWeightInt} = this.state;

        this.setState({weightDecimal});
        changeWeight(`${weightInt}.${weightDecimal}`, isText && isWeightInt);
    }

    render() {
        const {weightInt, weightDecimal} = this.state;
        return (
            <WrapperStyled>
                <Row className={inputRow}>
                    <Col className={inputRowTitle} xs={4}>몸무게 (Kg)</Col>
                    <Col xs={4} className={noteDtlInputIntRow}>
                        <Edit
                            type="text"
                            textVal={weightInt}
                            placeholder="숫자 3자"
                            onChangeEdit={(text, isText) => this.onChangeWeightInt(text, weightDecimal, isText)}
                            allowRange={{ num: true, special: false, max: 3 }}
                        />
                        <span>.</span>
                    </Col>
                    <Col xs={4} className={noteDtlInputDecRow}>
                        <Edit
                            type="text"
                            textVal={weightDecimal}
                            placeholder="숫자 2자"
                            onChangeEdit={(text, isText) => this.onChangeWeightDecimal(weightInt, text, isText)}
                            allowRange={{ num: true, special: false, max: 2 }}
                        />
                    </Col>
                </Row>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {


}`;

NoteDiaryDtlWeight.propTypes = {
    changeWeight: PropTypes.func
};

export default NoteDiaryDtlWeight
;


