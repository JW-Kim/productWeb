import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {note as noteActions} from '../../redux/actions/index';

class NoteCalendarNav extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onPreBtnClick = () => {
        const {onPreviousClick, setDiaryMonth, previousMonth, setDisease, setDiary, setDiaryDt} = this.props;
        setDiaryMonth(this.getMonth(previousMonth));
        setDiaryDt(null);
        setDisease(null);
        setDiary(null);
        onPreviousClick();
    }

    onNextBtnClick = () => {
        const {onNextClick, setDiaryMonth, nextMonth, setDisease, setDiary, setDiaryDt} = this.props;
        setDiaryMonth(this.getMonth(nextMonth));
        setDiaryDt(null);
        setDisease(null);
        setDiary(null);
        onNextClick();
    }

    getMonth(date) {
        const mm = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const yyyy = date.getFullYear();
        const month = yyyy + '-' + mm;
        return month;
    }

    render() {
        const {className} = this.props;
        return (
            <React.Fragment>
                <div className={className}>
                    <span style={{float: 'left', fontSize: '30px'}} className="material-icons"  onClick={() => this.onPreBtnClick()} >keyboard_arrow_left</span>
                    <span style={{float: 'right', fontSize: '30px'}} className="material-icons"  onClick={() => this.onNextBtnClick()} >keyboard_arrow_right</span>
                </div>
            </React.Fragment>
        );
    }
}

NoteCalendarNav.propTypes = {
    diaryMonth: PropTypes.string,
    nextMonth: PropTypes.string,
    previousMonth: PropTypes.string,
    onPreviousClick: PropTypes.func,
    onNextClick: PropTypes.func,
    setDiaryMonth: PropTypes.func,
    className: PropTypes.object,
    setDiary: PropTypes.func,
    setDisease: PropTypes.func,
    setDiaryDt: PropTypes.func
};

const mapStateToProps = (state) => ({
    diaryMonth: state.note.diaryMonth
});

const mapDispatchToProps = {
    setDiaryMonth: noteActions.setDiaryMonth,
    setDiary: noteActions.setDiary,
    setDisease: noteActions.setDisease,
    setDiaryDt: noteActions.setDiaryDt
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCalendarNav);

