import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { textareaEditRow, warningRow } from '../../assets/styles/com.scss';
import { chkNum, chkEng, chkKor, chkSpecialStr } from '../com/ReqExp';

class TextareaEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isText: null
        };
    }

    onChangeText = text => {
        const {onChangeText, allowRange, regExp} = this.props;

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

        onChangeText(text, isText);
    }

    render() {
        const {warningText, textVal} = this.props;
        const {isText} = this.state;

        return (
            <React.Fragment>
                <div className={textareaEditRow}>
                    <div>
                        <textarea value={textVal} onChange={(event) => this.onChangeText(event.target.value)} />
                    </div>
                </div>
                {!isText && !_.isNil(isText) && warningText !== '' && !_.isNil(warningText) && (
                    <div className={warningRow} style={{paddingLeft: '5px'}}>
                        <div>
                            <span className="material-icons">error</span>
                            <span>{warningText}</span>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

TextareaEdit.propTypes = {
    warningText: PropTypes.string,
    onChangeText: PropTypes.func,
    allowRange: PropTypes.object,
    regExp: PropTypes.string,
    textVal: PropTypes.string
};

export default TextareaEdit;

