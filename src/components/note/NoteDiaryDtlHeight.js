import React, { Component } from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-bootstrap';

import { inputRow, inputRowTitle} from '../../assets/styles/com.scss';
import {noteDtlInputRow} from '../../assets/styles/note.scss';
import Edit from '../com/Edit';

class NoteDiaryDtlHeight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heightInt: '',
            heightDecimal: ''
        };
    }

    onChangeHeightInt = (heightInt, heightDecimal, isText) => {
        console.log(heightInt, heightDecimal, isText);
    }

    onChangeHeightDecimal = (heightInt, heightDecimal, isText) => {
        console.log(heightInt, heightDecimal, isText);
    }

    render() {
        const {heightInt, heightDecimal} = this.state;
        return (
            <WrapperStyled>
                <Row className={inputRow}>
                    <Col className={inputRowTitle} xs={4}>키</Col>
                    <Col xs={4} className={noteDtlInputRow}>
                        <Edit
                            type="text"
                            textVal={heightInt}
                            placeholder="숫자"
                            onChangeEdit={(text, isText) => this.onChangeHeightInt(text, heightDecimal, isText)}
                            allowRange={{ num: true, special: false, max: 3 }}
                        />
                        <span>.</span>
                    </Col>
                    <Col xs={4} className={noteDtlInputRow}>
                        <Edit
                            type="text"
                            textVal={heightDecimal}
                            placeholder="숫자"
                            onChangeEdit={(text, isText) => this.onChangeHeightDecimal(heightInt, text, isText)}
                            allowRange={{ num: true, special: false, max: 2 }}
                        />
                        <span>Cm</span>
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
};

export default NoteDiaryDtlHeight
;


