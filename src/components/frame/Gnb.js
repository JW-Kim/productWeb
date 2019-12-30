import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import {Row, Col, Dropdown} from 'react-bootstrap';
import styled from 'styled-components';

import {gnbRow, gnbTitle} from '../../assets/styles/gnb.scss';
import Set from '../set/Set';

class Gnb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutYn: false,
            setOpenYn: false
        };
    }

    onLogout = () => {
        Cookies.remove('token');
        setTimeout(this.setState({logoutYn: true}), 3000);
    }

    onClickSet = () => {
        const {setOpenYn} = this.state;
        this.setState({setOpenYn: !setOpenYn});
    }

    render() {
        const {logoutYn, setOpenYn} = this.state;
        return (
            <React.Fragment>
                <WrapperStyled>
                <Row className={gnbRow}>
                    <Col xs={3}><span className={gnbTitle}>일기장</span></Col>
                    <Col xs={6} />
                    <Col xs={3}>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                My
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item key={1}>일기장</Dropdown.Item>
                                <Dropdown.Item key={2} onClick={() => this.onClickSet()}>설정</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Set openYn={setOpenYn} close={() => this.setState({setOpenYn: false})}/>
                {logoutYn && <Redirect to={{pathname: '/login'}} />}
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
            font-size: 20px;
            font-weight:600;
        }
    }   
    
    .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(255,255,255,.5);
    } 
    
    .btn-primary.focus, .btn-primary:focus {
        box-shadow: 0 0 0 0.2rem rgba(255,255,255,.5);
    }
    
    .dropdown-toggle::after {
        border-top: 0
    }
}`;

Gnb.propTypes = {};

export default Gnb;
