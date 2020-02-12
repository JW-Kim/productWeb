import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Col, Row} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

import {NoteRest} from '../../apis/index';
import {noteInfo} from '../../assets/styles/set.scss';
import {modalSubTitle} from '../../assets/styles/com.scss';
import SearchUser from '../user/SearchUser';
import {dialog as DialogActions} from '../../redux/actions/index';
import Avatar from '../com/Avatar';
import {confirm} from '../com/ComSvc';

class NoteDtlShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareUserList: [],
            SearchUserOpenYn: false
        };
        this.setShareUser = this.setShareUser.bind(this);
        this.deleteShareUser = this.deleteShareUser.bind(this);
    }

    componentDidMount() {
        this.getShareUserList();
    }

    componentWillReceiveProps(nextProps) {
        const {openYn} = this.props;

        if(!openYn && nextProps.openYn) {
            this.setState({
                shareUserList: [],
                SearchUserOpenYn: false
            }, () => {this.getShareUserList();});
        }
    }

    async getShareUserList() {
        const {type, noteId} = this.props;
        if(type === 'UPDATE') {
            const res = await NoteRest.getNoteShareUserList(noteId);
            this.setState({shareUserList: res.data.data});
        }
    }

    onClose = () => {
        this.setState({SearchUserOpenYn: false});
    };

    onOpenSearchUser = () => {
        this.setState({SearchUserOpenYn: true});
    };

    async setShareUser(userId, userNm, fileId) {
        const {type, setShareUserList, noteId, setToast} = this.props;
        const {shareUserList} = this.state;

        const shareUser = _.find(shareUserList, {userId});
        if(!_.isNil(shareUser)) {
            setToast({toastYn: true, toastMsg: '이미 공유 되었습니다'});
            return;
        }

        if(type === 'UPDATE') {
            const res = await NoteRest.insertNoteShareUser(noteId, {userId});
            if (res.status === 200) {
                setToast({toastYn: true, toastMsg: '공유 되었습니다.'});
            }else {
                setToast({toastYn: true, toastMsg: '공유를 실패하였습니다.'});
            }
        } else {
            const tmpShareUserList = _.clone(shareUserList);
            tmpShareUserList.push({userId, userNm, fileId});
            this.setState({shareUserList: tmpShareUserList});
            setShareUserList(tmpShareUserList);
        }
    }

    deleteShareUser(userId) {
        const {type, setShareUserList, setToast, noteId} = this.props;
        const {shareUserList} = this.state;

        confirm('공유한 사람을 삭제하시겠습니까?').then(() => {
            if (type === 'UPDATE') {
                NoteRest.deleteNoteShareUser(noteId, userId).then(res => {
                    if (res.status === 200) {
                        setToast({toastYn: true, toastMsg: ' 삭제되었습니다.'});
                    }else {
                        setToast({toastYn: true, toastMsg: '삭제를 실패하였습니다.'});
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
        const {SearchUserOpenYn} = this.state;

        return (
            <WrapperStyled>
            <div className={noteInfo}>
                <Row>
                    <Col xs={10} className={modalSubTitle}>공유한 사람</Col>
                    <Col xs={2}><span className="material-icons" style={{'color': '#4caf50', 'fontSize': '20px'}} onClick={() => this.onOpenSearchUser()}>add_circle</span></Col>
                </Row>
                {this.renderList()}
                <SearchUser openYn={SearchUserOpenYn} setShareUser={(userId, userNm, fileId) => this.setShareUser(userId, userNm, fileId)} close={() => this.onClose()}/>
            </div>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
}`;

NoteDtlShare.propTypes = {
    openYn: PropTypes.bool,
    type: PropTypes.string,
    noteId: PropTypes.string,
    setShareUserList: PropTypes.func,
    setToast: PropTypes.func
};

const mapDispatchToProps = {
    setToast: DialogActions.setToast
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(NoteDtlShare));
