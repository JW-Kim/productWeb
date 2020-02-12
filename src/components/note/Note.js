import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Accordion, Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import _ from 'lodash';

import {NoteRest} from '../../apis/index';
import {note as noteActions} from '../../redux/actions/index';
import NoteList from './NoteList';
import NoteCalendar from './NoteCalendar';
import NoteDiary from './NoteDiary';
import NoteDisease from './NoteDisease';
import NoteDtl from '../set/NoteDtl';
import NoteEventBtn from './NoteEventBtn';
import {noteEmpty, noteEmptyIcon} from '../../assets/styles/note.scss';

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNoteEmpty: true,
            noteDiv: {
                overflowY: 'scroll',
                noteDtlYn: false,
                displayYn: false
            }
        };
    }

    async componentWillMount() {
        const {setNotes} = this.props;
        const res = await NoteRest.getNotes();
        setNotes(res.data.data);
        this.setState({
            isNoteEmpty: res.data.data.length === 0,
            noteDiv: {
                overflowY: 'scroll',
                height: `${window.innerHeight - 60}px`
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (_.isNil(nextProps.diaryDt) || nextProps.diaryDt === '') {
            this.setState({displayYn: false});
        } else {
            this.setState({displayYn: true});
        }
    }

    onOpenNoteDtl = () => {
        this.setState({noteDtlYn: true});
    }

    render() {
        const {noteDiv, isNoteEmpty, noteDtlYn, displayYn} = this.state;
        return (
            <WrapperStyled>
                {isNoteEmpty && (
                    <div style={{padding: '5px'}} className={noteEmpty} onClick={() => this.onOpenNoteDtl()}>
                        <Row><Col className={noteEmptyIcon}><span className="material-icons">report_problem</span></Col></Row>
                        <Row><Col className={noteEmptyIcon}><span> 등록된 일기장이 없습니다. 일기장을 등록하세요</span></Col></Row>
                    </div>
                )}
                {!isNoteEmpty && (
                <div style={{padding: '5px'}}>
                    <NoteList />
                    <div style={noteDiv} className="notDiv">
                        <NoteCalendar />
                        <Accordion defaultActiveKey="0">
                            <NoteDiary />
                            <NoteDisease />
                        </Accordion>
                        <NoteEventBtn displayYn={displayYn}/>
                    </div>
                </div>
                )}
                <NoteDtl openYn={noteDtlYn} type="CREATE" close={() => this.setState({noteDtlYn: false})} />
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    .accordion {
        margin-bottom: 100px;
    }
}`;


Note.propTypes = {
    notes: PropTypes.object,
    setNotes: PropTypes.func,
    diaryDt: PropTypes.string
};

const mapStateToProps = (state) => ({
    notes: state.note.notes,
    diaryDt: state.note.diaryDt
});

const mapDispatchToProps = {
    setNotes: noteActions.setNotes
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Note);
