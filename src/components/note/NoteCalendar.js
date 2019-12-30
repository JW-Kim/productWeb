import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DayPicker from 'react-day-picker';
import _ from 'lodash';

import {note as noteActions} from '../../redux/actions/index';
import DiaryRest from '../../apis/DiaryRest';
import NoteCalendarNav from './NoteCalendarNav';
import NoteCalendarDay from './NoteCalendarDay';

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const WEEKDAYS_SHORT = ['일', '월', '화', '수', '목', '금', '토'];

class NoteCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        const {noteId, diaryMonth} = this.props;
        if(!_.isNil(nextProps.noteId) && nextProps.noteId !== noteId) {
            this.getToday();
            if(nextProps.diaryMonth === diaryMonth) {
                this.getMonthDiary(nextProps.noteId, nextProps.diaryMonth);
                this.getMonthDisease(nextProps.noteId, nextProps.diaryMonth);
            }
        }
        if(!_.isNil(nextProps.diaryMonth) && nextProps.diaryMonth !== diaryMonth) {
            this.getMonthDiary(nextProps.noteId, nextProps.diaryMonth);
            this.getMonthDisease(nextProps.noteId, nextProps.diaryMonth);
        }
    }

    async getMonthDiary(noteId, diaryMonth) {
        const {setDiaries} = this.props;
        const res = await DiaryRest.getMonthDiary({noteId, diaryMonth});
        const diaries = res.data.data;
        setDiaries(diaries);
    }

    async getMonthDisease(noteId, diseaseMonth) {
        const {setDiseases} = this.props;
        const res = await DiaryRest.getMonthDisease({noteId, diseaseMonth});
        const diseases = res.data.data;
        setDiseases(diseases);
    }

    onDayClick = (diaryDt) => {
        const {setDiaryDt, diaries, diseases, setDiary, setDisease} = this.props;

        setDiaryDt(diaryDt);
        setDiary(null);
        setDisease(null);

        if(!_.isNil(diaries) && !_.isNil(diseases)) {
            const date = diaryDt.getDate();
            diaries.forEach(async function(diary) {
                if(date === new Date(diary.diaryDt).getDate()) {
                    const res = await DiaryRest.getDiary(diary.diaryId);
                    setDiary(res.data.data);
                }
            });
            const diseaseList = [];
            diseases.forEach(async function(disease) {
                if(date === new Date(disease.diseaseDt).getDate()) {
                    diseaseList.push(disease);
                }
            });
            setDisease(diseaseList);
        }
    }

    getToday() {
        const {setDiaryMonth} = this.props;
        const today = new Date();
        const mm = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
        const yyyy = today.getFullYear();
        const month = yyyy + '-' + mm;

        setDiaryMonth(month);
    }

    renderDay = (day) => {
        const {diaries, diseases} = this.props;
        return (
            <NoteCalendarDay day={day} diaries={diaries} diseases={diseases} />
        );
    }

    render() {
        const {diaryDt, diaries, diseases} = this.props;
        return (
            <React.Fragment>
                <WrapperStyled>
                    { !_.isNil(diaries) && !_.isNil(diseases) &&
                    <DayPicker
                        locale="ko"
                        months={MONTHS}
                        weekdaysShort={WEEKDAYS_SHORT}
                        onDayClick={this.onDayClick}
                        selectedDays={diaryDt}
                        renderDay={day => this.renderDay(day)}
                        navbarElement={<NoteCalendarNav />}
                    />}
                </WrapperStyled>
                <NoteCalendarDay diaries={diaries}/>
            </React.Fragment>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    .DayPicker,
    .DayPicker-wrapper {
      :focus {
        outline: none;
      }
      width: 100%;
      font-size: 18px;
    }

    .DayPicker-Weekday {
      color: #E6ECF0;
      font-family: 'Montserrat-SemiBold';
    }
    
    .DayPicker-Day {
        padding: 0px;
    }
    
    .DayPicker-Caption {
        text-align: center;
    }
    
    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover, .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
        background-color: #1abc9c;
    }
}`;

NoteCalendar.propTypes = {
    noteId: PropTypes.string,
    diaryMonth: PropTypes.string,
    diaryDt: PropTypes.diaryDt,
    diaries: PropTypes.array,
    diseases: PropTypes.array,
    setDiaryMonth: PropTypes.func,
    setDiaryDt: PropTypes.func,
    setDiaries: PropTypes.func,
    setDiseases: PropTypes.func,
    setDiary: PropTypes.func,
    setDisease: PropTypes.func
};

const mapStateToProps = (state) => ({
    noteId: state.note.noteId,
    diaryDt: state.note.diaryDt,
    diaryMonth: state.note.diaryMonth,
    diaries: state.note.diaries,
    diseases: state.note.diseases
});

const mapDispatchToProps = {
    setDiaryMonth: noteActions.setDiaryMonth,
    setDiaryDt: noteActions.setDiaryDt,
    setDiaries: noteActions.setDiaries,
    setDiseases: noteActions.setDiseases,
    setDiary: noteActions.setDiary,
    setDisease: noteActions.setDisease
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCalendar);
