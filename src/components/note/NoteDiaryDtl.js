import React, { Component } from 'react';
import {Modal, Row, Col, Container} from 'react-bootstrap';
import $ from 'jquery';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Resizer from 'react-image-file-resizer';

import {myModal, modalBody, inputRowTitle, inputRow} from '../../assets/styles/com.scss';
import {noteDtlTextAreaRow} from '../../assets/styles/note.scss';
import ModalHeader from '../com/ModalHeader';
import Edit from '../com/Edit';
import NoteDiaryDtlHeight from './NoteDiaryDtlHeight';
import NoteDiaryDtlWeight from './NoteDiaryDtlWeight';
import NoteDiaryDtlShit from './NoteDiaryDtlShit';
import NoteDiaryDtlSleep from './NoteDiaryDtlSleep';
import NoteDiaryDtlState from './NoteDiaryDtlState';
import {DiaryRest, FileRest} from '../../apis/index';
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
            isWeight: false,
            fileId: null,
            fileUri: null
        };
    }

    componentDidMount() {
        const {type} = this.props;
        this.promise = new $.Deferred();
        $('.modal-backdrop').css('z-index', '1050');

        if (type === 'UPDATE') {
            this.getDiary();
        }
    }

    async getDiary() {
        const {diaryId} = this.props;
        const res = await DiaryRest.getDiary(diaryId);
        const diary = res.data.data;

        this.setState({
            title: diary.title,
            content: diary.content,
            fileId: diary.fileId,
            height: diary.height,
            heightInt: (diary.height + '').split('.')[0],
            heightDecimal: (diary.height + '').split('.')[1],
            weight: diary.weight,
            weightInt: (diary.weight + '').split('.')[0],
            weightDecimal: (diary.weight + '').split('.')[1],
            shitCnt: diary.shitCnt,
            shitDesc: diary.shitDesc,
            shitCd: diary.shitCd,
            sleepStartTime: diary.sleepStartTime,
            sleepEndTime: diary.sleepEndTime,
            feelingCd: diary.feelingCd,
            healthCd: diary.healthCd,
            feverCd: diary.feverCd,
            breakfastCd: diary.breakfastCd,
            lunchCd: diary.lunchCd,
            dinnerCd: diary.dinnerCd,
        });
    }

    onCancel = () => {
        return this.promise.reject();
    }

    onSave = () => {
        const {type} = this.props;
        const {fileUri} = this.state;

        if (type === 'CREATE') {
            if(!_.isNil(fileUri)) {
                this.fileUpload();
            } else {
                this.insertDiary();
            }
        } else {
            if(!_.isNil(fileUri)) {
                this.fileUpload();
            } else {
                this.updateDiary();
            }
        }
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

        return this.promise.resolve();
    }

    async updateDiary() {
        const {noteId, diaryDt, diaryId} = this.props;
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

        await DiaryRest.updateDiary(diaryId, {
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

        return this.promise.resolve();
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

    onSelectedFile = (e) => {
        const cur = this;
        const file = e.target.files[0];

        if(file.type.substring(0, 5) !== 'image') {
            e.preventDefault();
            return;
        }

        this.getOrientation(file, function(event) {
            alert(event);

            let rotation = 0;
            if(event === 6) {
                rotation = 90;
            } else if(event === 8) {
                rotation = 270;
            } else if(event === 3) {
                rotation = 180;
            }

            console.log(file);
            Resizer.imageFileResizer(file, 1000, 1000, 'jpeg', 100, rotation,
                uri => {
                    cur.setState({fileUri: uri});
                }, 'base64');
        });
    }

    getOrientation(file, callback) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const view = new DataView(event.target.result);

            if (view.getUint16(0, false) !== 0xFFD8) return callback(-2);

            const length = view.byteLength;
            let offset = 2;

            while (offset < length) {
                const marker = view.getUint16(offset, false);
                offset += 2;

                if (marker === 0xFFE1) {
                    if (view.getUint32(offset += 2, false) !== 0x45786966) {
                        return callback(-1);
                    }
                    const little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    const tags = view.getUint16(offset, little);
                    offset += 2;

                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                        }
                    }
                } else if ((marker & 0xFF00) !== 0xFF00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(-1);
        };

        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    }

    async fileUpload() {
        const cur = this;
        const {type} = this.props;
        const {fileUri} = this.state;

        const block = fileUri.split(';');
        const contentType = block[0].split(':')[1];
        const realDate = block[1].split(',')[1];

        const formData = new FormData();
        formData.append('image', this.b64toBlob(realDate, contentType));

        const res = await FileRest.fileUpload(formData);

        this.setState({fileId: res.data.data.fileId}, () => {
            if(type === 'CREATE') {
                cur.insertDiary();
            } else {
                cur.updateDiary();
            }
        });
    }

    b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    onChangeContent = (e) => {
        this.setState({content: e.target.value});
    }

    render() {
        const {
            title,
            content,
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
            dinnerCd,
            height,
            weight,
            fileUri
        } = this.state;

        return (
            <Modal show={true} dialogClassName={myModal}>
                <ModalHeader title="일기 작성" type="BOTH" close={() => this.onCancel()} save={() => this.onSave()}/>
                <Modal.Body>
                    <div className={modalBody}>
                        <Container style={{padding: '5px'}}>
                            <Row className={inputRow}>
                                <input type="file" name="image" onChange={this.onSelectedFile}/>
                                <img src={fileUri} style={{width: '100%'}}/>
                            </Row>
                            <Row className={inputRow}>
                                <Col className={inputRowTitle} xs={4}>내용</Col>
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
                            <Row className={inputRow}>
                                <Col className={inputRowTitle} xs={4} />
                                <Col xs={8} className={noteDtlTextAreaRow}>
                                    <textarea value={content} onChange={this.onChangeContent} />
                                </Col>
                            </Row>
                            <NoteDiaryDtlHeight height={height} changeHeight={(text, isHeight) => this.onChangeHeight(text, isHeight)}/>
                            <NoteDiaryDtlWeight weight={weight} changeWeight={(text, isWeight) => this.onChangeWeight(text, isWeight)}/>
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
    diaryDt: PropTypes.string,
    diaryId: PropTypes.string
};

export default NoteDiaryDtl;
