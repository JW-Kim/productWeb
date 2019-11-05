import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Toast as ToastBoot} from 'react-bootstrap';
import {dialog as DialogActions} from '../../redux/actions/index';

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    setShow = (toastYn) => {
        const {setToast} = this.props;
        setToast({toastYn});
    }

    render() {
        const {toast} = this.props;
        const right = (window.innerWidth - 300) / 2;

        return (
            <ToastBoot
                style={{position: 'absolute', top: 100, right, width: '300px', wordBreak: 'break-word'}}
                onClose={() => this.setShow(false)}
                show={toast.toastYn}
                delay={1000}
                autohide>
                <ToastBoot.Body>{toast.toastMsg}</ToastBoot.Body>
            </ToastBoot>
        );
    }
}

Toast.propTypes = {
    toast: PropTypes.object,
    setToast: PropTypes.func
};

const mapStateToProps = (state) => ({
    toast: state.dialog.toast
});

const mapDispatchToProps = {
    setToast: DialogActions.setToast
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toast);
