import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-bootstrap';
import _ from 'lodash';
import {DownloadRest} from '../../apis/index';

class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null
        };
    }

    async componentWillMount() {
        const {fileId} = this.props;
        if(!_.isNil(fileId)) {
            const res1 = await DownloadRest.downloadPhoto(fileId);
            const image = btoa(new Uint8Array(res1.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            this.setState({url: `data:image/png;base64,${image}`});
        }
    }

    async shouldComponentUpdate(nextProps) {
        const {fileId} = this.props;
        if(!_.isNil(nextProps.fileId) && nextProps.fileId !== fileId) {
            const res1 = await DownloadRest.downloadPhoto(nextProps.fileId);
            const image = btoa(new Uint8Array(res1.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            this.setState({url: `data:image/png;base64,${image}`});
        }
    }

    render() {
        const {style, shape} = this.props;
        const { url } = this.state;
        return (
            <React.Fragment>
                {!_.isNil(url) && shape === 'roundedCircle' && <Image src={url} style={style} roundedCircle />}
                {_.isNil(url) && shape === 'roundedCircle' && <span className="material-icons" style={style}>person</span>}
                {!_.isNil(url) && shape === 'thumbnail' && <Image src={url} style={style} thumbnail />}
            </React.Fragment>
        );
    }
}

Avatar.propTypes = {
    fileId: PropTypes.string,
    shape: PropTypes.string,
    style: PropTypes.object
};

export default Avatar;
