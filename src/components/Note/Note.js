import React, {Component} from 'react';
import {NoteRest} from '../../apis/index';

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        NoteRest.getNote();
    }

    render() {
        return (
            <div>Note</div>
        );
    }
}

export default Note;
