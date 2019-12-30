import React from 'react';
import {Row, Col, ButtonGroup, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

import {noteStatRow} from '../../assets/styles/note.scss';

const NoteDiaryState = (props) => {
    const {title, code} = props;
    let goodStyle = {backgroundColor: '#F0F6FA', borderColor: '#fff'};
    let notBadStyle = {backgroundColor: '#F0F6FA', borderColor: '#fff'};
    let badStyle = {backgroundColor: '#F0F6FA', borderColor: '#fff'};

    if(code === 'good') {
        goodStyle = {backgroundColor: '#4caf50', borderColor: '#fff'};
    } else if (code === 'notBad') {
        notBadStyle = {backgroundColor: '#f9a825', borderColor: '#fff'};
    } else if (code === 'bad') {
        badStyle = {backgroundColor: '#d32f2f', borderColor: '#fff'};
    }
    return (
        <Row className={noteStatRow}>
            <Col xs={4}>{title}</Col>
            <Col xs={8}>
                <ButtonGroup>
                    <Button style={goodStyle} disabled/>
                    <Button style={notBadStyle}disabled/>
                    <Button style={badStyle} disabled/>
                </ButtonGroup>
            </Col>
        </Row>
    );
};

NoteDiaryState.propTypes = {
    title: PropTypes.string,
    code: PropTypes.string
};

export default NoteDiaryState;
