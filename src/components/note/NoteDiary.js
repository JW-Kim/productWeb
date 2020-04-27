import React, {Component} from 'react';
import {Accordion, Card, Row, Col, Dropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

import {NoteRest} from '../../apis/index';
import Avatar from '../com/Avatar';
import NoteDiaryState from './NoteDiaryState';
import {openPop} from '../com/ModalSvc';
import NoteDiaryDtl from './NoteDiaryDtl';
import {noteStatRow} from '../../assets/styles/note.scss';
import {note as noteActions} from '../../redux/actions/index';
import {DiaryRest} from '../../apis/index';

class NoteDiary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteCfgs: [],
            openYn: true
        };
    }

    componentWillReceiveProps(nextProps) {
        const {noteId} = this.props;
        if (!_.isNil(nextProps.noteId) && nextProps.noteId !== noteId) {
            this.getNoteCfg(nextProps.noteId);
        }
    }

    async getNoteCfg(noteId) {
        const res = await NoteRest.getNoteCfg({noteId});
        this.setState({noteCfgs: res.data.data});
    }

    updateDiary = () => {
        const {noteId, diaryDt, diary, diaryMonth, setDiaryMonth, setDiaries, setDiaryDt, setDisease, setDiary} = this.props;
        openPop(<NoteDiaryDtl type="UPDATE" noteId={noteId} diaryDt={diaryDt} diaryId={diary.diaryId}/>).then(() => {
            const month = diaryMonth;
            setDiaryMonth(null);
            setDiaryMonth(month);
            setDiaries(null);
            setDiaryDt(null);
            setDisease(null);
            setDiary(null);
            this.setState({openYn: false});
        }, () => {
            this.setState({openYn: false});
        });
    }

    deleteDiary = () => {
        this.callDeleteDiary();
    }

    async callDeleteDiary() {
        const {diary, diaryMonth, setDiaryMonth, setDiaries, setDiaryDt, setDiary, setDisease} = this.props;
        await DiaryRest.deleteDiary(diary.diaryId);

        const month = diaryMonth;
        setDiaryMonth(null);
        setDiaryMonth(month);
        setDiaries(null);
        setDiaryDt(null);
        setDiary(null);
        setDisease(null);
        this.setState({openYn: false});
    }

    toggle = () => {
        const {openYn} = this.state;

        this.setState({openYn: !openYn});
    }

    render() {
        const {diary} = this.props;
        const {noteCfgs, openYn} = this.state;
        const diaryDotStyle = {
            height: '5px',
            width: '5px',
            backgroundColor: '#142765',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '5px'
        };

        return (
            <WrapperStyled>
                {!_.isNil(diary) &&
                    <div>
                        <Card>
                            <div>
                            <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => this.toggle()}>
                                <span style={diaryDotStyle}></span>{diary.title}
                            </Accordion.Toggle>
                                {openYn && (
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        <span className="material-icons" style={{float: 'right', lineHeight: '30px'}}>more_horiz</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item key={1} onClick={() => this.updateDiary()}>수정</Dropdown.Item>
                                        <Dropdown.Item key={2} onClick={() => this.deleteDiary()}>삭제</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>)
                                }
                            </div>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Avatar fileId={diary.fileId} style={{width: '100%'}} shape="thumbnail"/>
                                    <Row style={{margin: '5px', fontSize: '13px'}}><Col>{diary.content}</Col></Row>
                                    {_.find(noteCfgs, {noteCfgCd: 'HEIGHT', noteCfgStatCd: 'Y'}) && diary.height !== null && diary.height !== 0 &&
                                        <Row className={noteStatRow}>
                                            <Col xs={4}>키</Col>
                                            <Col xs={8}>{diary.height} cm</Col>
                                        </Row>
                                    }
                                    {_.find(noteCfgs, {noteCfgCd: 'WEIGHT', noteCfgStatCd: 'Y'}) && diary.weight !== null && diary.weight !== 0 &&
                                    <Row className={noteStatRow}>
                                        <Col xs={4}>몸무게</Col>
                                        <Col xs={8}>{diary.weight} kg</Col>
                                    </Row>
                                    }
                                    <NoteDiaryState title="기분" code={diary.feelingCd} />
                                    <NoteDiaryState title="건강" code={diary.healthCd} />
                                    <NoteDiaryState title="열" code={diary.feverCd} />
                                    <NoteDiaryState title="아침식사" code={diary.breakfastCd} />
                                    <NoteDiaryState title="점심식사" code={diary.lunchCd} />
                                    <NoteDiaryState title="저녁식사" code={diary.dinnerCd} />
                                    {_.find(noteCfgs, {noteCfgCd: 'SHIT_CD', noteCfgStatCd: 'Y'}) &&
                                    <NoteDiaryState title="배변" code={diary.shitCd} />
                                    }
                                    {_.find(noteCfgs, {noteCfgCd: 'SHIT_CD', noteCfgStatCd: 'Y'}) &&
                                    <Row className={noteStatRow}>
                                        <Col xs={4} />
                                        <Col xs={8}>{diary.shitCnt} 회 {!_.isNil(diary.shitDesc) && diary.shitDesc !== '' ? `, (${diary.shitDesc})` : ''}</Col>
                                    </Row>
                                    }
                                    {_.find(noteCfgs, {noteCfgCd: 'SLEEP_CD', noteCfgStatCd: 'Y'}) &&
                                    diary.sleepStartTime !== '' && diary.sleepStartTime !== null && diary.sleepEndTime !== '' && diary.sleepEndTime !== null &&
                                    <Row className={noteStatRow}>
                                        <Col xs={4}>수면</Col>
                                        <Col xs={8}>{diary.sleepStartTime} ~ {diary.sleepEndTime}시</Col>
                                    </Row>
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </div>
                }
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    .card {
        border: 1px solid #E6ECF0;
    }
    .card-header {
        font-size: 15px;
        color: #142765;
        background-color: #fff;
        display: inline-block;
        width: 80%;
        border: 0px;
    }
    .card-body {
        font-size: 12px;
        color: #142765;
    }
    .dropdown {
        width: 20%;
        float: right;
        button {
            background-color: #fff;
            border-color: #fff;
            color: #000;
            font-size: 20px;
            font-weight:600;
        }
    }   
    
    .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(255,255,255,.5);
    } 
    
    .btn-primary.focus, .btn-primary:focus {
        box-shadow: 0 0 0 0.2rem rgba(255,255,255,.5);
    }
    
    .dropdown-toggle::after {
        border-top: 0
    }
}`;

NoteDiary.propTypes = {
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
    diaryMonth: state.note.diaryMonth,
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
)(NoteDiary);

