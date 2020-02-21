import React, {Component} from 'react';
import {Accordion, Card, Row, Col, Dropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

import {noteStatRow} from '../../assets/styles/note.scss';
import {openPop} from '../com/ModalSvc';
import NoteDiseaseDtl from './NoteDiseaseDtl';
import {note as noteActions} from '../../redux/actions/index';
import DiaryRest from '../../apis/DiaryRest';

class NoteDisease extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openYn: false
        };
    }

    toggle = () => {
        const {openYn} = this.state;

        this.setState({openYn: !openYn});
    }

    updateDisease = (diseaseId) => {
        const {noteId, diaryDt, diaryMonth, setDiaryMonth, setDiaryDt, setDisease, setDiary} = this.props;
        openPop(<NoteDiseaseDtl type="UPDATE" noteId={noteId} diseaseDt={diaryDt} diseaseId={diseaseId}/>).then(() => {
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

    deleteDisease = (diseaseId) => {
        this.callDeleteDisease(diseaseId);
    }

    async callDeleteDisease(diseaseId) {
        const {diaryMonth, setDiaryMonth, setDiaryDt, setDisease, setDiary} = this.props;
        await DiaryRest.deleteDisease(diseaseId);
        const month = diaryMonth;
        setDiaryMonth(null);
        setDiaryMonth(month);
        setDiaryDt(null);
        setDisease(null);
        setDiary(null);
        this.setState({openYn: false});
    }

    renderDiseaseRow = () => {
        const {disease} = this.props;
        const {openYn} = this.state;
        if(_.isNil(disease) || disease.length === 0) return null;
        const diseaseDotStyle = {
            height: '5px',
            width: '5px',
            backgroundColor: '#E6ECF0',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '5px'
        };
        const items = disease.map(item => (
            <div key={item.diseaseId}>
                <div>
                <Accordion.Toggle as={Card.Header} eventKey={item.diseaseId} onClick={() => this.toggle()}>
                    <span style={diseaseDotStyle}></span>{item.diseaseNm}
                </Accordion.Toggle>
                    {openYn && (
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                <span className="material-icons">more_horiz</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item key={1} onClick={() => this.updateDisease(item.diseaseId)}>수정</Dropdown.Item>
                                <Dropdown.Item key={2} onClick={() => this.deleteDisease(item.diseaseId)}>삭제</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>)
                    }
                </div>
                <Accordion.Collapse eventKey={item.diseaseId}>
                    <Card.Body>
                        <Row className={noteStatRow}>
                            <Col xs={4}>증상</Col>
                            <Col xs={8}>{item.symptom}</Col>
                        </Row>
                        {!_.isNil(item.hospitalNm) && item.hospitalNm !== '' &&
                        <Row className={noteStatRow}>
                            <Col xs={4}>병원명</Col>
                            <Col xs={8}>{item.hospitalNm}</Col>
                        </Row>
                        }
                        {!_.isNil(item.prescription) && item.prescription !== '' &&
                        <Row className={noteStatRow}>
                            <Col xs={4}>처방</Col>
                            <Col xs={8}>{item.prescription}</Col>
                        </Row>
                        }
                    </Card.Body>
                </Accordion.Collapse>
            </div>
        ));

        return <Card>{items}</Card>;
    }

    render() {
        return (
            <WrapperStyled>
                {this.renderDiseaseRow()}
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

NoteDisease.propTypes = {
    disease: PropTypes.array,
    noteId: PropTypes.string,
    diaryDt: PropTypes.string,
    diaryMonth: PropTypes.string,
    setDiaryMonth: PropTypes.func,
    setDiaryDt: PropTypes.func,
    setDisease: PropTypes.func,
    setDiary: PropTypes.func
};

const mapStateToProps = (state) => ({
    disease: state.note.disease,
    noteId: state.note.noteId,
    diaryDt: state.note.diaryDt,
    diaryMonth: state.note.diaryMonth
});

const mapDispatchToProps = {
    setDiaryMonth: noteActions.setDiaryMonth,
    setDiaryDt: noteActions.setDiaryDt,
    setDisease: noteActions.setDisease,
    setDiary: noteActions.setDiary
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteDisease);

