import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, Accordion} from 'react-bootstrap';
import _ from 'lodash';
import styled from 'styled-components';

import {NoteRest} from '../../apis/index';
import NoteDtlCfgBtnGroup from './NoteDtlCfgBtnGroup';

class NoteDtlCfg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteCfgList: []
        };
    }

    componentDidMount() {
        this.getNoteCfg();
    }

    componentWillReceiveProps(nextProps) {
        const {openYn} = this.props;

        if(!openYn && nextProps.openYn) {
            this.setState({
                noteCfgList: []
            }, () => {this.getNoteCfg();});
        }
    }

    async getNoteCfg() {
        const {type, noteId, setNoteCfgList} = this.props;

        let tempNoteId = '';

        if(type === 'UPDATE') {
            tempNoteId = noteId;
        }

        const res = await NoteRest.getNoteCfg({noteId: tempNoteId});
        this.setState({noteCfgList: res.data.data});
        setNoteCfgList(res.data.data, false);
    }

    setNoteCfgStatCd = (index, noteCfgStatCd) => {
        const {setNoteCfgList} = this.props;
        const {noteCfgList} = this.state;

        const tmpNoteCfgList = _.clone(noteCfgList);
        tmpNoteCfgList[index].noteCfgStatCd = noteCfgStatCd;

        this.setState({noteCfgList: tmpNoteCfgList});
        setNoteCfgList(tmpNoteCfgList, true);
        console.log(noteCfgList);
    }

    renderNoteDtlCfgBtnGroup = () => {
        const {noteCfgList} = this.state;
        if(_.isNil(noteCfgList) || noteCfgList.length === 0) return null;

        const items = noteCfgList.map((item, index) => (
            <NoteDtlCfgBtnGroup
                title={item.noteCfgCdVal}
                noteCfgStatCd={item.noteCfgStatCd}
                setNoteCfgStatCd={(noteCfgStatCd) => {this.setNoteCfgStatCd(index, noteCfgStatCd);}}
            />
        ));

        return <div>{items}</div>;
    }

    render() {
        return (
            <WrapperStyled>
            <div>
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            노트 설정<span className="material-icons">expand_more</span>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {this.renderNoteDtlCfgBtnGroup()}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    .card {
        border: 0px;
    }
    .card-header {
        padding: .75rem 10px;
        background-color: #fff;
        border: 0px;
        font-size: 18px;
        
        span {
            float: right;
        }
    }
    .card-body > div {
        margin-left: 10px;
        margin-right: 10px;
        font-size: 14px;
    }
    .btn-group {
        width: 100%;
    }
}`;

NoteDtlCfg.propTypes = {
    setNoteCfgList: PropTypes.func,
    type: PropTypes.string,
    noteId: PropTypes.string,
    openYn: PropTypes.bool
};

export default NoteDtlCfg;

