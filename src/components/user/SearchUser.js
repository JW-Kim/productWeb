import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Modal} from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

import {modalHeader} from '../../assets/styles/set.scss';
import {myModal} from '../../assets/styles/com.scss';
import {searchUserRow, searchUserListRow} from '../../assets/styles/user.scss';
import Edit from '../com/Edit';
import {UserRest} from '../../apis/index';
import Avatar from '../com/Avatar';
import {dialog as DialogActions} from '../../redux/actions/index';

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchVal: '',
            userList: []
        };

        this.onChangeSearchVal = this.onChangeSearchVal.bind(this);
    }

    componentWillMount() {
    }

    onClose = () => {
        const {close} = this.props;
        this.setState({searchVal: '', userList: []});
        close();
    }

    async onChangeSearchVal(text) {
        if(text === '') {
            const userList = [];
            this.setState({searchVal: text, userList});
            return;
        }
        const res = await UserRest.selectUserList({searchVal: text});
        this.setState({userList: res.data.data});
    }

    selectedUser = (userId, userNm, fileId) => {
        const {setShareUser} = this.props;

        setShareUser(userId, userNm, fileId);
        this.onClose();
    }

    renderUserList = () => {
        const {userList} = this.state;

        if(userList.length === 0) {
            return (
                <div />
            );
        }

        const items = userList.map((item, index) => (
            <Row key={index} style={{height: '60px', lineHeight: '60px', padding: '0px 10px 0px 10px', borderBottom: '1px solid #C2D8E9'}} onClick={() => this.selectedUser(item.userId, item.userNm, item.fileId)}>
                <Col xs={3}><Avatar fileId={item.fileId} style={{width: '30px', height: '30px', marginRight: '10px', lineHeight: '60px'}} shape="roundedCircle"/></Col>
                <Col xs={9}>{item.userNm}</Col>
            </Row>
        ));

        return <div className={searchUserListRow}>{items}</div>;
    }

    render() {
        const {openYn} = this.props;
        const {searchVal} = this.state;
        return (
            <WrapperStyled>
                <Modal show={openYn} dialogClassName={myModal}>
                    <Modal.Body>
                        <Row className={modalHeader}>
                            <Col xs={12} className={searchUserRow}>
                                <span className="material-icons" onClick={() => this.onClose()}>arrow_back</span>
                                <span className="material-icons">search</span>
                                <Edit
                                    type="text"
                                    textVal={searchVal}
                                    placeholder="검색어를 입력하세요."
                                    onChangeEdit={(text, isText) => this.onChangeSearchVal(text, isText)}
                                    regExp={/[ㄱ-ㅎ가-힣A-Za-z0-9]/g}
                                    allowRange={{ special: false}}
                                />
                            </Col>
                        </Row>
                        {this.renderUserList()}
                    </Modal.Body>
                </Modal>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
}`;


SearchUser.propTypes = {
    openYn: PropTypes.bool,
    close: PropTypes.func,
    setShareUser: PropTypes.func,
    setToast: PropTypes.func
};

const mapDispatchToProps = {
    setToast: DialogActions.setToast
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(SearchUser));

