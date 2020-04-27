import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Col, Row} from 'react-bootstrap';
import _ from 'lodash';

import {NoteRest} from '../../apis/index';
import {noteInfo} from '../../assets/styles/set.scss';
import {modalSubTitle} from '../../assets/styles/com.scss';
import Avatar from '../com/Avatar';
import {confirm, toast} from '../com/ComSvc';
import {openPop} from '../com/ModalSvc';
import SearchUser from '../user/SearchUser';

class NoteDtlShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareUserList: []
        };
        this.setShareUser = this.setShareUser.bind(this);
        this.deleteShareUser = this.deleteShareUser.bind(this);
    }

    componentDidMount() {
        this.getShareUserList();
    }

    async getShareUserList() {
        const {type, noteId} = this.props;
        if(type === 'UPDATE') {
            const res = await NoteRest.getNoteShareUserList(noteId);
            this.setState({shareUserList: res.data.data});
        }
    }

    onOpenSearchUser = () => {
        openPop(<SearchUser setShareUser={(userId, userNm, fileId) => this.setShareUser(userId, userNm, fileId)}/>).then(() => {

        });
    };

    async setShareUser(userId, userNm, fileId) {
        const {type, setShareUserList, noteId} = this.props;
        const {shareUserList} = this.state;

        const shareUser = _.find(shareUserList, {userId});
        if(!_.isNil(shareUser)) {
            toast('이미 공유 되었습니다');
            return;
        }

        if(type === 'UPDATE') {
            const res = await NoteRest.insertNoteShareUser(noteId, {userId});
            if (res.status === 200) {
                toast('공유 되었습니다.');

                const tmpShareUserList = _.clone(shareUserList);
                tmpShareUserList.push({userId, userNm, fileId});
                this.setState({shareUserList: tmpShareUserList});
                setShareUserList(tmpShareUserList);
            }else {
                toast('공유를 실패하였습니다.');
            }
        } else {
            const tmpShareUserList = _.clone(shareUserList);
            tmpShareUserList.push({userId, userNm, fileId});
            this.setState({shareUserList: tmpShareUserList});
            setShareUserList(tmpShareUserList);
        }
    }

    deleteShareUser(userId) {
        const {type, setShareUserList, noteId} = this.props;
        const {shareUserList} = this.state;

        confirm('공유한 사람을 삭제하시겠습니까?').then(() => {
            if (type === 'UPDATE') {
                NoteRest.deleteNoteShareUser(noteId, userId).then(res => {
                    if (res.status === 200) {
                        toast('삭제되었습니다.');

                        const tmpShareUserList = _.reject(shareUserList, {userId});
                        this.setState({shareUserList: tmpShareUserList});
                        setShareUserList(tmpShareUserList);
                    }else {
                        toast('삭제를 실패하였습니다.');
                    }
                });
            } else {
                const tmpShareUserList = _.reject(shareUserList, {userId});

                this.setState({shareUserList: tmpShareUserList});
                setShareUserList(tmpShareUserList);
            }
        }, () => {

        });
    }

    renderList = () => {
        const {shareUserList} = this.state;

        if(shareUserList.length === 0) {
            return (
                <div style={{'color': '#E6ECF0'}} onClick={() => this.onOpenSearchUser()}>
                    <Row><Col style={{textAlign: 'center'}}><span className="material-icons">person_add</span></Col></Row>
                    <Row><Col style={{textAlign: 'center'}}>일기장을 공유할 사람을 등록하세요.</Col></Row>
                </div>
            );
        }

        const items = shareUserList.map((item) => (
            <Row style={{height: '60px', lineHeight: '60px', padding: '0px 10px 0px 10px', borderBottom: '1px solid #C2D8E9'}}>
                <Col xs={3}><Avatar fileId={item.fileId} style={{width: '30px', height: '30px', marginRight: '10px', lineHeight: '60px'}} shape="roundedCircle"/></Col>
                <Col xs={7}>{item.userNm}</Col>
                <Col xs={2} onClick={() => this.deleteShareUser(item.userId)}><span className="material-icons" style={{color: '#d32f2f', fontSize: '20px'}}>remove_circle_outline</span></Col>
            </Row>
        ));

        return <div>{items}</div>;
    };

    render() {
        return (
            <WrapperStyled>
            <div className={noteInfo}>
                <Row>
                    <Col xs={10} className={modalSubTitle}>공유한 사람</Col>
                    <Col xs={2}><span className="material-icons" style={{'color': '#4caf50', 'fontSize': '20px'}} onClick={() => this.onOpenSearchUser()}>add_circle</span></Col>
                </Row>
                {this.renderList()}
            </div>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
}`;

NoteDtlShare.propTypes = {
    type: PropTypes.string,
    noteId: PropTypes.string,
    setShareUserList: PropTypes.func
};

export default NoteDtlShare;
