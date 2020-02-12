import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, Row, Col, Button} from 'react-bootstrap';
import styled from 'styled-components';

class NoteDtlCfgBtnGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            useStyle: {backgroundColor: '#fff', borderColor: '#F0F6FA', color: '#000'},
            unUseStyle: {backgroundColor: '#fff', borderColor: '#F0F6FA', color: '#000'}
        };
    }

    componentWillMount() {
        const {noteCfgStatCd} = this.props;

        if(noteCfgStatCd !== null) {
            this.setButton(noteCfgStatCd);
        }
    }

    setButton(noteCfgStatCd) {
        let selectedIndex = 0;

        if(noteCfgStatCd === 'Y') {
            selectedIndex = 0;
            this.setState({
                useStyle: {backgroundColor: '#F0F6FA', borderColor: '#F0F6FA', color: '#000'},
                unUseStyle: {backgroundColor: '#fff', borderColor: '#F0F6FA', color: '#000'}
            });
        } else {
            selectedIndex = 1;
            this.setState({
                unUseStyle: {backgroundColor: '#F0F6FA', borderColor: '#F0F6FA', color: '#000'},
                useStyle: {backgroundColor: '#fff', borderColor: '#F0F6FA', color: '#000'}
            });
        }
        this.setState({selectedIndex});
    }

    updateIndex = (selectedIndex) => {
        const {setNoteCfgStatCd} = this.props;

        if(selectedIndex === 0) {
            setNoteCfgStatCd('Y');
            this.setState({
                useStyle: {backgroundColor: '#F0F6FA', borderColor: '#F0F6FA', color: '#000'},
                unUseStyle: {backgroundColor: '#fff', borderColor: '#F0F6FA', color: '#000'}
            });
        } else {
            setNoteCfgStatCd('N');
            this.setState({
                unUseStyle: {backgroundColor: '#F0F6FA', borderColor: '#F0F6FA', color: '#000'},
                useStyle: {backgroundColor: '#fff', borderColor: '#F0F6FA', color: '#000'}
            });
        }

        this.setState({selectedIndex});
    }

    render() {
        const {title} = this.props;
        const {useStyle, unUseStyle} = this.state;

        return (
            <WrapperStyled>
            <Row>
                <Col xs={4}>{title}</Col>
                <Col xs={8}>
                    <ButtonGroup>
                        <Button style={useStyle} onClick={() => this.updateIndex(0)}>사용</Button>
                        <Button style={unUseStyle} onClick={() => this.updateIndex(1)}>미사용</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            </WrapperStyled>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    button {
        font-size: 14px;
    }
    
    .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(255,255,255,.5);
    } 
    
    .btn-primary.focus, .btn-primary:focus {
        box-shadow: 0 0 0 0.2rem rgba(255,255,255,.5);
    }
}`;


NoteDtlCfgBtnGroup.propTypes = {
    title: PropTypes.string,
    noteCfgStatCd: PropTypes.string,
    setNoteCfgStatCd: PropTypes.func
};

export default NoteDtlCfgBtnGroup;

