import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Modal, Col, Row, Button} from 'react-bootstrap';
import {withRouter} from 'react-router';

import ModalHeader from '../com/ModalHeader';
import {myModal, btn, modalBody} from '../../assets/styles/com.scss';

import {dialog as DialogActions} from '../../redux/actions/index';
import NoteDtlCfg from './NoteDtlCfg';
import {NoteRest} from '../../apis/index';
import NoteDtlInfo from './NoteDtlInfo';
import NoteDtlShare from './NoteDtlShare';

class NoteDtl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteNm: '',
            isNoteNm: false,
            sex: 'M',
            birthDt: null,
            shareList: [],
            noteCfgList: [],
            fileId: null,
            avatarSource: null,
            isSex: false,
            isBirthDt: false,
            isProfile: false,
            isNoteCfgList: false
        };
    }

    async componentWillMount() {
        this.getNote();
    }

    componentWillReceiveProps(nextProps) {
        const {openYn} = this.props;

        if(!openYn && nextProps.openYn) {
            this.setState({
                noteNm: '',
                isNoteNm: false,
                sex: 'M',
                birthDt: null,
                shareList: [],
                noteCfgList: [],
                fileId: null,
                avatarSource: null,
                isSex: false,
                isBirthDt: false,
                isProfile: false,
                isNoteCfgList: false
            }, () => {this.getNote();});
        }
    }

    async getNote() {
        const {noteId, type} = this.state;
        if (type === 'UPDATE') {
            const res = await NoteRest.getNote(noteId);
            const note = res.data.data;
            this.setState({
                noteNm: note.noteNm,
                sex: note.sex,
                birthDt: note.birthDt,
                fileId: note.fileId,
                isNoteNm: true,
                isSex: true,
                isBirthDt: true,
                isProfile: true
            });
        }
    }

    onClose = () => {
        const {close} = this.props;
        close();
    }

    checkBtnStyle() {
        const {type} = this.props;
        const {isNoteNm, isBirthDt} = this.state;

        if (type === 'CREATE') {
            if (isNoteNm && isBirthDt) {
                this.setState({btnStyle: {backgroundColor: '#142765', height: 60}});
            } else {
                this.setState({btnStyle: {backgroundColor: '#C2D8E9', height: 60}});
            }
        } else {
            if (isNoteNm) {
                this.setState({btnStyle: {backgroundColor: '#142765', height: 60}});
            } else {
                this.setState({btnStyle: {backgroundColor: '#C2D8E9', height: 60}});
            }
        }
    }

    onChangeNoteNm = (noteNm, isNoteNm) => {
        console.log('onChangeNoteNm', noteNm, isNoteNm);
        this.setState({noteNm, isNoteNm}, () => {
            this.checkBtnStyle();
        });
    }

    onChangeSex = (sex, isSex) => {
        console.log('onChangeSex', sex, isSex);
        this.setState({sex, isSex}, () => {
            this.checkBtnStyle();
        });
    }

    onBirthDt = (birthDt, isBirthDt) => {
        const dt = new Date(birthDt);
        const year = dt.getFullYear();
        let month = dt.getMonth();
        let day = dt.getDate();
        month = `${month + 1}`;
        day = `${day + 0}`;

        if(month.length === 1) {
            month = `0${month}`;
        }
        if(day.length === 1) {
            day = `0${day}`;
        }

        console.log('onBirthDt', birthDt, isBirthDt, `${year}-${month}-${day}` );

        this.setState({birthDt: `${year}-${month}-${day}`, isBirthDt}, () => {
            this.checkBtnStyle();
        });
    }

    onSave = () => {
        const { type } = this.props;
        console.log('onSave', type);
        if (type === 'CREATE') {
            this.insertNote();
        } else {
            this.updateNote();
        }
    }

    async insertNote() {
        const {setToast} = this.props;
        const {shareList, fileId, isNoteNm, isBirthDt, noteCfgList, noteNm, sex, birthDt} = this.state;
        console.log('insertNote', shareList, fileId, isNoteNm, isBirthDt, noteCfgList, noteNm, sex, birthDt);
        if(!isNoteNm || !isBirthDt) {
            setToast({toastYn: true, toastMsg: '노트명과 출생일을 입력해주세요.'});
            return;
        }

        const res = await NoteRest.insertNote({noteNm, sex, birthDt, shareList, fileId, noteCfgList});
        if (res.status === 200) {
            setToast({toastYn: true, toastMsg: '저장되었습니다.'});
        }else {
            setToast({toastYn: true, toastMsg: '등록을 실패하였습니다.'});
        }
    }

    async updateNote() {
        const {setToast, noteId} = this.props;
        const {fileId, isNoteNm, isSex, isProfile, isBirthDt, noteCfgList, noteNm, sex, birthDt} = this.state;

        if(!(isNoteNm || isBirthDt || isSex || isProfile)) {
            setToast({toastYn: true, toastMsg: '노트명과 출생일을 입력해주세요.'});
            return;
        }

        const res = await NoteRest.updateNote(noteId, {noteNm, sex, birthDt, fileId, noteCfgList});
        if (res.status === 200) {
            setToast({toastYn: true, toastMsg: '저장되었습니다.'});
        }else {
            setToast({toastYn: true, toastMsg: '수정을 실패하였습니다.'});
        }
    }

    render() {
        const {openYn, type, noteId} = this.props;
        const {noteNm, sex, btnStyle} = this.state;

        return (
            <div>
                <Modal show={openYn} dialogClassName={myModal}>
                    <Modal.Body>
                        <ModalHeader title="노트 작성" type="LEFT" close={() => this.onClose()}/>
                        <div className={modalBody}>
                            <NoteDtlInfo
                                openYn={openYn}
                                textVal={noteNm}
                                sex={sex}
                                setNoteNm={(name, isNoteNm) => this.onChangeNoteNm(name, isNoteNm)}
                                setSex={(val, isSex) => this.onChangeSex(val, isSex)}
                                setBirthDt={(birthDt, isBirthDt) => this.onBirthDt(birthDt, isBirthDt)}
                            />
                            <NoteDtlCfg
                                openYn={openYn}
                                type={type}
                                noteId={noteId}
                                setNoteCfgList={(noteCfgList, isNoteCfgList) => this.setState({noteCfgList, isNoteCfgList})}/>
                            <NoteDtlShare
                                openYn={openYn}
                                noteId={noteId}
                                type={type}
                                setShareUserList={(shareList, isShareList) => this.setState({shareList, isShareList})}
                            />
                            <Row><Col> <Col><Button className={btn} style={btnStyle} onClick={() => this.onSave()}>저장</Button></Col></Col></Row>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

NoteDtl.propTypes = {
    openYn: PropTypes.bool,
    close: PropTypes.func,
    type: PropTypes.string,
    setToast: PropTypes.func,
    noteId: PropTypes.string
};

const mapDispatchToProps = {
    setToast: DialogActions.setToast
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(NoteDtl));
