import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {NoteRest} from '../../apis/index';
import {note as noteActions} from '../../redux/actions/index';

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const {setNotes} = this.props;
        const res = await NoteRest.getNote();
        setNotes(res.data.data);
    }

    render() {
        return (
            <div>Note</div>
        );
    }
}

Note.propTypes = {
    notes: PropTypes.object,
    setNotes: PropTypes.func
};

const mapStateToProps = (state) => ({
    notes: state.note.notes
});

const mapDispatchToProps = {
    setNotes: noteActions.setNotes
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Note);
