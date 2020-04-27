import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Dropdown, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {NoteRest} from '../../apis/index';
import {note as NoteActions} from '../../redux/actions/index';
import _ from 'lodash';

import Avatar from '../com/Avatar';

class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteList: [],
            fileId: null
        };
    }

    async componentWillMount() {
        const {setNote} = this.props;
        const res = await NoteRest.getNotes();
        const noteList = res.data.data;

        if (noteList.length > 0 ) {
            setNote(noteList[0].noteId);
            this.setState({noteList, fileId: noteList[0].fileId});
        }
    }

    async componentWillReceiveProps(nextProps) {
        const {notes, setNote} = this.props;

        if(_.isNil(notes) && notes !== nextProps.notes) {
            const res = await NoteRest.getNotes();
            const noteList = res.data.data;

            if (noteList.length > 0 ) {
                setNote(noteList[0].noteId);
                this.setState({noteList, fileId: noteList[0].fileId});
            }
        }
    }

    onChangeNote = (noteId) => {
        const {setNote, setDiary, setDisease, setDiaryDt} = this.props;
        const {noteList} = this.state;
        setNote(noteId);
        setDiaryDt(null);
        setDiary(null);
        setDisease(null);
        const note = _.find(noteList, {noteId});
        this.setState({fileId: note.fileId});
    }

    renderDropdownRow = () => {
        const {noteList} = this.state;

        const listItems = noteList.map(item => (
            <Dropdown.Item key={item.noteId} onClick={() => this.onChangeNote(item.noteId)}>{item.noteNm}</Dropdown.Item>
        ));

        return <Dropdown.Menu>{listItems}</Dropdown.Menu>;
    }

    render() {
        const {noteId} = this.props;
        const {noteList, fileId} = this.state;

        let noteNm = '';
        const note = _.find(noteList, {noteId});
        if(!_.isNil(note)) {
            noteNm = note.noteNm;
        }

        return (
            <React.Fragment>
                <WrapperStyled>
                    <Row>
                        <Col xs={12}>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <Avatar fileId={fileId} style={{width: '30px', height: '30px', marginRight: '10px'}} shape="roundedCircle"/>
                                    {noteNm}
                                </Dropdown.Toggle>

                                {this.renderDropdownRow()}
                            </Dropdown>
                        </Col>
                    </Row>
                </WrapperStyled>
            </React.Fragment>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    .dropdown {
        button {
            background-color: #fff;
            border-color: #fff;
            color: #000;
        }
    }   
    
    .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(255,255,255,.5);
    } 
    
    .btn-primary.focus, .btn-primary:focus {
        box-shadow: 0 0 0 0.2rem rgba(255,255,255,.5);
    }
}`;


NoteList.propTypes = {
    noteId: PropTypes.string,
    notes: PropTypes.object,
    setNote: PropTypes.func,
    setDiary: PropTypes.func,
    setDisease: PropTypes.func,
    setDiaryDt: PropTypes.func
};

const mapStateToProps = (state) => ({
    noteId: state.note.noteId,
    notes: state.note.notes
});

const mapDispatchToProps = {
    setNote: NoteActions.setNote,
    setDiary: NoteActions.setDiary,
    setDisease: NoteActions.setDisease,
    setDiaryDt: NoteActions.setDiaryDt
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteList);
