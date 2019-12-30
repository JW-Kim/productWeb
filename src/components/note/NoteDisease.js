import React, {Component} from 'react';
import {Accordion, Card, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

import {noteStatRow} from '../../assets/styles/note.scss';

class NoteDisease extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderDiseaseRow = () => {
        const {disease} = this.props;
        if(_.isNil(disease) || disease.length === 0) return null;
        const diseaseDotStyle = {
            height: '5px',
            width: '5px',
            backgroundColor: '#E6ECF0',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '5px'
        };
        const items = disease.map(item => (
            <div key={item.diseaseId}>
                <Accordion.Toggle as={Card.Header} eventKey={item.diseaseId}>
                    <span style={diseaseDotStyle}></span>{item.diseaseNm}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={item.diseaseId}>
                    <Card.Body>
                        <Row className={noteStatRow}>
                            <Col xs={4}>증상</Col>
                            <Col xs={8}>{item.symptom}</Col>
                        </Row>
                        {!_.isNil(item.hospitalNm) && item.hospitalNm !== '' &&
                        <Row className={noteStatRow}>
                            <Col xs={4}>병원명</Col>
                            <Col xs={8}>{item.hospitalNm}</Col>
                        </Row>
                        }
                        {!_.isNil(item.prescription) && item.prescription !== '' &&
                        <Row className={noteStatRow}>
                            <Col xs={4}>처방</Col>
                            <Col xs={8}>{item.prescription}</Col>
                        </Row>
                        }
                    </Card.Body>
                </Accordion.Collapse>
            </div>
        ));

        return <Card>{items}</Card>;
    }

    render() {
        return (
            <WrapperStyled>
                {this.renderDiseaseRow()}
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    .card {
        border: 1px solid #E6ECF0;
    }
    .card-header {
        font-size: 15px;
        color: #142765;
        background-color: #fff;
    }
    .card-body {
        font-size: 12px;
        color: #142765;
    }
}`;

NoteDisease.propTypes = {
    disease: PropTypes.array
};

const mapStateToProps = (state) => ({
    disease: state.note.disease
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteDisease);

