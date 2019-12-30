import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Modal, Row} from 'react-bootstrap';
import {withRouter} from 'react-router';

import ModalHeader from '../com/ModalHeader';
import {myModal} from '../../assets/styles/com.scss';
import {noteInfo} from '../../assets/styles/set.scss';

import {dialog as DialogActions} from '../../redux/actions/index';
import NoteDtlCfg from './NoteDtlCfg';
import {NoteRest} from '../../apis/index';
import NoteDtlInfo from './NoteDtlInfo';

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
        const {isNoteNm} = this.state;

        if (type === 'create') {
            if (isNoteNm) {
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

    render() {
        const {openYn} = this.props;
        const {noteNm, sex} = this.state;

        return (
            <div>
                <Modal show={openYn} dialogClassName={myModal}>
                    <Modal.Body>
                        <ModalHeader title="노트 작성" close={() => this.onClose()}/>
                        <NoteDtlInfo
                            textVal={noteNm}
                            sex={sex}
                            setNoteNm={(name, isNoteNm) => this.onChangeNoteNm(name, isNoteNm)}
                            setSex={(val, isSex) => this.onChangeSex(val, isSex)}
                        />
                        <NoteDtlCfg setNoteCfgList={(noteCfgList, isNoteCfgList) => this.setState({noteCfgList, isNoteCfgList})}/>
                        <div className={noteInfo}>
                            <Row>공유한 사람</Row>
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
    type: PropTypes.bool,
    setToast: PropTypes.func
};

const mapDispatchToProps = {
    setToast: DialogActions.setToast
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(NoteDtl));
