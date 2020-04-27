import React, {Component} from 'react';
import {Toast as ToastBoot} from 'react-bootstrap';
import PropTypes from 'prop-types';
import $ from 'jquery';

class ToastModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openYn: true
        };
    }

    componentDidMount() {
        this.promise = new $.Deferred();
    }

    confirm = () => {
        this.setState({openYn: false});
        return this.promise.resolve();
    }

    render() {
        const {msg} = this.props;
        const {openYn} = this.state;
        const right = (window.innerWidth - 300) / 2;

        return (
            <ToastBoot
                style={{position: 'absolute', top: 100, right, width: '300px', wordBreak: 'break-word', zIndex: '10000000'}}
                onClose={() => this.confirm()}
                show={openYn}
                delay={1000}
                autohide>
                <ToastBoot.Body>{msg}</ToastBoot.Body>
            </ToastBoot>
        );
    }
}

ToastModal.propTypes = {
    msg: PropTypes.string
};

export default ToastModal;
