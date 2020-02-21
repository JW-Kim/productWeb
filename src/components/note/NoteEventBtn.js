import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import _ from 'lodash';
import onClickOutside from 'react-onclickoutside';

import {openPop} from '../com/ModalSvc';
import NoteDiaryDtl from './NoteDiaryDtl';
import NoteDiseaseDtl from './NoteDiseaseDtl';
import {note as noteActions} from '../../redux/actions/index';

class NoteEventBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openYn: false,
            diaryYn: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isNil(nextProps.diary)) {
            this.setState({diaryYn: false});
        } else {
            this.setState({diaryYn: true});
        }
    }

    handleClickOutside = () => {
        this.setState({openYn: false});
    }

    openNoteDiaryDtl = () => {
        const {noteId, diaryDt, setDiaryMonth, diaryMonth, setDiaries, setDiaryDt, setDisease, setDiary} = this.props;
        this.setState({openYn: false});
        openPop(<NoteDiaryDtl type="CREATE" noteId={noteId} diaryDt={diaryDt}/>).then(() => {
            const month = diaryMonth;
            setDiaryMonth(null);
            setDiaryMonth(month);
            setDiaries(null);
            setDiaryDt(null);
            setDisease(null);
            setDiary(null);
        }, () => {
            this.setState({openYn: false});
        });
    }

    openNoteDiseaseDtl = () => {
        const {noteId, diaryDt, diaryMonth, setDiaryMonth, setDiaryDt, setDisease, setDiary} = this.props;
        openPop(<NoteDiseaseDtl type="CREATE" noteId={noteId} diseaseDt={diaryDt}/>).then(() => {
            const month = diaryMonth;
            setDiaryMonth(null);
            setDiaryMonth(month);
            setDiaryDt(null);
            setDisease(null);
            setDiary(null);
            this.setState({openYn: false});
        }, () => {
            this.setState({openYn: false});
        });
    }

    render() {
        const {displayYn} = this.props;
        const {openYn, diaryYn} = this.state;

        return (
            <WrapperStyled>
                <div className="event">
                    {displayYn && openYn && diaryYn && (
                            <OverlayTrigger
                                key="diary"
                                placement="left"
                                defaultShow={true}
                                overlay={
                                    <Tooltip>일기 작성</Tooltip>
                                }
                            >
                                <span id="createDiary" className="material-icons" onClick={() => this.openNoteDiaryDtl()}>create</span>
                            </OverlayTrigger>
                    )}
                    {openYn && displayYn && (
                            <OverlayTrigger
                                key="disease"
                                placement="left"
                                defaultShow={true}
                                overlay={
                                    <Tooltip>질병 기록</Tooltip>
                                }
                            >
                                <span id="createDisease" className="material-icons" onClick={() => this.openNoteDiseaseDtl()}>create</span>
                            </OverlayTrigger>
                    )}
                    {openYn && displayYn  && (
                            <span id="clear" className="material-icons" onClick={() => this.setState({openYn: false})}>clear</span>

                    )}
                    {!openYn && displayYn && (
                        <span id="add" className="material-icons" onClick={() => this.setState({openYn: true})}>add</span>
                    )}
                </div>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    .event {
        position: absolute
        bottom: 10px;
        right: 10px;
    }
    #add, #clear, #createDiary, #createDisease {
        background-color: rgba(231,76,60,1);
        border: none;
        color: white;
        padding: 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        border-radius: 50%;
    }
    #createDisease {
        background-color: #1abc9c;
        position: absolute;
        bottom: 70px;
    }
    #createDiary {
        background-color: #1abc9c;
        position: absolute;
        bottom: 140px;a
    }
}`;


NoteEventBtn.propTypes = {
    displayYn: PropTypes.string,
    diary: PropTypes.object,
    noteId: PropTypes.string,
    diaryDt: PropTypes.string,
    diaryMonth: PropTypes.string,
    setDiaryMonth: PropTypes.func,
    setDiaries: PropTypes.func,
    setDiaryDt: PropTypes.func,
    setDiary: PropTypes.func,
    setDisease: PropTypes.func
};

const mapStateToProps = (state) => ({
    diary: state.note.diary,
    noteId: state.note.noteId,
    diaryDt: state.note.diaryDt,
    diaryMonth: state.note.diaryMonth
});

const mapDispatchToProps = {
    setDiaryMonth: noteActions.setDiaryMonth,
    setDiaries: noteActions.setDiaries,
    setDiaryDt: noteActions.setDiaryDt,
    setDiary: noteActions.setDiary,
    setDisease: noteActions.setDisease,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(onClickOutside(NoteEventBtn));


