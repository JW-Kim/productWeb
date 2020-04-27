import React, { Component } from 'react';
import {Modal, Row, Col, Container} from 'react-bootstrap';
import $ from 'jquery';

import ModalHeader from '../com/ModalHeader';
import {myModal, modalBody} from '../../assets/styles/com.scss';
import {noteList} from '../../assets/styles/set.scss';
import {modalSubTitle} from '../../assets/styles/com.scss';
import NoteRest from '../../apis/NoteRest';
import Avatar from '../com/Avatar';
import {confirm} from '../com/ComSvc';
import NoteDtl from '../set/NoteDtl';
import {openPop} from '../com/ModalSvc';

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myNoteList: [],
            shareNoteList: []
        };
    }

    componentDidMount() {
        this.promise = new $.Deferred();
        $('.modal-backdrop').css('z-index', '1050');

        this.getMyNoteList();
        this.getShareNoteList();
    }

    async getMyNoteList() {
        const res = await NoteRest.getMyNoteList();
        this.setState({ myNoteList: res.data.data });
    }

    async getShareNoteList() {
        const res = await NoteRest.getShareNoteList();
        this.setState({ shareNoteList: res.data.data});
    }

    onClose = () => {
        return this.promise.resolve();
    }

    removeMyNote = (noteId) => {
        confirm('삭제하시겠습니까?').then(() => {
            this.deleteMyNote(noteId);
        });
    }

    async deleteMyNote(noteId) {
        await NoteRest.deleteMyNote(noteId);
        this.getMyNoteList();
    }

    removeShareNote = (noteId) => {
        confirm('삭제하시겠습니까?').then(() => {
            this.deleteShareNote(noteId);
        });
    }

    async deleteShareNote(noteId) {
        await NoteRest.deleteShareNote(noteId);
        this.getShareNoteList();
    }

    onOpenNoteDtl = (type, noteId) => {
        openPop(<NoteDtl type={type} noteId={noteId} close={() => this.onCloseNoteDtl()} />).then(() => {
            this.setState({ myNoteList: [] });
            this.getMyNoteList();
        });
    }

    onCloseNoteDtl = () => {

    }

    renderMyNoteList = () => {
        const {myNoteList} = this.state;

        if(myNoteList.length === 0) {
            return (
                <div style={{'color': '#E6ECF0'}}>
                    <Row><Col style={{textAlign: 'center'}}><span className="material-icons">person_add</span></Col></Row>
                    <Row><Col style={{textAlign: 'center'}}>등록된 일기장이 없습니다. 일기장을 등록하세요</Col></Row>
                </div>
            );
        }

        const items = myNoteList.map((item) => (
            <Row style={{height: '60px', lineHeight: '60px', padding: '0px 10px 0px 10px', borderBottom: '1px solid #C2D8E9'}}>
                <Col xs={3}><Avatar fileId={item.fileId} style={{width: '30px', height: '30px', marginRight: '10px', lineHeight: '60px'}} shape="roundedCircle"/></Col>
                <Col xs={7} onClick={() => this.onOpenNoteDtl('UPDATE', item.noteId)}>{item.noteNm}</Col>
                <Col xs={2}><span className="material-icons" style={{color: '#d32f2f', fontSize: '20px'}} onClick={() => this.removeMyNote(item.noteId)}>remove_circle_outline</span></Col>
            </Row>
        ));

        return <div>{items}</div>;
    };

    renderShareNoteList = () => {
        const {shareNoteList} = this.state;

        if(shareNoteList.length === 0) {
            return (
                <div style={{'color': '#E6ECF0'}}>
                    <Row><Col style={{textAlign: 'center'}}><span className="material-icons">person_add</span></Col></Row>
                    <Row><Col style={{textAlign: 'center'}}>등록된 일기장이 없습니다.</Col></Row>
                </div>
            );
        }

        const items = shareNoteList.map((item) => (
            <Row style={{height: '60px', lineHeight: '60px', padding: '0px 10px 0px 10px', borderBottom: '1px solid #C2D8E9'}}>
                <Col xs={3}><Avatar fileId={item.fileId} style={{width: '30px', height: '30px', marginRight: '10px', lineHeight: '60px'}} shape="roundedCircle"/></Col>
                <Col xs={7}>{item.noteNm}</Col>
                <Col xs={2}><span className="material-icons" style={{color: '#d32f2f', fontSize: '20px'}} onClick={() => this.removeShareNote(item.noteId)}>remove_circle_outline</span></Col>
            </Row>
        ));

        return <div>{items}</div>;
    };

    render() {
        return (
            <div>
                <Modal show={true} dialogClassName={myModal}>
                    <ModalHeader title="일기장" type="LEFT" close={() => this.onClose()} />
                    <Modal.Body>
                        <div className={modalBody}>
                            <Container style={{padding: '5px', height: '100%'}}>
                                <div className={noteList}>
                                    <Row>
                                        <Col xs={10} className={modalSubTitle}>내 소유 일기장</Col>
                                        <Col xs={2} onClick={() => this.onOpenNoteDtl('CREATE')}>
                                            <span className="material-icons" style={{'color': '#4caf50', 'fontSize': '20px'}}>add_circle</span>
                                        </Col>
                                    </Row>
                                    {this.renderMyNoteList()}
                                </div>
                                <div className={noteList}>
                                    <Row>
                                        <Col xs={10} className={modalSubTitle}>공유 일기장</Col>
                                        <Col xs={2} />
                                    </Row>
                                    {this.renderShareNoteList()}
                                </div>
                            </Container>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Note;
