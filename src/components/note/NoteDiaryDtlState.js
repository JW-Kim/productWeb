import React, { Component } from 'react';
import styled from 'styled-components';
import {Row, Col, ButtonGroup, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { inputRow, inputRowStateTitle} from '../../assets/styles/com.scss';

class NoteDiaryDtlState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            goodStyle: {backgroundColor: '#fff', borderColor: '#4caf50'},
            notBadStyle: {backgroundColor: '#fff', borderColor: '#f9a825'},
            badStyle: {backgroundColor: '#fff', borderColor: '#d32f2f'}
        };
    }

    componentWillMount() {
        const {code, setCode} = this.props;

        if (_.isNil(code) || code === '') {
            setCode('good');
            this.setState({
                goodStyle: {backgroundColor: '#4caf50', borderColor: '#fff'},
                notBadStyle: {backgroundColor: '#fff', borderColor: '#f9a825'},
                badStyle: {backgroundColor: '#fff', borderColor: '#d32f2f'}
            });
        }
    }

    updateIndex = (selectedIndex) => {
        const {setCode} = this.props;

        if(selectedIndex === 0) {
            setCode('good');
            this.setState({
                goodStyle: {backgroundColor: '#4caf50', borderColor: '#fff'},
                notBadStyle: {backgroundColor: '#fff', borderColor: '#f9a825'},
                badStyle: {backgroundColor: '#fff', borderColor: '#d32f2f'}
            });
        } else if (selectedIndex === 1) {
            setCode('notBad');
            this.setState({
                goodStyle: {backgroundColor: '#fff', borderColor: '#4caf50'},
                notBadStyle: {backgroundColor: '#f9a825', borderColor: '#fff'},
                badStyle: {backgroundColor: '#fff', borderColor: '#d32f2f'}
            });
        } else {
            setCode('bad');
            this.setState({
                goodStyle: {backgroundColor: '#fff', borderColor: '#4caf50'},
                notBadStyle: {backgroundColor: '#fff', borderColor: '#f9a825'},
                badStyle: {backgroundColor: '#d32f2f', borderColor: '#fff'}
            });
        }

        this.setState({selectedIndex});
    }

    render() {
        const {title} = this.props;
        const {goodStyle, notBadStyle, badStyle} = this.state;

        return (
            <WrapperStyled>
                <Row className={inputRow}>
                    <Col className={inputRowStateTitle} xs={4}>{title}</Col>
                    <Col xs={8} >
                        <ButtonGroup style={{width: '100%', height: '30px', marginTop: '5px'}}>
                            <Button style={goodStyle} onClick={() => this.updateIndex(0)} />
                            <Button style={notBadStyle} onClick={() => this.updateIndex(1)} />
                            <Button style={badStyle} onClick={() => this.updateIndex(2)} />
                        </ButtonGroup>
                    </Col>
                </Row>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {


}`;

NoteDiaryDtlState.propTypes = {
    title: PropTypes.string,
    code: PropTypes.string,
    setCode: PropTypes.func
};

export default NoteDiaryDtlState;
