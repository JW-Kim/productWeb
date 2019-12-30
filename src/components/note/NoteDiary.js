import React, {Component} from 'react';
import {Accordion, Card, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

import {NoteRest} from '../../apis/index';
import Avatar from '../com/Avatar';
import NoteDiaryState from './NoteDiaryState';
import {noteStatRow} from '../../assets/styles/note.scss';

class NoteDiary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteCfgs: []
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

    render() {
        const {diary} = this.props;
        const {noteCfgs} = this.state;
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
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <span style={diaryDotStyle}></span>{diary.title}
                            </Accordion.Toggle>
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
    }
    .card-body {
        font-size: 12px;
        color: #142765;
    }
}`;

NoteDiary.propTypes = {
    diary: PropTypes.object,
    noteId: PropTypes.string
};

const mapStateToProps = (state) => ({
    diary: state.note.diary,
    noteId: state.note.noteId
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteDiary);

