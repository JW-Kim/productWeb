import React, { Component } from 'react';
import {Modal, Container, Row, Col} from 'react-bootstrap';
import $ from 'jquery';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {myModal, modalBody} from '../../assets/styles/com.scss';
import { inputRow, inputRowTitle} from '../../assets/styles/com.scss';
import ModalHeader from '../com/ModalHeader';
import Edit from '../com/Edit';
import TextareaEdit from '../com/TextareaEdit';
import {DiaryRest} from '../../apis/index';
import {getDt} from '../com/ComSvc';

class NoteDiseaseDtl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diseaseNm: '',
            hospitalNm: '',
            symptom: '',
            prescription: ''
        };
    }

    componentDidMount() {
        const {type} = this.props;
        this.promise = new $.Deferred();
        $('.modal-backdrop').css('z-index', '1050');

        if (type === 'UPDATE') {
            this.getDisease();
        }
    }

    async getDisease() {
        const {diseaseId} = this.props;
        const res = await DiaryRest.getDisease(diseaseId);
        const disease = res.data.data;

        this.setState({
            diseaseNm: _.isNil(disease.diseaseNm) ? '' : disease.diseaseNm,
            hospitalNm: _.isNil(disease.hospitalNm) ? '' : disease.hospitalNm,
            symptom: _.isNil(disease.symptom) ? '' : disease.symptom,
            prescription: _.isNil(disease.prescription) ? '' : disease.prescription,
        });
    }

    onCancel = () => {
        return this.promise.reject();
    }

    onSave = () => {
        const {type} = this.props;

        if (type === 'CREATE') {
            this.insertDisease();
        } else {
            this.updateDisease();
        }

        return this.promise.resolve();
    }

    async insertDisease() {
        const {noteId, diseaseDt} = this.props;
        const {diseaseNm, symptom, hospitalNm, prescription} = this.state;
        await DiaryRest.insertDisease({
            noteId: noteId,
            diseaseDt: getDt(diseaseDt),
            diseaseNm: _.isNil(diseaseNm) ? '' : diseaseNm,
            symptom: _.isNil(symptom) ? '' : symptom,
            hospitalNm: _.isNil(hospitalNm) ? '' : hospitalNm,
            prescription: _.isNil(prescription) ? '' : prescription,
        });
    }

    async updateDisease() {
        const {noteId, diseaseDt, diseaseId} = this.props;
        const {diseaseNm, symptom, hospitalNm, prescription} = this.state;
        await DiaryRest.updateDisease(diseaseId, {
            noteId: noteId,
            diseaseDt: getDt(diseaseDt),
            diseaseNm: _.isNil(diseaseNm) ? '' : diseaseNm,
            symptom: _.isNil(symptom) ? '' : symptom,
            hospitalNm: _.isNil(hospitalNm) ? '' : hospitalNm,
            prescription: _.isNil(prescription) ? '' : prescription,
        });
    }

    render() {
        const {
            diseaseNm,
            hospitalNm,
            symptom,
            prescription
        } = this.state;

        return (
            <Modal show={true} dialogClassName={myModal}>
                <ModalHeader title="질병 작성" type="BOTH" close={() => this.onCancel()} save={() => this.onSave()}/>
                <Modal.Body>
                    <div className={modalBody}>
                        <Container style={{padding: '5px'}}>
                            <Row className={inputRow}>
                                <Col className={inputRowTitle} xs={4}>병명</Col>
                                <Col xs={8}>
                                    <Edit
                                        type="text"
                                        textVal={diseaseNm}
                                        placeholder="한글/영문/숫자 12자"
                                        warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                                        onChangeEdit={(text) => this.setState({diseaseNm: text})}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 12 }}
                                    />
                                </Col>
                            </Row>
                            <Row className={inputRow}>
                                <Col className={inputRowTitle} xs={4}>증상</Col>
                                <Col xs={8}>
                                    <TextareaEdit
                                        textVal={symptom}
                                        warningText="한글, 영문자, 숫자 50자이하만 가능합니다."
                                        onChangeText={(text) => this.setState({symptom: text})}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 50 }}
                                    />
                                </Col>
                            </Row>
                            <Row className={inputRow}>
                                <Col className={inputRowTitle} xs={4}>병원명</Col>
                                <Col xs={8}>
                                    <Edit
                                        type="text"
                                        textVal={hospitalNm}
                                        placeholder="한글/영문/숫자 12자"
                                        warningText="한글, 영문자, 숫자 12자이하만 가능합니다."
                                        onChangeEdit={(text) => this.setState({hospitalNm: text})}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 12 }}
                                    />
                                </Col>
                            </Row>
                            <Row className={inputRow}>
                                <Col className={inputRowTitle} xs={4}>처방</Col>
                                <Col xs={8}>
                                    <TextareaEdit
                                        textVal={prescription}
                                        warningText="한글, 영문자, 숫자 50자이하만 가능합니다."
                                        onChangeText={(text) => this.setState({prescription: text})}
                                        regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                        allowRange={{ special: false, max: 50 }}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}


NoteDiseaseDtl.propTypes = {
    type: PropTypes.string,
    noteId: PropTypes.string,
    diseaseDt: PropTypes.string,
    diseaseId: PropTypes.string
};

export default NoteDiseaseDtl;
