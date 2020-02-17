import React, { Component } from 'react';
import {Modal, Row, Col, Container} from 'react-bootstrap';
import $ from 'jquery';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {myModal, modalBody} from '../../assets/styles/com.scss';
import { inputRow, inputRowTitle} from '../../assets/styles/com.scss';
import ModalHeader from '../com/ModalHeader';
import Edit from '../com/Edit';
import NoteDiaryDtlHeight from './NoteDiaryDtlHeight';
import NoteDiaryDtlWeight from './NoteDiaryDtlWeight';
import NoteDiaryDtlShit from './NoteDiaryDtlShit';
import NoteDiaryDtlSleep from './NoteDiaryDtlSleep';
import NoteDiaryDtlState from './NoteDiaryDtlState';
import {DiaryRest} from '../../apis/index';
import {getTodayDt, getDt} from '../com/ComSvc';

class NoteDiaryDtl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            height: 0,
            weight: 0,
            shitCnt: '0',
            shitDesc: '',
            shitCd: null,
            sleepStartTime: '',
            sleepEndTime: '',
            feelingCd: '',
            healthCd: '',
            feverCd: '',
            breakfastCd: '',
            lunchCd: '',
            dinnerCd: '',
            isHeight: false,
            isWeight: false
        };
    }

    componentDidMount() {
        this.promise = new $.Deferred();
        $('.modal-backdrop').css('z-index', '1050');
    }

    onCancel = () => {
        return this.promise.reject();
    }

    onSave = () => {
        const {type} = this.props;

        if (type === 'CREATE') {
            this.insertDiary();
        }

        return this.promise.resolve();
    }

    async insertDiary() {
        const {noteId, diaryDt} = this.props;
        const {
            feelingCd,
            healthCd,
            feverCd,
            breakfastCd,
            lunchCd,
            dinnerCd,
            shitCd,
            shitCnt,
            shitDesc,
            sleepStartTime,
            sleepEndTime,
            title,
            content,
            fileId,
            height,
            weight
        } = this.state;

        await DiaryRest.createDiary({
            feelingCd: feelingCd === null ? '' : feelingCd,
            healthCd: healthCd === null ? '' : healthCd,
            feverCd: feverCd === null ? '' : feverCd,
            breakfastCd: breakfastCd === null ? '' : breakfastCd,
            lunchCd: lunchCd === null ? '' : lunchCd,
            dinnerCd: dinnerCd === null ? '' : dinnerCd,
            shitCd: shitCd === null ? '' : shitCd,
            shitCnt: shitCnt === null ? 0 : shitCnt,
            shitDesc: shitDesc === null ? '' : shitDesc,
            sleepStartTime: sleepStartTime === null ? '' : sleepStartTime,
            sleepEndTime: sleepEndTime === null ? '' : sleepEndTime,
            title: _.isNil(title) || title === '' ? getTodayDt() : title,
            content: content === null ? '' : content,
            fileId,
            noteId,
            diaryDt: getDt(diaryDt),
            height: height === null ? 0 : height,
            weight: weight === null ? 0 : weight
        });
    }

    onChangeTitle = (title) => {
        this.setState({title});
    }

    onChangeHeight = (height, isHeight) => {
        this.setState({height, isHeight});
    }

    onChangeWeight = (weight, isWeight) => {
        this.setState({weight, isWeight});
    }

    onChangeShitCnt = (shitCnt) => {
        this.setState({shitCnt});
    }

    onChangeShitDesc = (shitDesc) => {
        this.setState({shitDesc});
    }

    onChangeShitCd = (shitCd) => {
        this.setState({shitCd});
    }

    onChangeSleepStartTime = (sleepStartTime) => {
        this.setState({sleepStartTime});
    }

    onChnageSleepEndTime = (sleepEndTime) => {
        this.setState({sleepEndTime});
    }

    render() {
        const {
            title,
            shitCnt,
            shitCd,
            shitDesc,
            sleepStartTime,
            sleepEndTime,
            feelingCd,
            healthCd,
            feverCd,
            breakfastCd,
            lunchCd,
            dinnerCd
        } = this.state;

        return (
            <Modal show={true} dialogClassName={myModal}>
                <ModalHeader title="일기 작성" type="BOTH" close={() => this.onCancel()} save={() => this.onSave()}/>
                <Modal.Body>
                    <div className={modalBody}>
                        <Container style={{padding: '5px'}}>
                            <Row className={inputRow}>
                                <Col className={inputRowTitle} xs={4}>제목</Col>
                                <Col xs={8}>
                                    <Edit
                                        type="text"
                                        textVal={title}
                                        placeholder="한글/영문/숫자 12자"
                                        warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                                        onChangeEdit={(text) => this.onChangeTitle(text)}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 12 }}
                                    />
                                </Col>
                            </Row>
                            <NoteDiaryDtlHeight changeHeight={(height, isHeight) => this.onChangeHeight(height, isHeight)}/>
                            <NoteDiaryDtlWeight changeWeight={(weight, isWeight) => this.onChangeWeight(weight, isWeight)}/>
                            <NoteDiaryDtlState title="기분" code={feelingCd} setCode={(code) => this.setState({feelingCd: code})}/>
                            <NoteDiaryDtlState title="건강" code={healthCd} setCode={(code) => this.setState({healthCd: code})}/>
                            <NoteDiaryDtlState title="열" code={feverCd} setCode={(code) => this.setState({feverCd: code})}/>
                            <NoteDiaryDtlState title="아침식사" code={breakfastCd} setCode={(code) => this.setState({breakfastCd: code})}/>
                            <NoteDiaryDtlState title="점심식사" code={lunchCd} setCode={(code) => this.setState({lunchCd: code})}/>
                            <NoteDiaryDtlState title="저녁식사" code={dinnerCd} setCode={(code) => this.setState({dinnerCd: code})}/>
                            <NoteDiaryDtlShit
                                shitCd={shitCd}
                                shitCnt={shitCnt}
                                shitDesc={shitDesc}
                                changeShitCnt={(cnt) => this.onChangeShitCnt(cnt)}
                                changeShitDesc={(desc) => this.onChangeShitDesc(desc)}
                                changeShitCd={(cd) => this.onChangeShitCd(cd)}
                            />
                            <NoteDiaryDtlSleep
                                sleepStartTime={sleepStartTime}
                                sleepEndTime={sleepEndTime}
                                changeSleepStartTime={(time) => this.onChangeSleepStartTime(time)}
                                changeSleepEndTime={(time) => this.onChnageSleepEndTime(time)}
                            />
                        </Container>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}


NoteDiaryDtl.propTypes = {
    type: PropTypes.string,
    noteId: PropTypes.string,
    diaryDt: PropTypes.string
};

export default NoteDiaryDtl;
