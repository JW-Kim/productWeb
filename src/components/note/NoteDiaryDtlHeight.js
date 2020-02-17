import React, { Component } from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { inputRow, inputRowTitle} from '../../assets/styles/com.scss';
import {noteDtlInputIntRow, noteDtlInputDecRow} from '../../assets/styles/note.scss';
import Edit from '../com/Edit';

class NoteDiaryDtlHeight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heightInt: '',
            heightDecimal: '',
            isHeightInt: false,
            isHeightDecimal: false
        };
    }

    onChangeHeightInt = (heightInt, heightDecimal, isText) => {
        console.log(heightInt, heightDecimal, isText);
        const {changeHeight} = this.props;
        const {isHeightDecimal} = this.state;

        this.setState({heightInt});
        changeHeight(`${heightInt}.${heightDecimal}`, isText && isHeightDecimal);
    }

    onChangeHeightDecimal = (heightInt, heightDecimal, isText) => {
        console.log(heightInt, heightDecimal, isText);
        const {changeHeight} = this.props;
        const {isHeightInt} = this.state;

        this.setState({heightDecimal});
        changeHeight(`${heightInt}.${heightDecimal}`, isText && isHeightInt);
    }

    render() {
        const {heightInt, heightDecimal} = this.state;
        return (
            <WrapperStyled>
                <Row className={inputRow}>
                    <Col className={inputRowTitle} xs={4}>키 (Cm)</Col>
                    <Col xs={4} className={noteDtlInputIntRow}>
                        <Edit
                            type="text"
                            textVal={heightInt}
                            placeholder="숫자 3자"
                            onChangeEdit={(text, isText) => this.onChangeHeightInt(text, heightDecimal, isText)}
                            allowRange={{ num: true, special: false, max: 3 }}
                        />
                        <span>.</span>
                    </Col>
                    <Col xs={4} className={noteDtlInputDecRow}>
                        <Edit
                            type="text"
                            textVal={heightDecimal}
                            placeholder="숫자 2자"
                            onChangeEdit={(text, isText) => this.onChangeHeightDecimal(heightInt, text, isText)}
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

NoteDiaryDtlHeight.propTypes = {
    changeHeight: PropTypes.func
};

export default NoteDiaryDtlHeight
;


