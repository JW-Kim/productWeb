import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Row, Col} from 'react-bootstrap';

import { editRow, warningRow } from '../../assets/styles/com.scss';
import { chkNum, chkEng, chkKor, chkSpecialStr } from '../com/ReqExp';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isText: null
        };
    }

    componentWillMount() {
        const {textVal} = this.props;
        if(!_.isNil(textVal)) {
            this.setState({text: textVal});
        }
    }

    componentWillReceiveProps(nextProps) {
        const {textVal} = this.props;
        if(!_.isNil(textVal) && textVal !== nextProps.textVal) {
            this.setState({text: textVal});
        }
    }

    onChangeText = text => {
        const {onChangeEdit, allowRange, regExp} = this.props;

        let isText = true;

        if (text === '') {
            isText = false;
        }

        if(!_.isNil(regExp) && !regExp.test(text)) {
            isText = false;
        }

        if(!_.isNil(allowRange)) {
            if((!_.isNil(allowRange.num) && allowRange.num !== chkNum(text)) ||
                (!_.isNil(allowRange.eng) && allowRange.eng !== chkEng(text)) ||
                (!_.isNil(allowRange.kor) && allowRange.kor !== chkKor(text)) ||
                (!_.isNil(allowRange.special) && allowRange.special !== chkSpecialStr(text)) ||
                (!_.isNil(allowRange.min) && text.length < allowRange.min) ||
                (!_.isNil(allowRange.max) && text.length > allowRange.max)
            ) {
                isText = false;
            }
        }

        this.setState({text, isText});
        onChangeEdit(text, isText);
    }

    render() {
        const {placeholder, warningText, type} = this.props;
        const {isText, text} = this.state;

        return (
            <React.Fragment>
                <Row className={editRow}>
                    <Col>
                        <input type={type} value={text} onChange={e => this.onChangeText(e.target.value)} placeholder={placeholder}/>
                        {text !== '' && <span className="material-icons" onClick={() => this.onChangeText('')}>clear</span>}
                    </Col>
                </Row>
                {!isText && !_.isNil(isText) && (
                    <Row className={warningRow} style={{paddingLeft: '5px'}}>
                        <Col>
                            <span className="material-icons">error</span>
                            <span>{warningText}</span>
                        </Col>
                    </Row>
                )}
            </React.Fragment>
        );
    }
}

Edit.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    warningText: PropTypes.string,
    onChangeEdit: PropTypes.func,
    allowRange: PropTypes.object,
    regExp: PropTypes.string,
    textVal: PropTypes.string
};

export default Edit;

